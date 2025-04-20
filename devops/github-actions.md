# GitHub Actions
<div class="flex justify-center mt-4">
<WechatShare v-bind="{title: 'GitHub Actions 自动化部署文档', desc: 'GitHub Actions 自动化部署文档'}" />
</div>

![GitHub Actions 工作流程](https://i0.hdslb.com/bfs/article/0dd01ec13b59a7a24388fc12f4aac9cd16643837.png)

## 技术蛋科普
<BilibiliPlayer
  src="//player.bilibili.com/player.html?bvid=BV1aT421y7Ar&page=1&high_quality=1&danmaku=0&autoplay=0"
  title="github actions 自动化入门"
  description="GitHub Actions工作流自动化的入门核心"
  :high-quality="true"
  :danmaku="false"
/>

## yaml文件
```yaml
name: Docker Build and Publish

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: docker.io
  IMAGE_NAME: shindouhiro/website
  REMOTE_HOST: x.x.x.x
  REMOTE_USER: root

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log into Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Extract metadata for Docker
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=raw,value=latest
            type=sha,prefix={{date 'YYYYMMDD'}}-

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      # 设置 SSH 密钥
      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.8.0
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}

      # 添加服务器到已知主机
      - name: Add server to known_hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ env.REMOTE_HOST }} >> ~/.ssh/known_hosts

      # 执行远程部署命令
      - name: Deploy to server
        run: |
          ssh ${{ env.REMOTE_USER }}@${{ env.REMOTE_HOST }} "cd docker && ./restart_services.sh"
```


## 工作流程概述

本文档详细说明了使用 GitHub Actions 进行自动化构建和部署的完整流程。

## 环境配置


```yaml
env:
  REGISTRY: docker.io
  IMAGE_NAME: shindouhiro/website
  REMOTE_HOST: x.x.x.x
  REMOTE_USER: root
```

## 构建部署流程

<script setup>
document.title = 'GitHub Actions 自动化部署文档';
const mainSteps = [
  {
    name: '代码检出',
    description: '使用 actions/checkout@v4 将代码检出到 Actions 运行环境',
    completed: true,
    time: '30s'
  },
  {
    name: 'Node.js 环境配置',
    description: '配置 Node.js v20 环境并启用 npm 缓存加速构建',
    completed: true,
    time: '45s'
  },
  {
    name: '依赖安装',
    description: '使用 npm ci 命令安装依赖，确保版本一致性',
    completed: true,
    time: '2m'
  },
  {
    name: '项目构建',
    description: '执行 npm run build 命令生成生产环境代码',
    completed: true,
    time: '1m'
  },
  {
    name: 'Docker 多架构配置',
    description: '设置 QEMU 和 Docker Buildx 支持多架构构建',
    completed: true,
    time: '30s'
  },
  {
    name: 'Docker Hub 认证',
    description: '使用配置的密钥登录 Docker Hub 准备推送镜像',
    completed: true,
    time: '15s'
  },
  {
    name: '镜像构建与推送',
    description: '构建多架构 Docker 镜像(arm64/amd64)并推送到 Docker Hub',
    completed: true,
    time: '5m'
  },
  {
    name: '服务器部署',
    description: '通过 SSH 连接部署服务器并执行更新脚本',
    completed: true,
    time: '1m'
  }
]

const secretSteps = [
  {
    name: 'Docker Hub 用户名',
    description: '配置 DOCKERHUB_USERNAME 用于 Docker Hub 认证',
    completed: true,
    time: '必需'
  },
  {
    name: 'Docker Hub 令牌',
    description: '配置 DOCKERHUB_TOKEN 用于 Docker Hub 安全认证',
    completed: true,
    time: '必需'
  },
  {
    name: 'SSH 私钥',
    description: '配置 SSH_PRIVATE_KEY 用于服务器安全连接',
    completed: true,
    time: '必需'
  }
]
</script>

### 主要构建流程

<GitHubActions
  title="构建与部署工作流"
  status="success"
  :steps="mainSteps"
/>

### 密钥配置

<GitHubActions
  title="必要的密钥配置"
  status="running"
  :steps="secretSteps"
/>

## 配置详情

### 触发条件
- 推送代码到 `main` 分支
- 对 `main` 分支创建 Pull Request

### 多架构支持
- 支持 linux/amd64 和 linux/arm64
- 使用 QEMU 和 Docker Buildx

### 部署流程
- 自动构建并推送到 Docker Hub
- 自动部署到指定服务器
- 使用 `restart_services.sh` 更新服务

### 安全措施
- 所有敏感信息通过 GitHub Secrets 管理
- 使用 SSH 密钥进行安全连接

## YAML 配置示例

### 代码检出
```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

### Node.js 配置
```yaml
- name: Set up Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '20'
    cache: 'npm'
```

### Docker 构建配置
```yaml
- name: Build and push Docker image
  uses: docker/build-push-action@v5
  with:
    context: .
    platforms: linux/amd64,linux/arm64
    push: true
    tags: ${{ steps.meta.outputs.tags }}
    labels: ${{ steps.meta.outputs.labels }}
```

### 部署配置
```yaml
- name: Deploy to server
  run: |
    ssh ${{ env.REMOTE_USER }}@${{ env.REMOTE_HOST }} "cd docker && ./restart_services.sh"
``` 