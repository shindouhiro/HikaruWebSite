# 第5章：路由守卫 - 权限控制与访问保护

**状态：** ✅ 已完成
**难度：** ⭐⭐⭐⭐
**预计时间：** 2小时
**GitHub 演示：** [查看源码 →](https://github.com/shindouhiro/mini-react-router/tree/chapter-05-guards)

## 学习目标

- 理解路由守卫的概念和应用场景
- 实现基于角色的访问控制（RBAC）
- 掌握路由拦截和重定向机制
- 实现登录认证和权限验证

## 核心概念

### 1. 路由守卫类型

- **认证守卫：** 检查用户是否已登录
- **权限守卫：** 验证用户是否有特定权限
- **角色守卫：** 基于用户角色控制访问
- **条件守卫：** 基于自定义条件控制访问

### 2. 守卫执行流程

```
用户访问路由 → 路由匹配 → 执行守卫 →
通过 → 渲染组件
拒绝 → 重定向/显示403
```

### 3. 权限控制策略

- **黑名单策略：** 明确禁止某些用户访问
- **白名单策略：** 只允许特定用户访问
- **混合策略：** 结合黑白名单的复杂控制

## 实现步骤

### 步骤1：扩展类型定义

```typescript
// src/types.ts
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
  index?: boolean;
  caseSensitive?: boolean;
  redirect?: string;
  loader?: () => Promise<any>;

  // 守卫相关字段
  guards?: RouteGuard[];
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    roles?: string[];
    permissions?: string[];
    [key: string]: any;
  };
}

export interface RouteGuard {
  type: 'auth' | 'role' | 'permission' | 'custom';
  validator: (context: GuardContext) => Promise<boolean> | boolean;
  fallback?: string | React.ReactElement; // 验证失败时的处理
}

export interface GuardContext {
  to: string;
  from: string;
  user?: User;
  params: Record<string, string>;
  location: Location;
}

export interface User {
  id: string;
  username: string;
  roles: string[];
  permissions: string[];
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}
```

### 步骤2：实现认证上下文

```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthContextType, LoginCredentials } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化时检查认证状态
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // 模拟API调用
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const { token, user } = await response.json();

      // 存储认证信息
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasRole = (role: string): boolean => {
    return user?.roles.includes(role) ?? false;
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 步骤3：实现路由守卫系统

```typescript
// src/guards/routeGuards.ts
import type { RouteGuard, GuardContext } from '../types';

// 认证守卫
export const authGuard: RouteGuard = {
  type: 'auth',
  validator: (context) => {
    // 从全局状态或localStorage检查认证状态
    const token = localStorage.getItem('auth_token');
    return !!token;
  },
  fallback: '/login'
};

// 角色守卫
export function createRoleGuard(requiredRoles: string[]): RouteGuard {
  return {
    type: 'role',
    validator: (context) => {
      if (!context.user) return false;
      return requiredRoles.some(role => context.user!.roles.includes(role));
    },
    fallback: '/unauthorized'
  };
}

// 权限守卫
export function createPermissionGuard(requiredPermissions: string[]): RouteGuard {
  return {
    type: 'permission',
    validator: (context) => {
      if (!context.user) return false;
      return requiredPermissions.every(permission =>
        context.user!.permissions.includes(permission)
      );
    },
    fallback: '/forbidden'
  };
}

// 自定义守卫
export function createCustomGuard(
  validator: (context: GuardContext) => Promise<boolean> | boolean,
  fallback?: string | React.ReactElement
): RouteGuard {
  return {
    type: 'custom',
    validator,
    fallback
  };
}

// 组合守卫
export function combineGuards(...guards: RouteGuard[]): RouteGuard {
  return {
    type: 'custom',
    validator: async (context) => {
      for (const guard of guards) {
        const result = await guard.validator(context);
        if (!result) {
          return false;
        }
      }
      return true;
    },
    fallback: guards[0]?.fallback
  };
}
```

### 步骤4：实现守卫执行器

```typescript
// src/utils/guardExecutor.ts
import type { RouteConfig, GuardContext } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from '../components/Navigate';

export async function executeGuards(
  guards: any[],
  context: GuardContext
): Promise<{ success: boolean; fallback?: string | React.ReactElement }> {
  for (const guard of guards) {
    try {
      const result = await guard.validator(context);
      if (!result) {
        return {
          success: false,
          fallback: guard.fallback || '/unauthorized'
        };
      }
    } catch (error) {
      console.error('Guard execution error:', error);
      return {
        success: false,
        fallback: '/error'
      };
    }
  }

  return { success: true };
}

export function createGuardContext(
  to: string,
  from: string,
  params: Record<string, string>
): GuardContext {
  const auth = useAuth();

  return {
    to,
    from,
    user: auth.user || undefined,
    params,
    location: window.location
  };
}
```

### 步骤5：实现受保护路由组件

```typescript
// src/components/ProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from '../components';
import { executeGuards, createGuardContext } from '../utils/guardExecutor';
import type { RouteConfig } from '../types';

interface ProtectedRouteProps {
  route: RouteConfig;
  children: React.ReactNode;
}

export function ProtectedRoute({ route, children }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [fallback, setFallback] = useState<string | React.ReactElement>('/login');

  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      if (!route.guards || route.guards.length === 0) {
        setCanAccess(true);
        setIsChecking(false);
        return;
      }

      const context = createGuardContext(
        route.path,
        location.pathname,
        {}
      );

      try {
        const result = await executeGuards(route.guards, context);
        setCanAccess(result.success);
        if (result.fallback) {
          setFallback(result.fallback);
        }
      } catch (error) {
        console.error('Guard check failed:', error);
        setCanAccess(false);
        setFallback('/error');
      } finally {
        setIsChecking(false);
      }
    };

    checkAccess();
  }, [route, location.pathname]);

  if (isChecking) {
    return <div>验证权限中...</div>;
  }

  if (!canAccess) {
    if (typeof fallback === 'string') {
      return <Navigate to={fallback} state={{ from: location.pathname }} replace />;
    }
    return fallback;
  }

  return <>{children}</>;
}
```

### 步骤6：更新 Routes 组件支持守卫

```typescript
// src/components/Routes.tsx (更新版)
import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { RoutesContext } from '../contexts/RoutesContext';

export function Routes() {
  return <RoutesRenderer />;
}

function RoutesRenderer() {
  const { matches, outlet: parentOutlet } = useRoutesContext();

  if (matches.length === 0) {
    return <div>404 - 页面未找到</div>;
  }

  return renderMatches(matches);
}

function renderMatches(matches: any[]): React.ReactElement {
  if (matches.length === 0) {
    return null;
  }

  const [currentMatch, ...remainingMatches] = matches;
  const { route } = currentMatch;

  // 创建子路由的 outlet
  const outlet = remainingMatches.length > 0
    ? renderMatches(remainingMatches)
    : null;

  const routeElement = React.cloneElement(route.element, {
    ...currentMatch.params
  });

  // 如果路由有守卫，用 ProtectedRoute 包装
  if (route.guards && route.guards.length > 0) {
    return (
      <ProtectedRoute route={route}>
        <RoutesProvider matches={remainingMatches} outlet={outlet}>
          {routeElement}
        </RoutesProvider>
      </ProtectedRoute>
    );
  }

  return (
    <RoutesProvider matches={remainingMatches} outlet={outlet}>
      {routeElement}
    </RoutesProvider>
  );
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
  ProtectedRoute,
  useAuth,
  authGuard,
  createRoleGuard,
  createPermissionGuard
} from './mini-router';

// 登录组件
const Login = () => {
  const auth = useAuth();
  const [credentials, setCredentials] = React.useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth.login(credentials);
    } catch (error) {
      alert('登录失败');
    }
  };

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <h2>登录</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="用户名"
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials,
            username: e.target.value
          })}
        />
        <input
          type="password"
          placeholder="密码"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials,
            password: e.target.value
          })}
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

// 仪表板组件
const Dashboard = () => {
  const auth = useAuth();

  return (
    <div>
      <h2>仪表板</h2>
      <p>欢迎, {auth.user?.username}!</p>
      <p>角色: {auth.user?.roles.join(', ')}</p>
      <button onClick={auth.logout}>登出</button>
    </div>
  );
};

// 管理员面板
const AdminPanel = () => {
  return (
    <div>
      <h2>管理员面板</h2>
      <p>只有管理员可以访问</p>
    </div>
  );
};

// 用户设置
const UserSettings = () => {
  return (
    <div>
      <h2>用户设置</h2>
      <p>需要用户管理权限</p>
    </div>
  );
};

// 未授权页面
const Unauthorized = () => (
  <div>
    <h2>401 - 未授权</h2>
    <p>请先登录</p>
    <Link to="/login">前往登录</Link>
  </div>
);

// 禁止访问页面
const Forbidden = () => (
  <div>
    <h2>403 - 禁止访问</h2>
    <p>您没有权限访问此页面</p>
    <Link to="/dashboard">返回仪表板</Link>
  </div>
);

// 布局组件
const Layout = () => (
  <div className="layout">
    <header>
      <nav>
        <Link to="/dashboard">仪表板</Link>
        <Link to="/admin">管理员</Link>
        <Link to="/settings">设置</Link>
        <LogoutButton />
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

const LogoutButton = () => {
  const auth = useAuth();
  if (!auth.isAuthenticated) return null;

  return <button onClick={auth.logout}>登出</button>;
};

// 路由配置
const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
        meta: { title: '登录' }
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        guards: [authGuard], // 需要认证
        meta: { title: '仪表板', requiresAuth: true }
      },
      {
        path: 'admin',
        element: <AdminPanel />,
        guards: [
          authGuard,
          createRoleGuard(['admin']) // 需要认证和管理员角色
        ],
        meta: { title: '管理员面板', requiresAuth: true, roles: ['admin'] }
      },
      {
        path: 'settings',
        element: <UserSettings />,
        guards: [
          authGuard,
          createPermissionGuard(['user:manage']) // 需要认证和用户管理权限
        ],
        meta: { title: '用户设置', requiresAuth: true, permissions: ['user:manage'] }
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />
      },
      {
        path: 'forbidden',
        element: <Forbidden />
      },
      {
        path: '',
        element: <Navigate to="/dashboard" replace />
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
// 自定义守卫示例
const createBusinessHoursGuard = (): RouteGuard => ({
  type: 'custom',
  validator: () => {
    const now = new Date();
    const hour = now.getHours();
    // 只允许工作时间（9:00-18:00）访问
    return hour >= 9 && hour < 18;
  },
  fallback: <div>系统维护中，请工作时间后再试</div>
});

// 条件守卫示例
const createConditionalGuard = (
  condition: () => boolean,
  fallback: string
): RouteGuard => ({
  type: 'custom',
  validator: condition,
  fallback
});

// 异步守卫示例
const createAsyncAuthGuard = (): RouteGuard => ({
  type: 'auth',
  validator: async (context) => {
    try {
      // 验证token是否仍然有效
      const response = await fetch('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  },
  fallback: '/login'
});
```

## 守卫中间件

```typescript
// src/middleware/guardMiddleware.ts
export class GuardMiddleware {
  private guards: RouteGuard[] = [];

  use(guard: RouteGuard) {
    this.guards.push(guard);
  }

  async execute(context: GuardContext): Promise<GuardResult> {
    for (const guard of this.guards) {
      const result = await guard.validator(context);
      if (!result) {
        return {
          success: false,
          guard: guard.type,
          fallback: guard.fallback
        };
      }
    }

    return { success: true };
  }

  clear() {
    this.guards = [];
  }
}

interface GuardResult {
  success: boolean;
  guard?: string;
  fallback?: string | React.ReactElement;
}
```

## 关键点解析

### 1. 守卫执行顺序

```typescript
// 守卫按声明顺序执行
const guards = [
  authGuard,           // 1. 先检查是否登录
  createRoleGuard(['admin']), // 2. 再检查角色
  createPermissionGuard(['user:read']) // 3. 最后检查权限
];
```

### 2. 异步守卫处理

```typescript
// 支持异步验证
const asyncGuard: RouteGuard = {
  type: 'custom',
  validator: async (context) => {
    const response = await fetch('/api/verify');
    return response.ok;
  }
};
```

### 3. 守卫组合

```typescript
// 可以组合多个守卫
const combinedGuard = combineGuards(
  authGuard,
  createRoleGuard(['user', 'admin']),
  createCustomGuard(async (context) => {
    // 自定义逻辑
    return true;
  })
);
```

## 练习题

1. **基础练习：** 实现基于时间的访问控制
2. **进阶练习：** 添加守卫执行的性能监控
3. **挑战练习：** 实现动态权限加载和更新

## 安全考虑

1. **前端守卫不足：** 前端守卫只能提升用户体验，不能替代后端权限验证
2. **Token 验证：** 定期验证认证token的有效性
3. **权限缓存：** 合理缓存用户权限，减少验证开销
4. **错误处理：** 妥善处理守卫执行失败的情况

## 下一步预告

下一章我们将完善导航功能，包括：
- 编程式导航的完整实现
- useNavigate Hook 的深入应用
- 导航状态管理
- 导航拦截和确认

---

[返回总览](./react-router) | [上一章：路由匹配与动态切换](./react-router-ch04-matching) | [前往第6章：Navigate与useNavigate](./react-router-ch06-navigation)