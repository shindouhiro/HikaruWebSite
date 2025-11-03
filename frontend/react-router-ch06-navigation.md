# 第6章：Navigate与useNavigate - 完整导航系统

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐
**预计时间：** 2小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-06-navigation)

## 学习目标

- 掌握编程式导航的完整实现
- 理解导航状态管理和历史记录控制
- 实现导航拦截和确认机制
- 掌握相对路径导航和状态传递

## 核心概念

### 1. 导航类型

- **声明式导航：** 使用 `<Link>` 和 `<Navigate>` 组件
- **编程式导航：** 使用 `useNavigate()` Hook
- **相对导航：** 基于当前路径的相对跳转
- **绝对导航：** 基于根路径的绝对跳转

### 2. 导航选项

```typescript
interface NavigateOptions {
  replace?: boolean;    // 是否替换当前历史记录
  state?: any;         // 传递状态数据
  preventScrollReset?: boolean; // 阻止滚动位置重置
  relative?: 'route' | 'path';  // 相对路径类型
}
```

### 3. 导航状态

- **location.state：** 在路由间传递的临时状态
- **navigation.state：** 导航过程中的状态信息
- **history.action：** 浏览器历史操作类型

## 实现步骤

### 步骤1：扩展导航类型定义

```typescript
// src/types.ts
export interface NavigationState {
  from?: string;
  to?: string;
  type: 'push' | 'replace';
  timestamp: number;
  userState?: any;
}

export interface Location {
  pathname: string;
  search: string;
  hash: string;
  state?: any;
  key: string;
}

export interface To {
  pathname?: string;
  search?: string;
  hash?: string;
}

export interface NavigateFunction {
  (to: To | number, options?: NavigateOptions): void;
}

export interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: 'route' | 'path';
}
```

### 步骤2：实现导航状态管理

```typescript
// src/contexts/NavigationContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { NavigationState, NavigateFunction, NavigateOptions, To } from '../types';

interface NavigationContextType {
  location: Location;
  action: 'POP' | 'PUSH' | 'REPLACE';
  navigate: NavigateFunction;
  block: (prompt: string | boolean | ((location: Location, action: string) => boolean)) => () => void;
  go: (delta: number) => void;
  back: () => void;
  forward: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useState<Location>(() => createLocation(window.location));
  const [action, setAction] = useState<'POP' | 'PUSH' | 'REPLACE'>('POP');
  const [isBlocked, setIsBlocked] = useState<string | boolean | null>(null);

  // 导航函数
  const navigate = useCallback((to: To | number, options: NavigateOptions = {}) => {
    if (typeof to === 'number') {
      // 数字导航：go(n)
      window.history.go(to);
      return;
    }

    const targetLocation = resolveLocation(to, location, options.relative);
    const targetPath = createPath(targetLocation);

    // 检查导航拦截
    if (isBlocked) {
      const shouldBlock = typeof isBlocked === 'function'
        ? isBlocked(targetLocation, options.replace ? 'REPLACE' : 'PUSH')
        : isBlocked;

      if (shouldBlock) {
        return; // 阻止导航
      }
    }

    // 执行导航
    if (options.replace) {
      window.history.replaceState(
        { ...window.history.state, userState: options.state },
        '',
        targetPath
      );
      setAction('REPLACE');
    } else {
      window.history.pushState(
        { ...window.history.state, userState: options.state },
        '',
        targetPath
      );
      setAction('PUSH');
    }

    const newLocation = createLocation(window.location, options.state);
    setLocation(newLocation);

    // 处理滚动重置
    if (!options.preventScrollReset) {
      window.scrollTo(0, 0);
    }
  }, [location, isBlocked]);

  // 阻塞导航
  const block = useCallback((prompt: string | boolean | ((location: Location, action: string) => boolean)) => {
    setIsBlocked(prompt);
    return () => setIsBlocked(null);
  }, []);

  // 历史导航
  const go = useCallback((delta: number) => {
    window.history.go(delta);
  }, []);

  const back = useCallback(() => {
    window.history.back();
  }, []);

  const forward = useCallback(() => {
    window.history.forward();
  }, []);

  // 监听浏览器历史变化
  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const newLocation = createLocation(window.location, event.state?.userState);
      setLocation(newLocation);
      setAction('POP');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const contextValue: NavigationContextType = {
    location,
    action,
    navigate,
    block,
    go,
    back,
    forward
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

// 辅助函数
function createLocation(from: Location | string, state?: any, key?: string): Location {
  let location: Location;

  if (typeof from === 'string') {
    const url = new URL(from, window.location.origin);
    location = {
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      state,
      key: key || createKey()
    };
  } else {
    location = {
      ...from,
      state: state ?? from.state,
      key: from.key || createKey()
    };
  }

  return location;
}

function resolveLocation(to: To, currentLocation: Location, relative: 'route' | 'path' = 'path'): Location {
  if (typeof to === 'string') {
    return resolvePath(to, currentLocation);
  }

  return {
    pathname: to.pathname ?? currentLocation.pathname,
    search: to.search ?? currentLocation.search,
    hash: to.hash ?? currentLocation.hash,
    state: undefined,
    key: createKey()
  };
}

function resolvePath(to: string, from: Location): Location {
  let resolvedPathname: string;

  if (to.startsWith('/')) {
    // 绝对路径
    resolvedPathname = to;
  } else {
    // 相对路径
    const fromPathname = from.pathname;
    const basePathname = fromPathname.substring(0, fromPathname.lastIndexOf('/'));
    resolvedPathname = `${basePathname}/${to}`.replace(/\/+/g, '/');
  }

  const url = new URL(resolvedPathname, window.location.origin);

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    key: createKey()
  };
}

function createPath(location: Location): string {
  return `${location.pathname}${location.search}${location.hash}`;
}

function createKey(): string {
  return Math.random().toString(36).substr(2, 8);
}
```

### 步骤3：实现 useNavigate Hook

```typescript
// src/hooks/useNavigate.ts
import { useCallback } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import type { NavigateFunction, NavigateOptions, To } from '../types';

export function useNavigate(): NavigateFunction {
  const { navigate, location } = useNavigation();

  return useCallback((to: To | number, options: NavigateOptions = {}) => {
    navigate(to, options);
  }, [navigate, location]);
}
```

### 步骤4：更新 Navigate 组件

```typescript
// src/components/Navigate.tsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from '../hooks';
import type { To, NavigateOptions } from '../types';

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}

export function Navigate({ to, replace = false, state, preventScrollReset }: NavigateProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(to, { replace, state, preventScrollReset });
  }, [navigate, to, replace, state, preventScrollReset]);

  // 渲染空内容或加载状态
  return null;
}
```

### 步骤5：实现 useLocation Hook

```typescript
// src/hooks/useLocation.ts
import { useContext } from 'react';
import { NavigationContext } from '../contexts/NavigationContext';
import type { Location } from '../types';

export function useLocation(): Location {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useLocation must be used within NavigationProvider');
  }
  return context.location;
}
```

### 步骤6：实现导航拦截 Hook

```typescript
// src/hooks/useBlocker.ts
import { useCallback } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export function useBlocker(
  block: boolean | ((location: Location, action: string) => boolean)
): () => void {
  const { block: navigationBlock } = useNavigation();

  return useCallback(() => {
    if (block) {
      return navigationBlock(block);
    }
    return () => {};
  }, [navigationBlock, block]);
}

// 便捷 Hook：使用确认对话框
export function usePrompt(
  message: string,
  when: boolean = true
): void {
  const blocker = useCallback((location: Location, action: string) => {
    if (when) {
      return window.confirm(message);
    }
    return true;
  }, [message, when]);

  useBlocker(when ? blocker : false);
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
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  useBlocker,
  usePrompt
} from './mini-router';

// 页面组件
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>首页</h2>
      <button onClick={() => navigate('/about')}>跳转到关于页面</button>
      <button onClick={() => navigate(-1)}>后退</button>
      <button onClick={() => navigate(1)}>前进</button>
    </div>
  );
};

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h2>关于页面</h2>
      <p>当前路径: {location.pathname}</p>
      <p>状态: {JSON.stringify(location.state)}</p>
      <button onClick={() => navigate('/', { state: { from: 'about' } })}>
        返回首页（带状态）
      </button>
    </div>
  );
};

// 带表单的页面
const FormPage = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '' });
  const [isDirty, setIsDirty] = React.useState(false);
  const navigate = useNavigate();

  // 当表单有未保存的更改时，阻止导航
  usePrompt('您有未保存的更改，确定要离开吗？', isDirty);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟保存
    setTimeout(() => {
      setIsDirty(false);
      navigate('/success', { state: { formData } });
    }, 1000);
  };

  return (
    <div>
      <h2>表单页面</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="姓名"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="邮箱"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">保存</button>
      </form>
      <Link to="/">取消</Link>
    </div>
  );
};

// 成功页面
const SuccessPage = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div>
      <h2>保存成功！</h2>
      {formData && (
        <div>
          <p>姓名: {formData.name}</p>
          <p>邮箱: {formData.email}</p>
        </div>
      )}
      <Link to="/">返回首页</Link>
    </div>
  );
};

// 用户详情页
const UserProfile = () => {
  const params = useParams();
  const navigate = useNavigate();

  const goToUserSettings = () => {
    // 相对导航
    navigate('settings', { relative: 'route' });
  };

  const goToRelatedUser = (relatedId: string) => {
    // 绝对导航
    navigate(`/users/${relatedId}`);
  };

  return (
    <div>
      <h2>用户详情</h2>
      <p>用户ID: {params.id}</p>
      <button onClick={goToUserSettings}>用户设置</button>
      <button onClick={() => goToRelatedUser('123')}>相关用户</button>
      <button onClick={() => navigate('/users')}>返回用户列表</button>
    </div>
  );
};

// 导航拦截示例
const NavigationBlockerExample = () => {
  const [shouldBlock, setShouldBlock] = React.useState(false);
  const navigate = useNavigate();
  const unblock = useBlocker(shouldBlock);

  return (
    <div>
      <h2>导航拦截示例</h2>
      <label>
        <input
          type="checkbox"
          checked={shouldBlock}
          onChange={(e) => setShouldBlock(e.target.checked)}
        />
        阻止所有导航
      </label>
      <button onClick={() => navigate('/')}>尝试导航</button>
      {shouldBlock && <p>导航已被阻止！</p>}
    </div>
  );
};

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
    path: '/form',
    element: <FormPage />
  },
  {
    path: '/success',
    element: <SuccessPage />
  },
  {
    path: '/users/:id',
    element: <UserProfile />,
    children: [
      {
        path: 'settings',
        element: <div>用户设置页面</div>
      }
    ]
  },
  {
    path: '/blocker',
    element: <NavigationBlockerExample />
  }
];

function App() {
  return (
    <RouterProvider routes={routes}>
      <div className="app">
        <nav>
          <Link to="/">首页</Link>
          <Link to="/about">关于</Link>
          <Link to="/form">表单</Link>
          <Link to="/users/123">用户123</Link>
          <Link to="/blocker">导航拦截</Link>
        </nav>
        <main>
          <Routes />
        </main>
      </div>
    </RouterProvider>
  );
}

export default App;
```

## 高级用法示例

### 1. 程序化导航封装

```typescript
// hooks/useAppNavigation.ts
export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate('/'),
    goToLogin: (redirectPath?: string) =>
      navigate('/login', { state: { redirect: redirectPath } }),
    goToDashboard: () => navigate('/dashboard', { replace: true }),
    goBack: () => navigate(-1),
    // 自定义导航逻辑
    goToUser: (userId: string, tab?: string) => {
      const path = tab ? `/users/${userId}/${tab}` : `/users/${userId}`;
      navigate(path);
    }
  };
}
```

### 2. 导航状态持久化

```typescript
// hooks/useNavigationPersistence.ts
export function useNavigationPersistence() {
  const location = useLocation();
  const navigate = useNavigate();

  // 保存导航状态到 sessionStorage
  const saveNavigationState = useCallback(() => {
    sessionStorage.setItem('lastLocation', JSON.stringify({
      pathname: location.pathname,
      search: location.search,
      state: location.state
    }));
  }, [location]);

  // 恢复导航状态
  const restoreNavigationState = useCallback(() => {
    const saved = sessionStorage.getItem('lastLocation');
    if (saved) {
      const { pathname, search, state } = JSON.parse(saved);
      navigate({ pathname, search }, { replace: true, state });
    }
  }, [navigate]);

  return { saveNavigationState, restoreNavigationState };
}
```

### 3. 智能导航拦截

```typescript
// hooks/useSmartNavigationBlock.ts
export function useSmartNavigationBlock(conditions: {
  hasUnsavedChanges?: boolean;
  isUploading?: boolean;
  customCondition?: () => boolean;
}) {
  const blocker = useCallback((location: Location, action: string) => {
    if (conditions.isUploading) {
      return window.confirm('文件正在上传中，确定要离开吗？');
    }

    if (conditions.hasUnsavedChanges) {
      return window.confirm('您有未保存的更改，确定要离开吗？');
    }

    if (conditions.customCondition?.()) {
      return window.confirm('确定要离开当前页面吗？');
    }

    return true;
  }, [conditions]);

  return useBlocker(blocker);
}
```

## 关键点解析

### 1. 相对路径解析

```typescript
function resolvePath(to: string, from: Location): Location {
  if (to.startsWith('/')) {
    // 绝对路径: /users/123
    return { pathname: to, search: '', hash: '' };
  } else {
    // 相对路径: settings -> /users/123/settings
    const basePath = from.pathname.substring(0, from.pathname.lastIndexOf('/'));
    return { pathname: `${basePath}/${to}`, search: '', hash: '' };
  }
}
```

### 2. 导航状态传递

```typescript
// 导航时传递状态
navigate('/target', { state: { from: '/source', data: 'example' } });

// 在目标页面获取状态
const location = useLocation();
const state = location.state; // { from: '/source', data: 'example' }
```

### 3. 导航拦截机制

```typescript
// 设置导航拦截
const unblock = useBlocker((location, action) => {
  return window.confirm('确定要离开吗？');
});

// 清除拦截
unblock();
```

## 练习题

1. **基础练习：** 实现导航历史记录的可视化显示
2. **进阶练习：** 添加导航性能监控和分析
3. **挑战练习：** 实现智能预加载机制

## 常见问题

### Q: `navigate(-1)` 和 `navigate('/back')` 有什么区别？

A: `navigate(-1)` 是浏览器历史导航，会后退到上一个历史记录。`navigate('/back')` 是路径导航，会跳转到 `/back` 路径。

### Q: 如何实现页面离开前的确认？

A: 使用 `usePrompt` Hook 或 `useBlocker` Hook 来拦截导航并显示确认对话框。

## 下一步预告

下一章我们将实现懒加载功能，包括：
- 路由级别的代码分割
- 动态导入和加载状态
- 预加载和缓存策略
- 错误边界处理

---

[返回总览](./react-router) | [上一章：路由守卫](./react-router-ch05-guards) | [前往第7章：懒加载](./react-router-ch07-lazy-loading)