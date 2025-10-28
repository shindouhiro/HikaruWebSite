# 第4章：路由匹配与动态切换 - 高级匹配策略

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐
**预计时间：** 3小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-04-matching)

## 学习目标

- 掌握高级路由匹配算法
- 实现动态路由参数处理
- 理解路由优先级机制
- 实现路由重定向和通配符匹配

## 核心概念

### 1. 路由优先级

React Router 6 按以下优先级匹配路由：
1. **精确匹配** - 路径完全相同
2. **动态路由** - 包含参数的路由
3. **通配符路由** - 使用 `*` 匹配任意路径

### 2. 动态路由参数

支持多种参数类型：
- **路径参数：** `/users/:id`
- **可选参数：** `/users/:id?`
- **通配符：** `/files/*`
- **正则表达式：** `/users/:id(\\d+)`

### 3. 路由重定向

实现路径重定向功能：
```jsx
<Route path="/old-path" element={<Navigate to="/new-path" replace />} />
```

## 实现步骤

### 步骤1：扩展类型定义

```typescript
// src/types.ts
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
  index?: boolean;
  caseSensitive?: boolean; // 是否区分大小写

  // 新增字段
  redirect?: string; // 重定向路径
  loader?: () => Promise<any>; // 数据加载函数
  action?: (data: any) => Promise<any>; // 表单提交处理
}

export interface RouteMatch {
  route: RouteConfig;
  pathname: string;
  params: Record<string, string>;
  data?: any; // 加载的数据
}

export interface RoutePath {
  pattern: string;
  segments: PathSegment[];
  keys: string[];
  score: number; // 匹配优先级分数
}

export interface PathSegment {
  type: 'static' | 'dynamic' | 'wildcard';
  value: string;
  key?: string;
  pattern?: RegExp;
}
```

### 步骤2：实现路径解析器

```typescript
// src/utils/pathParser.ts
export function parsePath(pattern: string, caseSensitive = false): RoutePath {
  const segments: PathSegment[] = [];
  const keys: string[] = [];

  // 移除开头和结尾的斜杠
  let cleanPattern = pattern.replace(/^\/+|\/+$/g, '');

  // 处理根路径
  if (cleanPattern === '') {
    cleanPattern = '/';
  }

  const patternSegments = cleanPattern.split('/');

  for (const segment of patternSegments) {
    if (segment === '*') {
      // 通配符段
      segments.push({ type: 'wildcard', value: '*' });
    } else if (segment.startsWith(':')) {
      // 动态段
      const match = segment.match(/^:([^()]+)(?:\((.+)\))?(?:\?)?$/);
      if (match) {
        const key = match[1];
        const pattern = match[2] ? new RegExp(match[2]) : undefined;

        segments.push({
          type: 'dynamic',
          value: segment,
          key,
          pattern
        });
        keys.push(key);
      }
    } else {
      // 静态段
      segments.push({
        type: 'static',
        value: caseSensitive ? segment : segment.toLowerCase()
      });
    }
  }

  return {
    pattern,
    segments,
    keys,
    score: calculateScore(segments)
  };
}

function calculateScore(segments: PathSegment[]): number {
  let score = 0;

  for (const segment of segments) {
    switch (segment.type) {
      case 'static':
        score += 100; // 静态段得分最高
        break;
      case 'dynamic':
        score += 50;  // 动态段得分中等
        break;
      case 'wildcard':
        score += 10;  // 通配符得分最低
        break;
    }
  }

  return score;
}
```

### 步骤3：实现高级路由匹配器

```typescript
// src/utils/advancedRouteMatcher.ts
export function matchRoutesAdvanced(
  routes: RouteConfig[],
  pathname: string,
  basename = ''
): RouteMatch[] {
  const allMatches: RouteMatch[] = [];

  // 预解析所有路由路径
  const parsedRoutes = routes.map(route => ({
    ...route,
    parsedPath: parsePath(route.path, route.caseSensitive)
  }));

  // 找到所有可能的匹配
  function findMatches(
    routes: any[],
    pathname: string,
    basePath = '',
    params: Record<string, string> = {},
    depth = 0
  ): void {
    for (const route of routes) {
      const { parsedPath } = route;
      const match = matchPathPattern(parsedPath, pathname, route.caseSensitive);

      if (match) {
        const newParams = { ...params, ...match.params };
        const matchedPath = joinPaths(basePath, route.path);

        // 检查重定向
        if (route.redirect) {
          // 创建重定向匹配
          allMatches.push({
            route: { ...route, path: route.redirect },
            pathname: joinPaths(basePath, route.redirect),
            params: newParams
          });
          continue;
        }

        // 创建正常匹配
        allMatches.push({
          route,
          pathname: matchedPath,
          params: newParams
        });

        // 递归匹配子路由
        if (route.children && match.remainingPath) {
          findMatches(
            route.children,
            match.remainingPath,
            matchedPath,
            newParams,
            depth + 1
          );
        }
      }
    }
  }

  findMatches(parsedRoutes, pathname);

  // 选择最佳匹配（按得分排序）
  return selectBestMatches(allMatches);
}

function matchPathPattern(
  parsedPath: RoutePath,
  pathname: string,
  caseSensitive = false
): {
  matched: boolean;
  params: Record<string, string>;
  remainingPath?: string;
} | null {
  const pathSegments = pathname.split('/').filter(Boolean);
  const patternSegments = parsedPath.segments;

  // 检查通配符匹配
  const hasWildcard = patternSegments.some(seg => seg.type === 'wildcard');

  if (!hasWildcard && patternSegments.length !== pathSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};
  let matchedSegments = 0;

  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    const pathSegment = pathSegments[i];

    if (patternSegment.type === 'static') {
      // 静态段匹配
      const compareSegment = caseSensitive ? pathSegment : pathSegment?.toLowerCase();
      if (patternSegment.value !== compareSegment) {
        return null;
      }
    } else if (patternSegment.type === 'dynamic') {
      // 动态段匹配
      if (!pathSegment) {
        return null;
      }

      // 如果有正则表达式模式，进行验证
      if (patternSegment.pattern && !patternSegment.pattern.test(pathSegment)) {
        return null;
      }

      params[patternSegment.key!] = decodeURIComponent(pathSegment);
    } else if (patternSegment.type === 'wildcard') {
      // 通配符匹配
      const remainingPath = pathSegments.slice(i).join('/');
      params['*'] = decodeURIComponent(remainingPath);

      return {
        matched: true,
        params,
        remainingPath: ''
      };
    }

    matchedSegments++;
  }

  const remainingPath = hasWildcard
    ? ''
    : pathSegments.slice(matchedSegments).join('/');

  return {
    matched: true,
    params,
    remainingPath
  };
}

function selectBestMatches(matches: RouteMatch[]): RouteMatch[] {
  if (matches.length === 0) return [];

  // 按路径深度和得分排序
  matches.sort((a, b) => {
    const aDepth = a.pathname.split('/').length;
    const bDepth = b.pathname.split('/').length;

    // 优先选择深度更深的匹配
    if (aDepth !== bDepth) {
      return bDepth - aDepth;
    }

    // 其次选择得分更高的
    const aScore = (a.route as any).parsedPath?.score || 0;
    const bScore = (b.route as any).parsedPath?.score || 0;

    return bScore - aScore;
  });

  // 构建匹配链
  const bestMatches: RouteMatch[] = [];
  const usedPaths = new Set<string>();

  for (const match of matches) {
    if (!usedPaths.has(match.pathname)) {
      bestMatches.push(match);
      usedPaths.add(match.pathname);
    }
  }

  return bestMatches;
}
```

### 步骤4：实现 Navigate 组件

```typescript
// src/components/Navigate.tsx
import React, { useEffect } from 'react';
import { useNavigate } from '../hooks/useNavigate';

interface NavigateProps {
  to: string;
  replace?: boolean;
  state?: any;
}

export function Navigate({ to, replace = false, state }: NavigateProps) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace, state });
  }, [navigate, to, replace, state]);

  // 渲染空内容
  return null;
}
```

### 步骤5：实现 useParams Hook

```typescript
// src/hooks/useParams.ts
import { useContext } from 'react';
import { RoutesContext } from '../contexts/RoutesContext';

export function useParams(): Record<string, string> {
  const context = useContext(RoutesContext);

  if (!context.matches.length) {
    return {};
  }

  // 获取当前路由的参数
  const currentMatch = context.matches[context.matches.length - 1];
  return currentMatch.params || {};
}
```

### 步骤6：实现数据加载功能

```typescript
// src/hooks/useLoaderData.ts
import { useContext, useState, useEffect } from 'react';
import { RoutesContext } from '../contexts/RoutesContext';

export function useLoaderData<T = any>(): T | undefined {
  const context = useContext(RoutesContext);
  const [data, setData] = useState<T>();

  useEffect(() => {
    const currentMatch = context.matches[context.matches.length - 1];

    if (currentMatch?.route.loader) {
      currentMatch.route.loader().then(setData);
    }
  }, [context.matches]);

  return data;
}
```

## 完整示例

```typescript
// App.tsx
import React from 'react';
import {
  RouterProvider,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
  useLoaderData
} from './mini-router';

// 数据加载函数
async function loadUser(params: { id: string }) {
  const response = await fetch(`/api/users/${params.id}`);
  return response.json();
}

async function loadUsers() {
  const response = await fetch('/api/users');
  return response.json();
}

// 布局组件
const Layout = () => (
  <div className="layout">
    <header>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/users">用户管理</Link>
        <Link to="/files">文件管理</Link>
        <Link to="/old-route">旧路由（重定向）</Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

// 用户详情组件
const UserProfile = () => {
  const params = useParams();
  const user = useLoaderData();

  if (!user) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>用户详情</h2>
      <p>ID: {params.id}</p>
      <p>姓名: {user.name}</p>
      <p>邮箱: {user.email}</p>
    </div>
  );
};

// 用户列表组件
const UserList = () => {
  const users = useLoaderData();

  if (!users) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 文件管理组件（通配符路由）
const FileManager = () => {
  const params = useParams();

  return (
    <div>
      <h2>文件管理</h2>
      <p>当前路径: /{params['*']}</p>
      <p>支持任意深度的文件路径</p>
    </div>
  );
};

// 路由配置
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <div>欢迎首页</div>
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <UserList />,
            loader: loadUsers
          },
          {
            path: ':id(\\d+)', // 只匹配数字ID
            element: <UserProfile />,
            loader: ({ params }) => loadUser(params)
          },
          {
            path: ':name', // 匹配名称
            element: <div>按名称查找用户: {useParams().name}</div>
          }
        ]
      },
      {
        path: 'files/*', // 通配符路由
        element: <FileManager />
      },
      {
        path: 'old-route',
        element: <Navigate to="/new-route" replace />
      },
      {
        path: 'new-route',
        element: <div>这是新路由页面</div>
      },
      {
        path: '*',
        element: <div>404 - 页面未找到</div>
      }
    ]
  }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <Routes />
    </RouterProvider>
  );
}

export default App;
```

## 高级用法示例

```typescript
// 复杂的路由配置
const advancedRoutes = [
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      // 索引路由
      {
        index: true,
        element: <Dashboard />,
        loader: loadDashboardData
      },
      // 带验证的路由
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
        loader: async () => {
          const user = await getCurrentUser();
          if (!user) {
            throw new Response('Unauthorized', { status: 401 });
          }
          return user;
        }
      },
      // 可选参数路由
      {
        path: 'search/:query?/:page?',
        element: <SearchResults />,
        loader: ({ params }) => searchItems(params.query, params.page)
      },
      // 多级通配符
      {
        path: 'files/**/*',
        element: <FileExplorer />
      }
    ]
  }
];
```

## 性能优化

```typescript
// 路由匹配缓存
const routeMatchCache = new Map<string, RouteMatch[]>();

export function matchRoutesCached(
  routes: RouteConfig[],
  pathname: string
): RouteMatch[] {
  const cacheKey = `${pathname}-${JSON.stringify(routes.map(r => r.path))}`;

  if (routeMatchCache.has(cacheKey)) {
    return routeMatchCache.get(cacheKey)!;
  }

  const matches = matchRoutesAdvanced(routes, pathname);
  routeMatchCache.set(cacheKey, matches);

  return matches;
}
```

## 关键点解析

### 1. 路径解析算法

```typescript
function parsePath(pattern: string): RoutePath {
  // 解析路径段
  const segments = pattern.split('/').map(segment => {
    if (segment.startsWith(':')) {
      return { type: 'dynamic', key: segment.slice(1) };
    } else if (segment === '*') {
      return { type: 'wildcard' };
    } else {
      return { type: 'static', value: segment };
    }
  });

  return { pattern, segments, keys, score: calculateScore(segments) };
}
```

### 2. 优先级计算

```typescript
function calculateScore(segments: PathSegment[]): number {
  return segments.reduce((score, segment) => {
    switch (segment.type) {
      case 'static': return score + 100;
      case 'dynamic': return score + 50;
      case 'wildcard': return score + 10;
      default: return score;
    }
  }, 0);
}
```

### 3. 参数验证

```typescript
// 支持正则表达式参数验证
const route = {
  path: '/users/:id(\\d+)', // 只匹配数字ID
  element: <UserDetail />
};
```

## 练习题

1. **基础练习：** 实现路由参数的类型验证
2. **进阶练习：** 添加路由匹配的性能监控
3. **挑战练习：** 实现路由预加载功能

## 下一步预告

下一章我们将实现路由守卫功能，包括：
- 认证检查
- 权限控制
- 路由拦截
- 条件渲染

---

[返回总览](./react-router) | [上一章：路由渲染](./react-router-ch03-rendering) | [前往第5章：路由守卫](./react-router-ch05-guards)