# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog/website built with VitePress, Vue 3, and TypeScript. The site showcases projects, technical guides, and personal interests. It uses UnoCSS for styling and is containerized with Docker for deployment.

## Key Technologies

- VitePress (Vue 3 + TypeScript)
- UnoCSS for styling
- Docker for containerization
- GitHub Actions for CI/CD
- Nginx as web server

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

- `.vitepress/` - VitePress configuration and theme
- `components/` - Vue components
- `data/` - Data files (e.g., social links)
- `.github/workflows/` - GitHub Actions workflows
- `Dockerfile` - Docker configuration
- `build.sh` - Build and deployment script
- `unocss.config.ts` - UnoCSS configuration

## Deployment

The site is automatically deployed via GitHub Actions on push to main branch. It builds a multi-architecture Docker image (amd64/arm64) and pushes to Docker Hub (shindouhiro/website).

For manual deployment:
```bash
# Build and deploy
./build.sh
```

## Styling Guidelines

- Use UnoCSS utility classes instead of traditional CSS
- Custom icons are defined in `unocss.config.ts`
- Responsive design with mobile-first approach

## Key Components

- ProfileCard.vue - Main page component showcasing projects
- Various guide components for tools like LazyGit, Yazi, Tmux, etc.
- Social media integration with QR codes

## Custom Rules

From .cursorrules:
- Use UnoCSS for styling, avoid writing custom CSS
- Create markdown files and enhance their styling with UnoCSS
- Ensure mobile compatibility
- For containerized deployment, build locally and copy files to container (no npm operations in Dockerfile)
- Package script should support both arm64 and amd64 architectures
- Images should be fetched from the web when possible


## 完成一个卡片介绍https://github.com/shindouhiro/Store
这个卡片描述技术栈
项目名称

Store（GitHub 仓库链接
）

项目类型

电商平台基础架构（后端服务 + 管理界面）

技术栈

语言：TypeScript

后端：NestJS

数据库：MySQL

容器化：Docker + Docker Compose

包管理：pnpm Monorepo (pnpm-workspace.yaml)

项目结构（核心）

server/：后端服务

ui/：前端界面（可能尚未完整实现）

admin/：管理后台

scripts/：构建/部署脚本

.github/workflows/：CI/CD 配置

特点

使用 pnpm workspace 管理多个子包，方便统一安装依赖和执行脚本。

提供了开发和生产环境的 Docker Compose 配置，便于容器化部署。

后端使用 NestJS 构建，数据库为 MySQL，适合扩展成完整电商系统。

总结

这是一个以 NestJS + MySQL + pnpm Monorepo 为核心的电商平台基础架构，支持容器化部署。前端部分可能需要自行实现或扩展。
在卡片上精简概括点击可以跳转到github仓库
