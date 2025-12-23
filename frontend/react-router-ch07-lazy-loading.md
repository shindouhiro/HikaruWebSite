# 第7章：懒加载 - 代码分割与性能优化

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐⭐
**预计时间：** 2.5小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-07-lazy-loading)

## 学习目标

- 理解代码分割的原理和优势
- 实现路由级别的懒加载
- 掌握加载状态和错误处理
- 实现预加载和缓存策略

## 核心概念

### 1. 代码分割

代码分割是将应用代码拆分成多个小块，按需加载的技术：

```javascript
// 传统方式 - 所有代码打包在一起
import Home from './pages/Home';
import About from './pages/About';

// 懒加载方式 - 代码分割成独立块
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
```

### 2. React.lazy 和 Suspense

```jsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

### 3. 预加载策略

- **空闲时预加载：** 使用 `requestIdleCallback`
- **鼠标悬停预加载：** 用户交互时预加载
- **可见性预加载：** 元素进入视口时预加载

## 实现步骤

### 步骤1：扩展类型定义

```typescript
// src/types.ts
export interface LazyRouteConfig extends RouteConfig {
  lazy: () => Promise<{ default: React.ComponentType<any> }>;
  preload?: () => Promise<void>; // 预加载函数
  loading?: React.ComponentType<{ error?: Error; retry: () => void }>;
  error?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export interface LazyComponentState {
  Component: React.ComponentType<any> | null;
  loading: boolean;
  error: Error | null;
  preloadPromise: Promise<void> | null;
}

export interface PreloadStrategy {
  type: 'hover' | 'visible' | 'idle' | 'manual';
  delay?: number;
  threshold?: number;
}
```

### 步骤2：实现 LazyRoute 组件

```typescript
// src/components/LazyRoute.tsx
import React, { Suspense, lazy, ComponentType } from 'react';
import type { LazyRouteConfig } from '../types';

interface LazyRouteProps {
  route: LazyRouteConfig;
  params: Record<string, string>;
}

function DefaultLoadingComponent() {
  return <div className="lazy-loading">加载中...</div>;
}

function DefaultErrorComponent({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="lazy-error">
      <h3>加载失败</h3>
      <p>{error.message}</p>
      <button onClick={retry}>重试</button>
    </div>
  );
}

export function LazyRoute({ route, params }: LazyRouteProps) {
  const LazyComponent = React.lazy(() => {
    return route.lazy().then(module => ({
      default: () => {
        const Component = module.default;
        return <Component {...params} />;
      }
    }));
  });

  const LoadingComponent = route.loading || DefaultLoadingComponent;
  const ErrorComponent = route.error || DefaultErrorComponent;

  return (
    <ErrorBoundary fallback={ErrorComponent}>
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}

// 错误边界组件
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: ComponentType<{ error: Error; retry: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LazyRoute loading error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}
```

### 步骤3：实现预加载管理器

```typescript
// src/utils/preloadManager.ts
interface PreloadEntry {
  promise: Promise<void>;
  resolved: boolean;
  error: Error | null;
}

class PreloadManager {
  private cache = new Map<string, PreloadEntry>();
  private observers = new Map<string, IntersectionObserver>();

  // 预加载组件
  async preload(lazyFn: () => Promise<{ default: any }>, key: string): Promise<void> {
    // 检查缓存
    const cached = this.cache.get(key);
    if (cached?.resolved) {
      if (cached.error) {
        throw cached.error;
      }
      return;
    }

    // 创建新的预加载条目
    const entry: PreloadEntry = {
      promise: this.createPreloadPromise(lazyFn, key),
      resolved: false,
      error: null
    };

    this.cache.set(key, entry);

    try {
      await entry.promise;
      entry.resolved = true;
    } catch (error) {
      entry.error = error as Error;
      throw error;
    }
  }

  private async createPreloadPromise(
    lazyFn: () => Promise<{ default: any }>,
    key: string
  ): Promise<void> {
    try {
      const module = await lazyFn();
      // 预加载成功，组件已缓存
      console.log(`Component ${key} preloaded successfully`);
    } catch (error) {
      console.error(`Failed to preload component ${key}:`, error);
      throw error;
    }
  }

  // 悬停预加载
  setupHoverPreload(element: HTMLElement, lazyFn: () => Promise<{ default: any }>, key: string, delay = 200) {
    let timeoutId: NodeJS.Timeout;

    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => {
        this.preload(lazyFn, key);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // 返回清理函数
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }

  // 可见性预加载
  setupVisiblePreload(
    element: HTMLElement,
    lazyFn: () => Promise<{ default: any }>,
    key: string,
    threshold = 0.1
  ) {
    // 清理已存在的观察者
    if (this.observers.has(key)) {
      this.observers.get(key)?.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preload(lazyFn, key);
            observer.unobserve(element);
            this.observers.delete(key);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    this.observers.set(key, observer);

    // 返回清理函数
    return () => {
      observer.unobserve(element);
      this.observers.delete(key);
    };
  }

  // 空闲时预加载
  setupIdlePreload(lazyFn: () => Promise<{ default: any }>, key: string) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preload(lazyFn, key);
      });
    } else {
      // 降级到 setTimeout
      setTimeout(() => {
        this.preload(lazyFn, key);
      }, 100);
    }
  }

  // 清理缓存
  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
      this.observers.get(key)?.disconnect();
      this.observers.delete(key);
    } else {
      this.cache.clear();
      this.observers.forEach(observer => observer.disconnect());
      this.observers.clear();
    }
  }

  // 获取缓存状态
  getCacheStatus(key: string): 'pending' | 'resolved' | 'error' | 'not-found' {
    const entry = this.cache.get(key);
    if (!entry) return 'not-found';
    if (entry.resolved) return 'resolved';
    if (entry.error) return 'error';
    return 'pending';
  }
}

export const preloadManager = new PreloadManager();
```

### 步骤4：实现智能 Link 组件

```typescript
// src/components/SmartLink.tsx
import React, { useRef, useEffect } from 'react';
import { Link } from './Link';
import { preloadManager } from '../utils/preloadManager';
import type { LazyRouteConfig } from '../types';

interface SmartLinkProps {
  to: string;
  route?: LazyRouteConfig;
  preloadStrategy?: PreloadStrategy;
  children: React.ReactNode;
  className?: string;
}

export function SmartLink({
  to,
  route,
  preloadStrategy = { type: 'hover' },
  children,
  className
}: SmartLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!route || !linkRef.current) return;

    const element = linkRef.current;
    const cleanup: (() => void)[] = [];

    switch (preloadStrategy.type) {
      case 'hover':
        cleanup.push(
          preloadManager.setupHoverPreload(
            element,
            route.lazy,
            route.path,
            preloadStrategy.delay
          )
        );
        break;

      case 'visible':
        cleanup.push(
          preloadManager.setupVisiblePreload(
            element,
            route.lazy,
            route.path,
            preloadStrategy.threshold
          )
        );
        break;

      case 'idle':
        preloadManager.setupIdlePreload(route.lazy, route.path);
        break;
    }

    return () => {
      cleanup.forEach(fn => fn());
    };
  }, [route, preloadStrategy]);

  return (
    <Link ref={linkRef} to={to} className={className}>
      {children}
    </Link>
  );
}
```

### 步骤5：更新路由匹配支持懒加载

```typescript
// src/utils/routeMatcher.ts (更新版)
import type { LazyRouteConfig } from '../types';

export function matchRoutesAdvanced(
  routes: RouteConfig[],
  pathname: string,
  basename = ''
): RouteMatch[] {
  const allMatches: RouteMatch[] = [];

  function findMatches(
    routes: RouteConfig[],
    pathname: string,
    basePath = '',
    params: Record<string, string> = {},
    depth = 0
  ): void {
    for (const route of routes) {
      const match = matchPathPattern(route, pathname, route.caseSensitive);

      if (match) {
        const newParams = { ...params, ...match.params };
        const matchedPath = joinPaths(basePath, route.path);

        // 处理懒加载路由
        if ('lazy' in route) {
          const lazyRoute = route as LazyRouteConfig;

          // 立即预加载
          if (lazyRoute.preload) {
            lazyRoute.preload();
          } else {
            preloadManager.preload(lazyRoute.lazy, lazyRoute.path).catch(() => {
              // 预加载失败不影响正常导航
            });
          }
        }

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

  findMatches(routes, pathname);
  return selectBestMatches(allMatches);
}
```

### 步骤6：创建懒加载辅助函数

```typescript
// src/utils/lazyUtils.ts
import { lazy } from 'react';
import type { LazyRouteConfig } from '../types';

// 创建懒加载路由
export function createLazyRoute(
  path: string,
  lazyFn: () => Promise<{ default: React.ComponentType<any> }>,
  options: Partial<Pick<LazyRouteConfig, 'loading' | 'error' | 'preload'>> = {}
): LazyRouteConfig {
  const route: LazyRouteConfig = {
    path,
    lazy: lazyFn,
    element: null as any, // 将在 LazyRoute 中处理
    ...options
  };

  // 创建预加载函数
  if (!route.preload) {
    route.preload = () => preloadManager.preload(lazyFn, path);
  }

  return route;
}

// 批量创建懒加载路由
export function createLazyRoutes(routesConfig: Array<{
  path: string;
  importPath: string;
  componentName?: string;
  loading?: React.ComponentType<any>;
  error?: React.ComponentType<any>;
}>): LazyRouteConfig[] {
  return routesConfig.map(config => {
    const lazyFn = () => import(config.importPath).then(module => {
      const Component = config.componentName
        ? module[config.componentName]
        : module.default;

      if (!Component) {
        throw new Error(`Component ${config.componentName || 'default'} not found in ${config.importPath}`);
      }

      return { default: Component };
    });

    return createLazyRoute(config.path, lazyFn, {
      loading: config.loading,
      error: config.error
    });
  });
}

// 预加载多个路由
export async function preloadRoutes(routes: LazyRouteConfig[]) {
  const preloadPromises = routes.map(route => {
    if (route.preload) {
      return route.preload().catch(error => {
        console.warn(`Failed to preload route ${route.path}:`, error);
      });
    }
    return Promise.resolve();
  });

  await Promise.allSettled(preloadPromises);
}
```

## 完整示例

```typescript
// App.tsx
import React, { lazy, Suspense } from 'react';
import {
  RouterProvider,
  Routes,
  Route,
  Link,
  SmartLink,
  preloadManager,
  createLazyRoute
} from './mini-router';

// 懒加载组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Settings = lazy(() => import('./pages/Settings'));

// 自定义加载组件
const CustomLoading = () => (
  <div className="custom-loading">
    <div className="spinner"></div>
    <p>正在加载页面...</p>
  </div>
);

const CustomError = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="custom-error">
    <h3>😞 页面加载失败</h3>
    <p>{error.message}</p>
    <button onClick={retry} className="retry-button">重试</button>
  </div>
);

// 创建懒加载路由
const lazyRoutes = [
  createLazyRoute('/about', () => import('./pages/About'), {
    loading: CustomLoading,
    error: CustomError
  }),
  createLazyRoute('/dashboard', () => import('./pages/Dashboard')),
  createLazyRoute('/users/:id', () => import('./pages/UserProfile')),
  createLazyRoute('/settings', () => import('./pages/Settings'))
];

// 布局组件
const Layout = () => (
  <div className="layout">
    <header>
      <nav>
        <SmartLink
          to="/"
          route={createLazyRoute('/', () => import('./pages/Home'))}
          preloadStrategy={{ type: 'hover', delay: 100 }}
        >
          首页
        </SmartLink>
        <SmartLink
          to="/about"
          route={lazyRoutes[0]}
          preloadStrategy={{ type: 'hover', delay: 150 }}
        >
          关于
        </SmartLink>
        <SmartLink
          to="/dashboard"
          route={lazyRoutes[1]}
          preloadStrategy={{ type: 'visible', threshold: 0.5 }}
        >
          仪表板
        </SmartLink>
        <SmartLink
          to="/users/123"
          route={lazyRoutes[2]}
          preloadStrategy={{ type: 'idle' }}
        >
          用户123
        </SmartLink>
        <Link to="/settings">设置</Link>
      </nav>
    </header>
    <main>
      <Routes />
    </main>
  </div>
);

// 预加载管理组件
const PreloadManager = () => {
  const [preloadStatus, setPreloadStatus] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    // 监听预加载状态
    const updateStatus = () => {
      const status: Record<string, string> = {};
      lazyRoutes.forEach(route => {
        status[route.path] = preloadManager.getCacheStatus(route.path);
      });
      setPreloadStatus(status);
    };

    const interval = setInterval(updateStatus, 500);
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="preload-status">
      <h4>预加载状态:</h4>
      {Object.entries(preloadStatus).map(([path, status]) => (
        <div key={path}>
          {path}: <span className={`status-${status}`}>{status}</span>
        </div>
      ))}
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
        element: (
          <Suspense fallback={<CustomLoading />}>
            <Home />
          </Suspense>
        )
      },
      ...lazyRoutes.map(route => ({
        ...route,
        element: <LazyRoute route={route} params={{}} />
      })),
      {
        path: '*',
        element: <div>404 - 页面未找到</div>
      }
    ]
  }
];

function App() {
  // 预加载重要路由
  React.useEffect(() => {
    // 预加载首页和仪表板
    preloadManager.preload(() => import('./pages/Home'), '/home');
    preloadManager.preload(() => import('./pages/Dashboard'), '/dashboard');
  }, []);

  return (
    <div className="app">
      <RouterProvider routes={routes}>
        <Routes />
      </RouterProvider>
      <PreloadManager />
    </div>
  );
}

export default App;
```

## 样式示例

```css
.custom-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.custom-error {
  text-align: center;
  padding: 2rem;
  color: #dc3545;
}

.retry-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover {
  background-color: #0056b3;
}

.preload-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.status-pending { color: #ffc107; }
.status-resolved { color: #28a745; }
.status-error { color: #dc3545; }
.status-not-found { color: #6c757d; }
```

## 高级用法示例

### 1. 带超时的懒加载

```typescript
function createLazyRouteWithTimeout(
  path: string,
  lazyFn: () => Promise<{ default: React.ComponentType<any> }>,
  timeout = 5000
): LazyRouteConfig {
  return createLazyRoute(path, async () => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('加载超时')), timeout);
    });

    return Promise.race([lazyFn(), timeoutPromise]);
  });
}
```

### 2. 渐进式加载

```typescript
function createProgressiveLoader(components: Array<{
  path: string;
  priority: number;
  lazyFn: () => Promise<{ default: any }>;
}>) {
  // 按优先级排序
  const sorted = [...components].sort((a, b) => a.priority - b.priority);

  // 依次加载
  sorted.forEach((component, index) => {
    const delay = index * 1000; // 每个组件延迟1秒
    setTimeout(() => {
      preloadManager.preload(component.lazyFn, component.path);
    }, delay);
  });
}
```

### 3. 智能预加载策略

```typescript
class SmartPreloader {
  private userBehavior: UserBehavior = {
    visitedPages: [],
    commonPaths: [],
    timeOnPages: {}
  };

  // 分析用户行为
  analyzeBehavior(currentPath: string) {
    // 预测用户可能访问的页面
    const predictions = this.predictNextPages(currentPath);

    // 预加载高概率页面
    predictions.forEach(({ path, probability }) => {
      if (probability > 0.7) {
        preloadManager.preload(this.getLazyFn(path), path);
      }
    });
  }

  private predictNextPages(currentPath: string): Array<{ path: string; probability: number }> {
    // 基于历史数据预测下一个页面
    // 这里可以实现复杂的机器学习算法
    return [
      { path: '/dashboard', probability: 0.8 },
      { path: '/profile', probability: 0.6 }
    ];
  }

  private getLazyFn(path: string) {
    // 根据路径返回对应的懒加载函数
    const lazyMap: Record<string, () => Promise<any>> = {
      '/dashboard': () => import('./pages/Dashboard'),
      '/profile': () => import('./pages/Profile')
    };
    return lazyMap[path];
  }
}
```

## 性能优化技巧

### 1. 代码分割策略

```javascript
// 按路由分割
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// 按功能分割
const AdminDashboard = lazy(() => import('./features/admin/Dashboard'));
const UserDashboard = lazy(() => import('./features/user/Dashboard'));

// 按组件尺寸分割
const HeavyComponent = lazy(() => import(/* webpackChunkName: "heavy" */ './components/Heavy'));
const LightComponent = lazy(() => import(/* webpackChunkName: "light" */ './components/Light'));
```

### 2. 预加载优化

```typescript
// 关键路由立即预加载
const criticalRoutes = ['/dashboard', '/profile'];
criticalRoutes.forEach(path => {
  preloadManager.preload(getLazyFn(path), path);
});

// 非关键路由延迟预加载
setTimeout(() => {
  const nonCriticalRoutes = ['/settings', '/help'];
  nonCriticalRoutes.forEach(path => {
    preloadManager.preload(getLazyFn(path), path);
  });
}, 3000);
```

## 关键点解析

### 1. 懒加载原理

```typescript
const LazyComponent = lazy(() => import('./Component'));
// 编译后会变成：
const LazyComponent = lazy(() =>
  __webpack_require__.e(/* import() */ 0).then(__webpack_require__.bind(null, 1))
);
```

### 2. Suspense 边界

```jsx
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
// 当 LazyComponent 加载时，显示 Loading 组件
// 加载完成后，自动切换到 LazyComponent
```

### 3. 错误处理

```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // 记录错误
    console.error('Lazy loading error:', error);

    // 发送错误报告
    reportError(error, errorInfo);
  }
}
```

## 练习题

1. **基础练习：** 实现带进度的加载指示器
2. **进阶练习：** 添加基于网络状况的自适应加载
3. **挑战练习：** 实现智能预加载算法

## 常见问题

### Q: 懒加载会影响SEO吗？

A: 服务器端渲染(SSR)时，懒加载组件会在服务器上完整渲染，不影响SEO。客户端渲染时，搜索引擎可能无法抓取懒加载内容。

### Q: 如何处理懒加载的样式？

A: 使用 CSS-in-JS 或确保样式文件不依赖于组件的懒加载，可以在主入口中提前加载关键样式。

## 下一步预告

下一章我们将实现 Link 状态管理，包括：
- NavLink 组件的实现
- useMatch 和 useResolvedPath Hook
- 路由状态同步
- 导航交互优化

---

[返回总览](./react-router) | [上一章：Navigate与useNavigate](./react-router-ch06-navigation) | [前往第8章：Link状态管理](./react-router-ch08-link-state)