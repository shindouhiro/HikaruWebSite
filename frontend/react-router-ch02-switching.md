# 第2章：实现路由切换 - 声明式与编程式导航

**状态：** ✅ 已完成
**难度：** ⭐⭐
**预计时间：** 1.5小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-02-switching)

## 学习目标

- 理解前端路由导航的两种方式
- 实现声明式导航（Link 组件）
- 实现编程式导航（navigate 函数）
- 掌握事件处理与状态同步

## 核心概念

### 1. 声明式导航 vs 编程式导航

**声明式导航：** 使用组件声明导航行为
```jsx
<Link to="/about">关于我们</Link>
```

**编程式导航：** 通过函数调用进行导航
```jsx
const navigate = useNavigate();
navigate('/about');
```

### 2. 导航实现原理

导航的核心是修改浏览器 URL 并触发路由重新匹配：

```typescript
// 导航函数实现
function navigate(to: string, options?: { replace?: boolean }) {
  const currentPath = window.location.pathname;

  if (currentPath !== to) {
    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    // 触发路由更新
    setPath(to);
  }
}
```

## 实现步骤

### 步骤1：扩展 RouterContext

```typescript
// src/types.ts
export interface RouterContextType {
  currentPath: string;
  matchedRoute?: RouteConfig;
  setPath: (path: string) => void;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}
```

### 步骤2：实现 Link 组件

```typescript
// src/components/Link.tsx
import React from 'react';
import { useRouter } from './RouterProvider';

interface LinkProps {
  to: string;
  replace?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function Link({ to, replace, children, className, onClick }: LinkProps) {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 阻止默认的页面跳转行为
    e.preventDefault();

    // 调用自定义的导航函数
    navigate(to, { replace });

    // 执行用户提供的 onClick 处理函数
    onClick?.(e);
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
```

### 步骤3：实现 useNavigate Hook

```typescript
// src/hooks/useNavigate.ts
import { useRouter } from '../components/RouterProvider';

export function useNavigate() {
  const { navigate } = useRouter();

  return navigate;
}
```

### 步骤4：更新 RouterProvider

```typescript
// src/components/RouterProvider.tsx (更新版)
export function RouterProvider({ children, routes }: {
  children: React.ReactNode;
  routes: RouteConfig[];
}) {
  const [currentPath, setCurrentPath] = useState(() => {
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

  // 导航函数
  const navigate = React.useCallback((to: string, options?: { replace?: boolean }) => {
    const currentPath = window.location.pathname;

    if (currentPath !== to) {
      if (options?.replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }

      setCurrentPath(to);
    }
  }, []);

  const contextValue = useMemo(() => ({
    currentPath,
    matchedRoute,
    setPath: setCurrentPath,
    navigate
  }), [currentPath, matchedRoute, navigate]);

  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
}
```

## 完整示例

```typescript
// App.tsx
import React from 'react';
import { RouterProvider, Routes, Route, Link, useNavigate } from './mini-router';

// 页面组件
const Home = () => (
  <div>
    <h2>首页</h2>
    <p>这是首页内容</p>
    <Link to="/about" className="btn">前往关于页面</Link>
  </div>
);

const About = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>关于我们</h2>
      <p>这是关于页面内容</p>
      <button onClick={() => navigate('/')}>返回首页</button>
      <button onClick={() => navigate('/contact', { replace: true })}>
        联系我们（替换历史记录）
      </button>
    </div>
  );
};

const Contact = () => (
  <div>
    <h2>联系我们</h2>
    <p>联系方式：example@email.com</p>
    <Link to="/">返回首页</Link>
  </div>
);

// 导航栏组件
const Navigation = () => (
  <nav className="navigation">
    <Link to="/" className="nav-link">首页</Link>
    <Link to="/about" className="nav-link">关于</Link>
    <Link to="/contact" className="nav-link">联系</Link>
  </nav>
);

const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <div className="app">
        <Navigation />
        <main className="content">
          <Routes />
        </main>
      </div>
    </RouterProvider>
  );
}

export default App;
```

### 高级用法示例

```typescript
// 带参数的导航
const UserList = () => {
  const navigate = useNavigate();
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/users/new')}>添加新用户</button>
    </div>
  );
};

// 条件导航
const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleLogin = () => {
    // 模拟登录逻辑
    setIsLoggedIn(true);
    // 登录成功后跳转到仪表板
    navigate('/dashboard');
  };

  if (isLoggedIn) {
    return <div>正在跳转...</div>;
  }

  return (
    <div>
      <h2>登录</h2>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};
```

## 关键点解析

### 1. 事件处理

Link 组件的核心是阻止 `<a>` 标签的默认行为，然后调用自定义的导航函数：

```typescript
const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); // 阻止页面刷新
  navigate(to, { replace }); // 使用自定义导航
};
```

### 2. 历史记录管理

通过 `history.pushState` 和 `history.replaceState` 控制浏览器历史记录：

- **pushState：** 添加新的历史记录条目
- **replaceState：** 替换当前历史记录条目

### 3. 状态同步

导航操作会更新组件状态，触发重新渲染和路由匹配：

```typescript
const navigate = (to: string) => {
  window.history.pushState({}, '', to); // 更新 URL
  setCurrentPath(to); // 更新状态，触发重新渲染
};
```

## 样式增强

```css
/* 导航链接样式 */
.nav-link {
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f0f0f0;
  color: #007bff;
}

.btn {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn:hover {
  background-color: #0056b3;
}
```

## 练习题

1. **基础练习：** 实现 NavLink 组件，支持自动添加 active 类名
2. **进阶练习：** 添加导航拦截功能，支持离开页面前的确认
3. **挑战练习：** 实现导航过渡动画

## 常见问题

### Q: 为什么需要阻止 `<a>` 标签的默认行为？

A: 默认的 `<a>` 标签会导致页面刷新，这会重新加载整个应用。通过阻止默认行为并使用 `history.pushState`，我们可以实现无刷新的单页面应用导航。

### Q: `pushState` 和 `replaceState` 有什么区别？

A: `pushState` 会在浏览器历史记录中添加新条目，用户可以通过后退按钮返回之前的页面。`replaceState` 会替换当前历史记录条目，用户无法通过后退按钮返回被替换的页面。

## 下一步预告

下一章我们将实现路由渲染机制，包括：
- 嵌套路由的渲染逻辑
- Outlet 组件的实现
- 路由上下文的传递

---

[返回总览](./react-router) | [上一章：实现Routes](./react-router-ch01-routes) | [前往第3章：路由渲染](./react-router-ch03-rendering)