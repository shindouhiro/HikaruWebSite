# NPM 包发布指南

## 准备工作

### 1. 注册 NPM 账号
- 访问 [npmjs.com](https://www.npmjs.com) 注册账号
- 验证邮箱
- 设置双重认证（推荐）

### 2. 本地配置
```bash
# 登录 npm
npm login

# 检查登录状态
npm whoami
```

## 创建 NPM 包

### 1. 初始化项目
```bash
mkdir my-package
cd my-package
npm init -y
```

### 2. 配置 package.json
```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "包描述",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  },
  "keywords": ["关键词1", "关键词2"],
  "author": "你的名字",
  "license": "MIT",
  "dependencies": {
    // 依赖项
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### 3. 创建 TypeScript 配置
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## 发布流程

### 1. 构建包
```bash
npm run build
```

### 2. 发布前检查
```bash
# 检查包名是否可用
npm view my-package

# 检查包内容
npm pack --dry-run
```

### 3. 发布包
```bash
# 发布公开包
npm publish

# 发布私有包
npm publish --access private
```

## 版本管理

### 版本号规则
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 更新版本
```bash
# 更新主版本
npm version major

# 更新次版本
npm version minor

# 更新修订号
npm version patch
```

## 最佳实践

### 1. 文档
- 编写清晰的 README.md
- 添加使用示例
- 提供 API 文档

### 2. 测试
- 编写单元测试
- 添加 CI/CD 配置
- 确保测试覆盖率

### 3. 维护
- 及时修复问题
- 定期更新依赖
- 保持版本兼容性

## 常见问题

### 1. 包名冲突
- 检查包名是否已被使用
- 考虑使用作用域包名 @username/package-name

### 2. 发布失败
- 检查 npm 登录状态
- 确认包名可用
- 检查版本号是否重复

### 3. 依赖问题
- 使用 peerDependencies 声明依赖
- 避免不必要的依赖
- 保持依赖版本兼容性 