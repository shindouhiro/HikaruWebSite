#!/bin/bash

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 打印带颜色的信息
info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
if ! command -v npm &> /dev/null; then
    error "请先安装 npm"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    error "请先安装 docker"
    exit 1
fi

# 设置变量
IMAGE_NAME="shindouhiro/website"
VERSION=$(date +%Y%m%d)
PLATFORMS="linux/amd64,linux/arm64"

# 1. 清理旧的构建文件
info "清理旧的构建文件..."
rm -rf .vitepress/dist
rm -rf .vitepress/cache

# 2. 安装依赖并构建
info "安装项目依赖..."
npm install

info "构建静态文件..."
npm run build

# 检查构建是否成功
if [ ! -d ".vitepress/dist" ]; then
    error "构建失败，dist 目录不存在"
    exit 1
fi

# 3. 构建并推送多架构 Docker 镜像
info "开始构建多架构 Docker 镜像..."

# 创建 buildx 构建器
docker buildx create --use --name multiarch-builder || true

# 构建并推送多架构镜像
info "构建并推送多架构镜像..."
docker buildx build \
    --platform ${PLATFORMS} \
    --tag ${IMAGE_NAME}:latest \
    --tag ${IMAGE_NAME}:${VERSION} \
    --push \
    .

success "构建完成!"
success "版本: ${VERSION}"
success "镜像: ${IMAGE_NAME}"

# 打印使用说明
echo "
使用说明:
docker pull ${IMAGE_NAME}:latest
docker run -d -p 80:80 ${IMAGE_NAME}:latest

镜像支持的架构: ${PLATFORMS}
" 
