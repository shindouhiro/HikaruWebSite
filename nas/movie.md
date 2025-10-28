<div class="prose prose-sm md:prose lg:prose-lg xl:prose-xl mx-auto px-4 md:px-6 lg:px-8">

# NAS 私人影院资源篇

> 精选网盘检索与自动转存工具，整合搜索、转存与媒体库刷新，已适配移动端与桌面端浏览体验。

## 目录

- [CloudSaver](#cloudsaver)
- [PanSou](#pansou)
- [Quark Auto Save](#quark-auto-save)
- [使用指南](#使用指南)
- [部署](#部署)

---

## CloudSaver
-  [我的 CloudSaver](http://cloud.shindou.icu)
- **仓库**: [jiangrui1994/CloudSaver](https://github.com/jiangrui1994/CloudSaver)
- **技术栈**: Vue 3 + Express
- **特性**:
  - 响应式布局，移动端/PC 适配
  - 支持资源搜索与一键转存
  - 可通过 Docker 一键部署

<img src="https://i0.hdslb.com/bfs/openplatform/d12ca3036c0a0278c2774c52c93c8c7bda2d886c.png" alt="CloudSaver 预览" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-md mx-auto" />

---

## PanSou
- [我的 PanSou](http://pansou.shindou.icu/)
- **仓库**: [fish2018/pansou](https://github.com/fish2018/pansou)
- **定位**: 高性能网盘资源搜索 API 服务，支持 TG 搜索与自定义插件
- **特点**:
  - 并发搜索、智能排序
  - 网盘类型分类完备：百度网盘、阿里云盘、夸克、天翼、UC、移动、115、PikPak、迅雷、123、磁力、ED2K、其他

---

## Quark Auto Save
- **我的 Quark Auto Save**: [访问地址](http://quark.shindou.icu)
- **仓库**: [Cp0204/quark-auto-save](https://github.com/Cp0204/quark-auto-save)
- **功能**: 夸克网盘签到、自动转存、命名整理、推送提醒、刷新媒体库
- **适用**: 对于持续更新资源，定期自动化转存 + 文件名整理，配合 SmartStrm / OpenList / Emby 可实现自动追更

---

## 使用指南

### 使用 CloudSaver
-  [我的 CloudSaver](http://quark.shindou.icu)
1. 搜索资源
   <img src="https://i0.hdslb.com/bfs/openplatform/1a51dde2fdec91129f4aef72dc5a0164b1d0cd87.png" alt="CloudSaver 搜索资源" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />
2. 选择并执行转存
   <img src="https://i0.hdslb.com/bfs/openplatform/ee897373bdd15001982ddeae1bcf1ebf3525eadd.png" alt="CloudSaver 转存" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />
3. 保存到指定目录（如 Quark 路径）
   <img src="https://i0.hdslb.com/bfs/openplatform/1c5cc8647ae177705a4fd389af60a774926de4a5.png" alt="保存到 Quark 目录" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />
4. 扫描文件并同步到媒体库
   <img src="https://i0.hdslb.com/bfs/openplatform/7af03b1c3651de3983b762899981b229dc014d19.png" alt="扫描文件" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />

### 使用 Quark Auto Save

- 仅针对夸克资源，避免杂项污染（作者仅使用夸克网盘）
1. 搜索并设置指定保存路径
   <img src="https://i0.hdslb.com/bfs/openplatform/a0783080a56bf37ecf5efb757e912b2de38d1573.png" alt="搜索指定保存路径" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />
2. 点击执行任务
   <img src="https://i0.hdslb.com/bfs/openplatform/97f8cadbaab727885eef8dd13389217a5e93fbfc.png" alt="执行自动转存任务" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />
3. 扫描文件并刷新媒体库
   <img src="https://i0.hdslb.com/bfs/openplatform/1aa6c4003890f262fcb705c0cf988308b9b29a21.jpg" alt="扫描文件刷新媒体库" class="w-full md:w-4/5 lg:w-3/4 rounded-lg shadow-sm mx-auto" />

---

## 部署

> 建议使用 docker-compose 管理服务，映射必要数据目录，设置合适的重启策略。以下示例均为最小可用配置，请按需扩展。

### Quark Auto Save

```yaml
name: quark-auto-save
services:
  quark-auto-save:
    image: cp0204/quark-auto-save:latest
    container_name: quark-auto-save
    network_mode: bridge
    ports:
      - 5050:5005
    restart: unless-stopped
    environment:
      WEBUI_USERNAME: "xxx"
      WEBUI_PASSWORD: "xxx"
    volumes:
      - ./quark-auto-save/config:/app/config
      - ./quark-auto-save/media:/media
```

### CloudSaver

> 依赖科学上网（如 Clash）才能稳定搜索资源。

```yaml
version: "3"
services:
  cloudsaver:
    image: jiangrui1994/cloudsaver:latest
    container_name: cloud-saver
    ports:
      - "8008:8008"
    volumes:
      - ./data:/app/data
      - ./config:/app/config
    restart: unless-stopped
```

### Clash

```yaml
services:
  clash:
    image: registry.cn-hangzhou.aliyuncs.com/zanzifeng/docker-images:clash
    restart: always
    container_name: clash
    network_mode: host
    volumes:
      - ./config/config.yaml:/app/server/config.yaml
```

### PanSou

```yaml
version: '3.8'

services:
  pansou:
    image: ghcr.io/fish2018/pansou-web:latest
    container_name: pansou-app
    ports:
      - "40:80"
    environment:
      # 基础配置
      - DOMAIN=localhost
      - PANSOU_PORT=8888
      - PANSOU_HOST=127.0.0.1
    volumes:
      # 数据持久化
      - pansou-data:/app/data
      - pansou-logs:/app/logs
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  pansou-data:
    driver: local
  pansou-logs:
    driver: local
```

</div>
