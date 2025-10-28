---
layout: page
title: Store 电商平台基础架构
description: 基于 NestJS + MySQL + pnpm Monorepo 的电商平台基础架构，支持容器化部署
---

# Store 电商平台基础架构

基于 NestJS + MySQL + pnpm Monorepo 的现代化电商平台基础架构，支持容器化部署，为企业级电商应用提供坚实的技术底座。

<div class="flex justify-center mb-12">
  <div class="w-full max-w-2xl">
    <StoreProjectCard />
  </div>
</div>

  ## 项目概述

Store 是一个**现代化**的电商平台基础架构，采用 **NestJS** 作为后端框架，**MySQL** 作为数据库，并使用 **pnpm workspace** 管理多个子包。

该项目支持**容器化部署**，具备**企业级**架构设计，适合扩展成完整的电商系统。

## 技术栈详情

### 后端技术

- **NestJS**: 基于 Node.js 的企业级应用框架
- **TypeScript**: 类型安全的 JavaScript 超集
- **MySQL**: 可靠的关系型数据库
- **Docker**: 容器化部署解决方案

### 开发工具

- **pnpm**: 快速、节省磁盘空间的包管理器
- **Docker Compose**: 多容器应用编排
- **GitHub Actions**: 自动化 CI/CD 流程

## 项目结构

```
Store/
├── server/          # 后端服务
├── ui/              # 前端界面（待完善）
├── admin/           # 管理后台
├── scripts/         # 构建/部署脚本
├── .github/
│   └── workflows/   # CI/CD 配置
├── docker-compose.yml
├── docker-compose.prod.yml
├── package.json
└── pnpm-workspace.yaml
```

## 核心特点

### 🏗️ Monorepo 架构
- 使用 pnpm workspace 统一管理多个子包
- 简化依赖管理和脚本执行
- 代码共享和复用更加便捷

### 🐳 容器化支持
- 提供开发和生产环境的 Docker Compose 配置
- 支持一键部署，环境一致性保证
- 便于横向扩展和负载均衡

### 🔧 企业级架构
- 基于 NestJS 的模块化架构
- 支持微服务拆分
- 完善的错误处理和日志系统

## 快速开始

### 环境要求
- Node.js >= 16
- pnpm >= 7
- Docker & Docker Compose

### 开发环境部署
```bash
# 克隆项目
git clone https://github.com/shindouhiro/Store.git
cd Store

# 安装依赖
pnpm install

# 启动开发环境
docker-compose up -d
```

### 生产环境部署
```bash
# 构建生产镜像
docker-compose -f docker-compose.prod.yml build

# 启动生产环境
docker-compose -f docker-compose.prod.yml up -d
```

## 扩展计划

- [ ] 完善前端用户界面
- [ ] 实现商品管理功能
- [ ] 添加订单处理系统
- [ ] 集成支付网关
- [ ] 实现库存管理
- [ ] 添加数据分析仪表板

---

<div class="text-center mt-8">
  <a href="https://github.com/shindouhiro/Store" target="_blank" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
    访问 GitHub 仓库
  </a>
</div>
