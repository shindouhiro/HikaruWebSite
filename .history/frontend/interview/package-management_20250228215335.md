---
layout: doc
title: 前端包管理
description: 前端包管理相关知识点
aside: true
outline: deep
---

# 前端包管理

## 幽灵依赖问题

幽灵依赖（Ghost Dependencies）是指项目中使用了未在 package.json 中直接声明的依赖包。这些依赖是通过其他包间接引入的，可能会导致一些潜在的问题。

### 视频讲解

<BilibiliVideo bvid="1wT4y1b7FG" />

### 什么是幽灵依赖？

幽灵依赖通常出现在以下情况：

1. 使用了某个依赖包A的子依赖B，但B并未在package.json中声明
2. node_modules扁平化导致可以访问到未声明的包
3. 项目中直接使用了这些未声明的包

### 幽灵依赖的危害

1. 项目脆弱性
   - 依赖版本可能随主包更新而改变
   - 可能导致不同环境下的构建结果不一致

2. 安全隐患
   - 难以追踪依赖的安全漏洞
   - 更新主包时可能引入未知问题

3. 维护困难
   - 难以确定真实的依赖关系
   - 项目迁移时可能遇到问题

### 如何解决幽灵依赖？

1. 显式声明所有依赖
   ```json
   {
     "dependencies": {
       "lodash": "^4.17.21",
       "moment": "^2.29.4"
     }
   }
   ```

2. 使用依赖检查工具
   - dependency-cruiser
   - npm-check
   - depcheck

3. 采用现代包管理器
   - pnpm：使用硬链接和符号链接
   - yarn Berry：使用 PnP (Plug'n'Play)

4. 最佳实践
   - 定期审查依赖
   - 使用 lockfile 锁定版本
   - 建立依赖白名单

### 相关工具推荐

1. pnpm
   - 严格的依赖管理
   - 更快的安装速度
   - 节省磁盘空间

2. yarn Berry
   - PnP 模式
   - 零安装
   - 依赖约束

3. npm workspaces
   - 单仓多包管理
   - 依赖提升控制
   - 版本一致性

## 最佳实践建议

1. 项目初始化
   ```bash
   # 使用 pnpm
   pnpm init
   
   # 或使用 yarn
   yarn init -2
   ```

2. 依赖管理
   ```bash
   # 添加依赖时显式声明
   pnpm add package-name
   
   # 检查依赖
   pnpm why package-name
   ```

3. 配置文件
   ```json
   {
     "packageManager": "pnpm@8.0.0",
     "engines": {
       "node": ">=16"
     }
   }
   ```

4. 持续集成
   - 使用 lockfile
   - 定期更新依赖
   - 自动化安全检查
