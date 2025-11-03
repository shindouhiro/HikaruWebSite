# 第3章：实现路由渲染 - 嵌套路由与Outlet

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐
**预计时间：** 2.5小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-03-rendering)

## 学习目标

- 理解嵌套路由的渲染机制
- 实现 Outlet 组件
- 掌握路由上下文的传递
- 实现路由配置的两种方式

## 核心概念

### 1. 嵌套路由

嵌套路由允许在父路由组件中渲染子路由内容：

```jsx
// 配置方式
<Route path="/users" element={<UsersLayout />}>
  <Route path=":id" element={<UserProfile />} />
  <Route path="settings" element={<UserSettings />} />
</Route>

// 等价的对象配置方式
{
  path: "/users",
  element: <UsersLayout />,
  children: [
    { path: ":id", element: <UserProfile /> },
    { path: "settings", element: <UserSettings /> }
  ]
}
```

### 2. Outlet 组件

Outlet 是子路由内容的渲染点，类似于 Vue Router 中的 `<router-view>`：

```jsx
function UsersLayout() {
  return (
    <div>
      <h1>用户管理</h1>
      <nav>
        <Link to="profile">个人资料</Link>
        <Link to="settings">设置</Link>
      </nav>
      <Outlet /> {/* 子路由内容将在这里渲染 */}
    </div>
  );
}
```

## 实现步骤

### 步骤1：扩展类型定义

```typescript
// src/types.ts
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
  index?: boolean; // 是否为索引路由
}

export interface RouteMatch {
  route: RouteConfig;
  pathname: string;
  params: Record<string, string>;
}

export interface RouterContextType {
  currentPath: string;
  matches: RouteMatch[];
  navigate: (to: string, options?: { replace?: boolean }) => void;
}
```

### 步骤2：实现路由匹配算法（升级版）

```typescript
// src/utils/routeMatcher.ts
export function matchRoutes(
  routes: RouteConfig[],
  pathname: string,
  basename = ''
): RouteMatch[] {
  const segments = pathname.split('/').filter(Boolean);
  const matches: RouteMatch[] = [];

  function recurse(
    routes: RouteConfig[],
    remainingSegments: string[],
    currentPath = '',
    params: Record<string, string> = {}
  ): boolean {
    for (const route of routes) {
      const routeSegments = route.path.split('/').filter(Boolean);

      // 尝试匹配当前路由段
      const { matched, remaining, params: routeParams } = matchSegments(
        routeSegments,
        remainingSegments
      );

      if (matched) {
        const matchedPath = joinPaths(currentPath, route.path);
        const allParams = { ...params, ...routeParams };

        matches.push({
          route,
          pathname: matchedPath,
          params: allParams
        });

        // 如果有子路由，递归匹配
        if (route.children && remaining.length > 0) {
          if (recurse(route.children, remaining, matchedPath, allParams)) {
            return true;
          }
        } else if (remaining.length === 0) {
          // 完全匹配
          return true;
        } else {
          // 回溯：移除当前匹配
          matches.pop();
        }
      }
    }
    return false;
  }

  recurse(routes, segments);
  return matches;
}

function matchSegments(
  routeSegments: string[],
  pathSegments: string[]
): {
  matched: boolean;
  remaining: string[];
  params: Record<string, string>;
} {
  if (routeSegments.length === 0) {
    return { matched: false, remaining: pathSegments, params: {} };
  }

  if (routeSegments.length > pathSegments.length) {
    return { matched: false, remaining: pathSegments, params: {} };
  }

  const params: Record<string, string> = {};
  const matchedSegments: string[] = [];

  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const pathSegment = pathSegments[i];

    if (routeSegment.startsWith(':')) {
      // 动态参数
      params[routeSegment.slice(1)] = pathSegment;
      matchedSegments.push(pathSegment);
    } else if (routeSegment === pathSegment) {
      // 静态匹配
      matchedSegments.push(pathSegment);
    } else {
      // 不匹配
      return { matched: false, remaining: pathSegments, params: {} };
    }
  }

  return {
    matched: true,
    remaining: pathSegments.slice(routeSegments.length),
    params
  };
}

function joinPaths(...paths: string[]): string {
  return paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/';
}
```

### 步骤3：实现 RoutesContext

```typescript
// src/contexts/RoutesContext.tsx
import React, { createContext, useContext } from 'react';
import type { RouteMatch } from '../types';

interface RoutesContextType {
  matches: RouteMatch[];
  outlet: React.ReactElement | null;
}

const RoutesContext = createContext<RoutesContextType>({
  matches: [],
  outlet: null
});

export function RoutesProvider({
  children,
  matches,
  outlet
}: RoutesContextType & { children: React.ReactNode }) {
  const contextValue = React.useMemo(() => ({
    matches,
    outlet
  }), [matches, outlet]);

  return (
    <RoutesContext.Provider value={contextValue}>
      {children}
    </RoutesContext.Provider>
  );
}

export function useRoutesContext() {
  return useContext(RoutesContext);
}
```

### 步骤4：实现 Outlet 组件

```typescript
// src/components/Outlet.tsx
import React from 'react';
import { useRoutesContext } from '../contexts/RoutesContext';

export function Outlet() {
  const { outlet } = useRoutesContext();
  return outlet;
}
```

### 步骤5：更新 Routes 组件

```typescript
// src/components/Routes.tsx
import React from 'react';
import { useRoutesContext } from '../contexts/RoutesContext';
import { RoutesProvider } from '../contexts/RoutesContext';

export function Routes() {
  return <RoutesRenderer />;
}

function RoutesRenderer() {
  const { matches, outlet: parentOutlet } = useRoutesContext();

  // 如果没有匹配的路由，渲染 404
  if (matches.length === 0) {
    return <div>404 - 页面未找到</div>;
  }

  // 渲染匹配的路由层级
  return renderMatches(matches);
}

function renderMatches(matches: RouteMatch[]): React.ReactElement {
  if (matches.length === 0) {
    return null;
  }

  const [currentMatch, ...remainingMatches] = matches;
  const { route } = currentMatch;

  // 创建子路由的 outlet
  const outlet = remainingMatches.length > 0
    ? renderMatches(remainingMatches)
    : null;

  return (
    <RoutesProvider matches={remainingMatches} outlet={outlet}>
      {React.cloneElement(route.element, { ...route.params })}
    </RoutesProvider>
  );
}
```

### 步骤6：实现 useRoutes Hook

```typescript
// src/hooks/useRoutes.ts
import { useMemo } from 'react';
import { useRoutesContext } from '../contexts/RoutesContext';
import { matchRoutes } from '../utils/routeMatcher';
import type { RouteConfig } from '../types';

export function useRoutes(routes: RouteConfig[]): React.ReactElement | null {
  const context = useRoutesContext();

  const matches = useMemo(() => {
    if (!context.matches.length) {
      // 如果没有上下文匹配，进行初始匹配
      const pathname = window.location.pathname;
      return matchRoutes(routes, pathname);
    }
    return context.matches;
  }, [routes, context.matches]);

  if (matches.length === 0) {
    return null;
  }

  return renderRouteMatches(matches);
}

function renderRouteMatches(matches: RouteMatch[]): React.ReactElement {
  if (matches.length === 1) {
    const [match] = matches;
    return React.cloneElement(match.route.element, { ...match.params });
  }

  const [parentMatch, ...childMatches] = matches;
  const childOutlet = renderRouteMatches(childMatches);

  return React.cloneElement(
    parentMatch.route.element,
    { ...parentMatch.params },
    childOutlet
  );
}
```

## 完整示例

```typescript
// App.tsx
import React from 'react';
import { RouterProvider, Routes, Route, Link, Outlet, useRoutes } from './mini-router';

// 布局组件
const Layout = () => (
  <div className="layout">
    <header>
      <h1>我的应用</h1>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/users">用户</Link>
        <Link to="/settings">设置</Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    <footer>
      <p>&copy; 2024 我的应用</p>
    </footer>
  </div>
);

// 用户布局组件
const UsersLayout = () => (
  <div className="users-layout">
    <h2>用户管理</h2>
    <nav className="sub-nav">
      <Link to="/users">用户列表</Link>
      <Link to="/users/new">新建用户</Link>
    </nav>
    <div className="users-content">
      <Outlet />
    </div>
  </div>
);

// 页面组件
const Home = () => <div>欢迎来到首页！</div>;

const UserList = () => (
  <div>
    <h3>用户列表</h3>
    <ul>
      <li><Link to="/users/1">用户 1</Link></li>
      <li><Link to="/users/2">用户 2</Link></li>
    </ul>
  </div>
);

const UserProfile = ({ id }: { id: string }) => (
  <div>
    <h3>用户详情</h3>
    <p>用户ID: {id}</p>
    <p>用户名: User {id}</p>
  </div>
);

const NewUser = () => <div>新建用户表单</div>;

const Settings = () => (
  <div>
    <h2>设置</h2>
    <nav className="sub-nav">
      <Link to="/settings/profile">个人资料</Link>
      <Link to="/settings/security">安全设置</Link>
    </nav>
    <Outlet />
  </div>
);

const ProfileSettings = () => <div>个人资料设置</div>;
const SecuritySettings = () => <div>安全设置</div>;

// 路由配置
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'users',
        element: <UsersLayout />,
        children: [
          { path: '', element: <UserList /> },
          { path: ':id', element: <UserProfile /> },
          { path: 'new', element: <NewUser /> }
        ]
      },
      {
        path: 'settings',
        element: <Settings />,
        children: [
          { path: 'profile', element: <ProfileSettings /> },
          { path: 'security', element: <SecuritySettings /> }
        ]
      }
    ]
  }
];

// 使用 useRoutes 的对象配置方式
function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <RouterProvider routes={routes}>
      <Routes />
    </RouterProvider>
  );
}

export default App;
```

## 样式示例

```css
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

header nav {
  margin-top: 1rem;
}

header nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #007bff;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

header nav a:hover {
  background-color: #e9ecef;
}

main {
  flex: 1;
  padding: 2rem;
}

.users-layout {
  max-width: 800px;
  margin: 0 auto;
}

.sub-nav {
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.sub-nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #6c757d;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
}

.sub-nav a:hover {
  background-color: #f8f9fa;
  color: #495057;
}

.users-content {
  padding: 1rem 0;
}

footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
}
```

## 关键点解析

### 1. 路由匹配的递归逻辑

```typescript
function recurse(routes, remainingSegments, currentPath, params) {
  for (const route of routes) {
    // 尝试匹配当前路由段
    const { matched, remaining, params: routeParams } = matchSegments(
      routeSegments,
      remainingSegments
    );

    if (matched) {
      // 记录匹配
      matches.push({ route, pathname: matchedPath, params: allParams });

      // 递归匹配子路由
      if (route.children) {
        recurse(route.children, remaining, matchedPath, allParams);
      }
    }
  }
}
```

### 2. Outlet 的渲染机制

```typescript
function renderMatches(matches) {
  const [currentMatch, ...remainingMatches] = matches;

  // 创建子路由的 outlet
  const outlet = remainingMatches.length > 0
    ? renderMatches(remainingMatches)
    : null;

  return (
    <RoutesProvider matches={remainingMatches} outlet={outlet}>
      {currentMatch.route.element}
    </RoutesProvider>
  );
}
```

### 3. 上下文传递

通过 Context API 在路由层级间传递匹配信息和子路由内容：

```typescript
const RoutesContext = createContext({
  matches: [],
  outlet: null
});
```

## 练习题

1. **基础练习：** 实现索引路由（index route）功能
2. **进阶练习：** 支持相对路径导航
3. **挑战练习：** 实现路由渲染的性能优化

## 常见问题

### Q: 嵌套路由和布局组件有什么关系？

A: 嵌套路由天然适合实现布局组件。父路由作为布局容器，通过 `<Outlet />` 渲染子路由内容，实现页面的层次结构。

### Q: Outlet 组件是如何知道要渲染什么内容的？

A: Outlet 组件通过 Context 获取当前路由层级匹配的子路由内容。这个内容在 `renderMatches` 函数中递归创建并传递。

## 下一步预告

下一章我们将实现更高级的路由匹配功能，包括：
- 动态路由参数
- 路由优先级
- 通配符路由
- 路由重定向

---

[返回总览](./react-router) | [上一章：路由切换](./react-router-ch02-switching) | [前往第4章：路由匹配与动态切换](./react-router-ch04-matching)