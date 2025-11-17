## mini-router@6

+ react-router6
+ 支持两种写法
## 组件嵌套写法
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

![流程图](https://i0.hdslb.com/bfs/openplatform/b05231130c92982dd68e05182af90b4b11a94dae.png)

## 对象路由配置方式

```jsx
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import Dashboard from './Dashboard';

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "about", element: <About /> },
      { path: "dashboard", element: <Dashboard /> },
    ],
  },
  { path: "/login", element: <Login /> },
];

function AppRoutes() {
  const element = useRoutes(routes); // 根据路径返回匹配的元素
  return element;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

```
