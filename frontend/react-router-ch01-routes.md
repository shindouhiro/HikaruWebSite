# 第1章：实现 Routes - 路由匹配与渲染

**状态：** ✅ 已完成
**难度：** ⭐⭐
**预计时间：** 2小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-01-routes)

## 学习目标

- 理解路由匹配的基本原理
- 实现简单的路径匹配算法
- 掌握 React Context 在路由中的应用
- 实现基础的 Routes 和 Route 组件

## 核心概念

### 1. 路由匹配

路由匹配是路由系统的核心，它根据当前 URL 路径找到对应的路由配置：

```typescript
// 简单的路径匹配函数
function matchPath(pattern: string, pathname: string): boolean {
  if (pattern === pathname) return true;

  // 处理动态路由参数，如 /users/:id
  const patternSegments = pattern.split('/');
  const pathnameSegments = pathname.split('/');

  if (patternSegments.length !== pathnameSegments.length) return false;

  return patternSegments.every((segment, index) => {
    return segment.startsWith(':') || segment === pathnameSegments[index];
  });
}
```

### 2. React Context 在路由中的作用

React Context 用于在组件树中传递路由信息，避免 props 钻探：

```typescript
// 路由上下文
const RouteContext = createContext<{
  currentPath: string;
  matchedRoute?: RouteConfig;
}>({
  currentPath: ''
});
```

## 实现步骤

### 步骤1：创建基础类型定义

```typescript
// src/types.ts
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
}

export interface RouterContextType {
  currentPath: string;
  matchedRoute?: RouteConfig;
  setPath: (path: string) => void;
}
```

### 步骤2：实现路由匹配逻辑

```typescript
// src/utils/routeMatcher.ts
export function matchRoute(
  routes: RouteConfig[],
  pathname: string
): RouteConfig | undefined {
  for (const route of routes) {
    // 精确匹配
    if (route.path === pathname) {
      return route;
    }

    // 处理动态路由
    if (isDynamicRoute(route.path)) {
      const params = matchDynamicRoute(route.path, pathname);
      if (params) {
        return { ...route, params };
      }
    }

    // 递归匹配子路由
    if (route.children) {
      const childMatch = matchRoute(route.children, pathname);
      if (childMatch) {
        return childMatch;
      }
    }
  }

  return undefined;
}

function isDynamicRoute(path: string): boolean {
  return path.includes(':');
}

function matchDynamicRoute(pattern: string, pathname: string): Record<string, string> | null {
  const patternSegments = pattern.split('/');
  const pathnameSegments = pathname.split('/');

  if (patternSegments.length !== pathnameSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    const pathnameSegment = pathnameSegments[i];

    if (patternSegment.startsWith(':')) {
      const paramName = patternSegment.slice(1);
      params[paramName] = pathnameSegment;
    } else if (patternSegment !== pathnameSegment) {
      return null;
    }
  }

  return params;
}
```

### 步骤3：实现 Router Provider

```typescript
// src/components/RouterProvider.tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { RouteConfig, RouterContextType } from '../types';

const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children, routes }: {
  children: React.ReactNode;
  routes: RouteConfig[];
}) {
  const [currentPath, setCurrentPath] = useState(() => {
    // 初始化时获取当前路径
    return window.location.pathname;
  });

  // 监听浏览器前进后退
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const matchedRoute = useMemo(() => {
    return matchRoute(routes, currentPath);
  }, [routes, currentPath]);

  const contextValue = useMemo(() => ({
    currentPath,
    matchedRoute,
    setPath: (path: string) => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
  }), [currentPath, matchedRoute]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
}
```

### 步骤4：实现 Routes 和 Route 组件

```typescript
// src/components/Routes.tsx
import React from 'react';
import { useRouter } from './RouterProvider';

export function Routes() {
  const { matchedRoute } = useRouter();

  if (!matchedRoute) {
    return <div>404 - 页面未找到</div>;
  }

  return <>{matchedRoute.element}</>;
}

// src/components/Route.tsx
import React from 'react';
import { RouteConfig } from '../types';

export function Route({ path, element, children }: RouteConfig) {
  // Route 组件本身不做渲染，只是配置路由
  // 实际的渲染逻辑在 Routes 组件中处理
  return null;
}
```

## 完整示例

```typescript
// App.tsx
import React from 'react';
import { RouterProvider, Routes, Route } from './mini-router';

// 页面组件
const Home = () => <div>首页</div>;
const About = () => <div>关于我们</div>;
const User = ({ params }: { params: { id: string } }) =>
  <div>用户ID: {params.id}</div>;

// 路由配置
const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/users/:id',
    element: <User />
  }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <nav>
        <a href="/">首页</a> |
        <a href="/about">关于</a> |
        <a href="/users/123">用户123</a>
      </nav>
      <Routes />
    </RouterProvider>
  );
}

export default App;
```

## 关键点解析

### 1. 路由匹配算法

我们实现了两种匹配策略：
- **精确匹配：** 路径完全相同
- **动态匹配：** 支持参数占位符（如 `:id`）

### 2. 状态管理

使用 React Context 管理路由状态，包括：
- 当前路径（currentPath）
- 匹配的路由配置（matchedRoute）
- 路径更新函数（setPath）

### 3. 浏览器集成

监听 `popstate` 事件处理浏览器的前进后退操作，使用 `history.pushState` 实现程序化导航。

## 练习题

1. **基础练习：** 扩展路由匹配，支持通配符路由（`*`）
2. **进阶练习：** 实现路由优先级，精确匹配优先于动态匹配
3. **挑战练习：** 添加路由元数据（meta），支持标题、权限等配置

## 下一步预告

下一章我们将实现路由切换功能，包括：
- 声明式导航（Link 组件）
- 编程式导航（navigate 函数）
- 导航状态管理

---

[返回总览](./react-router) | [前往第2章：路由切换](./react-router-ch02-switching)