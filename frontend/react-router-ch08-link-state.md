# 第8章：Link状态管理 - NavLink与路由匹配

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐
**预计时间：** 2小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-08-link-state)

## 学习目标

- 理解路由匹配的原理和实现
- 掌握 NavLink 组件的状态管理
- 实现 useMatch 和 useResolvedPath Hook
- 掌握导航交互的优化技巧

## 核心概念

### 1. 路由匹配状态

Link 组件可以有三种状态：
- **active：** 当前路径完全匹配
- **pending：** 导航正在进行中
- **inactive：** 不匹配的普通状态

### 2. 路径解析

将相对路径转换为绝对路径：
```javascript
// 当前路径: /users/123
// 相对路径: settings
// 解析结果: /users/123/settings
```

### 3. 匹配策略

- **精确匹配：** 路径完全相同
- **前缀匹配：** 路径以指定模式开头
- **通配符匹配：** 支持动态参数匹配

## 实现步骤

### 步骤1：扩展类型定义

```typescript
// src/types.ts
export interface PathMatch {
  pathname: string;
  pattern: string;
  params: Record<string, string>;
  isExact: boolean;
}

export interface NavLinkProps extends LinkProps {
  children?: React.ReactNode | ((props: NavLinkRenderProps) => React.ReactNode);
  className?: string | ((props: NavLinkRenderProps) => string);
  style?: React.CSSProperties | ((props: NavLinkRenderProps) => React.CSSProperties);
  end?: boolean;           // 是否精确匹配
  caseSensitive?: boolean; // 是否区分大小写
}

export interface NavLinkRenderProps {
  isActive: boolean;
  isPending: boolean;
  isTransitioning: boolean;
}

export interface ResolvedPath {
  pathname: string;
  search: string;
  hash: string;
}
```

### 步骤2：实现路径解析工具

```typescript
// src/utils/pathUtils.ts
import type { ResolvedPath, To } from '../types';

export function resolveTo(to: To, fromPathname: string, fromSearch: string): ResolvedPath {
  const resolved: ResolvedPath = {
    pathname: '',
    search: '',
    hash: ''
  };

  if (typeof to === 'string') {
    const toParts = to.split('?');
    const pathnameAndHash = toParts[0] || '';
    const search = toParts[1] || '';

    const [pathname, hash] = pathnameAndHash.split('#');

    resolved.pathname = resolvePathname(pathname || '/', fromPathname);
    resolved.search = resolveSearch(search || '', fromSearch);
    resolved.hash = hash || '';
  } else {
    resolved.pathname = to.pathname || fromPathname;
    resolved.search = to.search || fromSearch;
    resolved.hash = to.hash || '';
  }

  return resolved;
}

function resolvePathname(toPathname: string, fromPathname: string): string {
  if (toPathname.startsWith('/')) {
    return toPathname;
  }

  const fromSegments = fromPathname.split('/').filter(Boolean);
  const toSegments = toPathname.split('/').filter(Boolean);

  const resolvedSegments = [...fromSegments];

  for (const segment of toSegments) {
    if (segment === '..') {
      resolvedSegments.pop();
    } else if (segment !== '.') {
      resolvedSegments.push(segment);
    }
  }

  return '/' + resolvedSegments.join('/');
}

function resolveSearch(toSearch: string, fromSearch: string): string {
  const toParams = new URLSearchParams(toSearch);
  const fromParams = new URLSearchParams(fromSearch);

  // 合并搜索参数
  const merged = new URLSearchParams(fromParams);

  // toSearch 中的参数会覆盖 fromSearch 中的同名参数
  for (const [key, value] of toParams) {
    merged.set(key, value);
  }

  const mergedString = merged.toString();
  return mergedString ? `?${mergedString}` : '';
}

export function isMatch(currentPathname: string, pattern: string, options: {
  end?: boolean;
  caseSensitive?: boolean;
} = {}): boolean {
  const { end = false, caseSensitive = false } = options;

  const currentSegments = currentPathname.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);

  // 如果模式是根路径，特殊处理
  if (pattern === '/' && currentPathname === '/') {
    return true;
  }

  // 如果没有模式段，只匹配根路径
  if (patternSegments.length === 0) {
    return currentPathname === '/';
  }

  // 检查路径段
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    const currentSegment = currentSegments[i];

    // 如果当前路径已经结束但模式还有更多段，不匹配
    if (currentSegment === undefined) {
      return false;
    }

    // 动态段匹配
    if (patternSegment.startsWith(':')) {
      continue;
    }

    // 静态段比较
    const comparePattern = caseSensitive ? patternSegment : patternSegment.toLowerCase();
    const compareCurrent = caseSensitive ? currentSegment : currentSegment.toLowerCase();

    if (comparePattern !== compareCurrent) {
      return false;
    }
  }

  // 如果要求精确匹配，检查长度是否相等
  if (end && currentSegments.length !== patternSegments.length) {
    return false;
  }

  return true;
}

export function matchPath(
  pattern: string,
  pathname: string,
  options: {
    end?: boolean;
    caseSensitive?: boolean;
  } = {}
): PathMatch | null {
  const { end = false, caseSensitive = false } = options;

  if (!isMatch(pathname, pattern, { end, caseSensitive })) {
    return null;
  }

  const params: Record<string, string> = {};
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathnameSegments = pathname.split('/').filter(Boolean);

  // 提取动态参数
  for (let i = 0; i < patternSegments.length; i++) {
    const patternSegment = patternSegments[i];
    if (patternSegment.startsWith(':')) {
      const paramName = patternSegment.slice(1);
      const paramValue = pathnameSegments[i] || '';
      params[paramName] = decodeURIComponent(paramValue);
    }
  }

  return {
    pathname,
    pattern,
    params,
    isExact: pathname === pattern || (end && pathname.replace(/\/$/, '') === pattern.replace(/\/$/, ''))
  };
}
```

### 步骤3：实现 useMatch Hook

```typescript
// src/hooks/useMatch.ts
import { useMemo } from 'react';
import { useLocation } from './useLocation';
import { matchPath } from '../utils/pathUtils';
import type { PathMatch } from '../types';

export interface UseMatchOptions {
  end?: boolean;
  caseSensitive?: boolean;
}

export function useMatch(pattern: string, options: UseMatchOptions = {}): PathMatch | null {
  const location = useLocation();

  return useMemo(() => {
    return matchPath(pattern, location.pathname, options);
  }, [location.pathname, pattern, options]);
}
```

### 步骤4：实现 useResolvedPath Hook

```typescript
// src/hooks/useResolvedPath.ts
import { useMemo } from 'react';
import { useLocation } from './useLocation';
import { resolveTo } from '../utils/pathUtils';
import type { To, ResolvedPath } from '../types';

export function useResolvedPath(to: To): ResolvedPath {
  const location = useLocation();

  return useMemo(() => {
    return resolveTo(to, location.pathname, location.search);
  }, [to, location.pathname, location.search]);
}
```

### 步骤5：实现 NavLink 组件

```typescript
// src/components/NavLink.tsx
import React, { useContext } from 'react';
import { Link } from './Link';
import { NavigationContext } from '../contexts/NavigationContext';
import { useMatch, useResolvedPath } from '../hooks';
import type { NavLinkProps, NavLinkRenderProps } from '../types';

export function NavLink({
  children,
  className,
  style,
  end = false,
  caseSensitive = false,
  ...linkProps
}: NavLinkProps) {
  const location = useLocation();
  const resolvedPath = useResolvedPath(linkProps.to);
  const match = useMatch(resolvedPath.pathname, { end, caseSensitive });

  // 构建渲染属性
  const renderProps: NavLinkRenderProps = {
    isActive: !!match,
    isPending: location.pathname !== resolvedPath.pathname,
    isTransitioning: false // 可以根据导航状态扩展
  };

  // 处理 className
  const resolvedClassName = typeof className === 'function'
    ? className(renderProps)
    : className;

  // 处理 style
  const resolvedStyle = typeof style === 'function'
    ? style(renderProps)
    : style;

  // 处理 children
  const resolvedChildren = typeof children === 'function'
    ? children(renderProps)
    : children;

  return (
    <Link
      {...linkProps}
      className={resolvedClassName}
      style={resolvedStyle}
    >
      {resolvedChildren}
    </Link>
  );
}

// 为了使用 useLocation，我们需要创建一个 Hook
function useLocation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useLocation must be used within NavigationProvider');
  }
  return context.location;
}
```

### 步骤6：创建导航状态管理

```typescript
// src/contexts/NavigationStateContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface NavigationState {
  pendingLocation?: string;
  isTransitioning: boolean;
  navigationHistory: string[];
}

interface NavigationStateContextType {
  state: NavigationState;
  startNavigation: (to: string) => void;
  completeNavigation: () => void;
  cancelNavigation: () => void;
}

const NavigationStateContext = createContext<NavigationStateContextType | null>(null);

export function NavigationStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<NavigationState>({
    isTransitioning: false,
    navigationHistory: []
  });

  const startNavigation = useCallback((to: string) => {
    setState(prev => ({
      ...prev,
      pendingLocation: to,
      isTransitioning: true
    }));
  }, []);

  const completeNavigation = useCallback(() => {
    setState(prev => {
      const newHistory = prev.pendingLocation
        ? [...prev.navigationHistory, prev.pendingLocation]
        : prev.navigationHistory;

      return {
        ...prev,
        pendingLocation: undefined,
        isTransitioning: false,
        navigationHistory: newHistory
      };
    });
  }, []);

  const cancelNavigation = useCallback(() => {
    setState(prev => ({
      ...prev,
      pendingLocation: undefined,
      isTransitioning: false
    }));
  }, []);

  const contextValue: NavigationStateContextType = {
    state,
    startNavigation,
    completeNavigation,
    cancelNavigation
  };

  return (
    <NavigationStateContext.Provider value={contextValue}>
      {children}
    </NavigationStateContext.Provider>
  );
}

export function useNavigationState() {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error('useNavigationState must be used within NavigationStateProvider');
  }
  return context;
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
  NavLink,
  useMatch,
  useResolvedPath,
  useLocation
} from './mini-router';

// 页面组件
const Home = () => {
  const location = useLocation();
  return (
    <div>
      <h2>首页</h2>
      <p>当前路径: {location.pathname}</p>
    </div>
  );
};

const About = () => {
  const match = useMatch('/about');
  return (
    <div>
      <h2>关于页面</h2>
      <p>匹配状态: {match ? '已匹配' : '未匹配'}</p>
      {match && <p>参数: {JSON.stringify(match.params)}</p>}
    </div>
  );
};

const Users = () => {
  const location = useLocation();
  return (
    <div>
      <h2>用户管理</h2>
      <p>当前路径: {location.pathname}</p>
      <UserNavigation />
    </div>
  );
};

const UserList = () => (
  <div>
    <h3>用户列表</h3>
    <ul>
      <li><NavLink to="/users/1">用户 1</NavLink></li>
      <li><NavLink to="/users/2">用户 2</NavLink></li>
      <li><NavLink to="/users/3">用户 3</NavLink></li>
    </ul>
  </div>
);

const UserProfile = () => {
  const params = useParams();
  const match = useMatch('/users/:id');

  return (
    <div>
      <h3>用户详情</h3>
      <p>用户ID: {params.id}</p>
      <p>完整匹配: {match?.isExact ? '是' : '否'}</p>
      <p>模式: {match?.pattern}</p>
    </div>
  );
};

// 自定义 NavLink 渲染
const CustomNavLink = ({ to, children }: { to: string; children: string }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch(resolved.pathname);

  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) => [
        'nav-link',
        isActive && 'nav-link-active',
        isPending && 'nav-link-pending'
      ].filter(Boolean).join(' ')}
      style={({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#007bff' : '#666'
      })}
    >
      {({ isActive, isPending }) => (
        <span>
          {children}
          {isActive && ' ✓'}
          {isPending && ' ⏳'}
        </span>
      )}
    </NavLink>
  );
};

// 导航组件
const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="main-navigation">
      <div className="nav-info">
        当前路径: <code>{location.pathname}</code>
      </div>

      <div className="nav-links">
        <CustomNavLink to="/">首页</CustomNavLink>
        <CustomNavLink to="/about">关于</CustomNavLink>
        <CustomNavLink to="/users">用户管理</CustomNavLink>
        <CustomNavLink to="/contact">联系我们</CustomNavLink>
      </div>

      <div className="nav-advanced">
        <h4>高级 NavLink 示例:</h4>

        {/* 精确匹配 */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? 'exact-active' : ''}
        >
          首页 (精确匹配)
        </NavLink>

        {/* 带状态的 NavLink */}
        <NavLink
          to="/users"
          className={({ isActive, isPending, isTransitioning }) =>
            `users-link ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''} ${isTransitioning ? 'transitioning' : ''}`
          }
        >
          {({ isActive, isPending, isTransitioning }) => (
            <span>
              用户管理
              {isActive && <span className="status-indicator active">Active</span>}
              {isPending && <span className="status-indicator pending">Pending</span>}
              {isTransitioning && <span className="status-indicator transitioning">Transitioning</span>}
            </span>
          )}
        </NavLink>

        {/* 相对路径 NavLink */}
        <div className="relative-nav">
          <p>在用户页面中的相对导航:</p>
          <NavLink to="settings" relative="path">
            设置 (相对路径)
          </NavLink>
          <NavLink to="../about" relative="path">
            关于页面 (上级目录)
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const UserNavigation = () => {
  const location = useLocation();
  const usersMatch = useMatch('/users/*');

  return (
    <div className="user-navigation">
      <div className="nav-tabs">
        <NavLink
          to="/users"
          end
          className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
        >
          用户列表
        </NavLink>
        <NavLink
          to="/users/settings"
          className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
        >
          用户设置
        </NavLink>
        <NavLink
          to="/users/permissions"
          className={({ isActive }) => `tab ${isActive ? 'tab-active' : ''}`}
        >
          权限管理
        </NavLink>
      </div>

      {/* 显示当前匹配信息 */}
      {usersMatch && (
        <div className="match-info">
          <h4>路由匹配信息:</h4>
          <p><strong>路径:</strong> {usersMatch.pathname}</p>
          <p><strong>模式:</strong> {usersMatch.pattern}</p>
          <p><strong>精确匹配:</strong> {usersMatch.isExact ? '是' : '否'}</p>
          <p><strong>参数:</strong> {JSON.stringify(usersMatch.params)}</p>
        </div>
      )}

      <Routes>
        <Route path="" element={<UserList />} />
        <Route path="settings" element={<div>用户设置页面</div>} />
        <Route path="permissions" element={<div>权限管理页面</div>} />
        <Route path=":id" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

// 路由配置
const routes = [
  {
    path: '/',
    element: (
      <div>
        <Navigation />
        <main className="content">
          <Routes />
        </main>
      </div>
    ),
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'users/*',
        element: <Users />
      },
      { path: 'contact', element: <div>联系我们页面</div> },
      { path: '*', element: <div>404 - 页面未找到</div> }
    ]
  }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <div className="app">
        <header>
          <h1>React Router 6 学习示例</h1>
          <p>演示 NavLink 和路由匹配功能</p>
        </header>
      </div>
    </RouterProvider>
  );
}

export default App;
```

## 样式示例

```css
.main-navigation {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.nav-info {
  margin-bottom: 1rem;
  font-family: monospace;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.nav-link-active {
  background-color: #007bff;
  color: white;
  border-color: #0056b3;
}

.nav-link-pending {
  opacity: 0.6;
  border-style: dashed;
}

.nav-advanced {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
}

.exact-active {
  background-color: #28a745;
  color: white;
}

.users-link {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
}

.users-link.active {
  background-color: #007bff;
  color: white;
}

.status-indicator {
  margin-left: 0.5rem;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
}

.status-indicator.active {
  background-color: #28a745;
  color: white;
}

.status-indicator.pending {
  background-color: #ffc107;
  color: black;
}

.status-indicator.transitioning {
  background-color: #17a2b8;
  color: white;
}

.relative-nav {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e9ecef;
  border-radius: 4px;
}

.user-navigation {
  margin-top: 1rem;
}

.nav-tabs {
  display: flex;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  color: #495057;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.tab:hover {
  color: #007bff;
  border-bottom-color: #007bff;
}

.tab-active {
  color: #007bff;
  border-bottom-color: #007bff;
  font-weight: bold;
}

.match-info {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.match-info h4 {
  margin-top: 0;
  color: #495057;
}

.match-info p {
  margin: 0.25rem 0;
  font-family: monospace;
  font-size: 0.9rem;
}
```

## 高级用法示例

### 1. 自定义匹配逻辑

```typescript
// 自定义 Hook: 检查是否在某个路由组内
export function useMatchGroup(patterns: string[]): boolean {
  const location = useLocation();

  return useMemo(() => {
    return patterns.some(pattern => matchPath(pattern, location.pathname));
  }, [location.pathname, patterns]);
}

// 使用示例
const isInUsersSection = useMatchGroup(['/users/*', '/profile']);
```

### 2. 面包屑导航

```typescript
function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="breadcrumb">
      <NavLink to="/">首页</NavLink>
      {pathnames.map((pathname, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <span className="separator">/</span>
            {isLast ? (
              <span className="current">{pathname}</span>
            ) : (
              <NavLink to={to}>{pathname}</NavLink>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
```

### 3. 智能导航预览

```typescript
function SmartNavLink({ to, children, preview = true }: {
  to: string;
  children: React.ReactNode;
  preview?: boolean;
}) {
  const resolved = useResolvedPath(to);
  const match = useMatch(resolved.pathname);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleMouseEnter = () => {
    if (preview && !match) {
      setIsPreviewing(true);
      // 可以在这里预加载路由内容
    }
  };

  const handleMouseLeave = () => {
    setIsPreviewing(false);
  };

  return (
    <NavLink
      to={to}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={({ isActive }) => [
        'smart-link',
        isActive && 'active',
        isPreviewing && 'previewing'
      ].filter(Boolean).join(' ')}
    >
      {children}
    </NavLink>
  );
}
```

## 关键点解析

### 1. 路径解析算法

```typescript
function resolvePathname(toPathname: string, fromPathname: string): string {
  if (toPathname.startsWith('/')) {
    return toPathname; // 绝对路径
  }

  // 处理相对路径中的 ".." 和 "."
  const fromSegments = fromPathname.split('/').filter(Boolean);
  const toSegments = toPathname.split('/').filter(Boolean);

  const resolvedSegments = [...fromSegments];
  for (const segment of toSegments) {
    if (segment === '..') {
      resolvedSegments.pop(); // 返回上级目录
    } else if (segment !== '.') {
      resolvedSegments.push(segment); // 添加路径段
    }
  }

  return '/' + resolvedSegments.join('/');
}
```

### 2. 匹配状态计算

```typescript
const renderProps: NavLinkRenderProps = {
  isActive: !!match,                    // 是否匹配当前路由
  isPending: location.pathname !== to,  // 是否正在导航
  isTransitioning: false               // 是否正在过渡动画
};
```

### 3. 动态样式处理

```typescript
// 支持函数形式的 className 和 style
<NavLink
  className={({ isActive, isPending }) =>
    `nav-link ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`
  }
  style={({ isActive }) => ({
    color: isActive ? '#007bff' : '#666',
    fontWeight: isActive ? 'bold' : 'normal'
  })}
>
```

## 练习题

1. **基础练习：** 实现一个带有图标和动画的 NavLink 组件
2. **进阶练习：** 创建面包屑导航组件
3. **挑战练习：** 实现基于路由匹配的权限显示控制

## 总结

通过本章节的学习，你已经掌握了：

✅ NavLink 组件的实现和状态管理
✅ useMatch 和 useResolvedPath Hook 的原理
✅ 路径解析和匹配算法
✅ 导航交互的优化技巧

至此，我们的 React Router 6 源码学习系列就完成了！你已经从零开始实现了一个功能完整的路由系统，理解了现代前端路由的各个核心概念和实现细节。

## 项目回顾

让我们回顾一下整个系列的学习成果：

1. **第1章：** 实现了基础的 Routes 组件和路由匹配
2. **第2章：** 添加了路由切换和导航功能
3. **第3章：** 实现了嵌套路由和 Outlet 渲染
4. **第4章：** 完善了高级路由匹配算法
5. **第5章：** 添加了路由守卫和权限控制
6. **第6章：** 实现了完整的导航系统
7. **第7章：** 添加了懒加载和性能优化
8. **第8章：** 完善了 Link 状态管理和用户交互

恭喜你完成了整个学习系列！🎉

---

[返回总览](./react-router) | [上一章：懒加载](./react-router-ch07-lazy-loading) | **系列完成**