---
title: Jenkins：开源的持续集成与持续交付自动化平台
description: 完整的Jenkins安装、配置和部署流程指南
---

# Jenkins：开源的持续集成与持续交付自动化平台

<JenkinsGuide />

---



## 🚀 docker buildx 高级配置指南

<div class="p-4 rounded-lg bg-white/80 shadow-lg mb-4">
  <div class="text-lg font-bold mb-2 text-blue-600">buildkitd.toml 主要作用</div>
  <ul class="list-disc pl-6 text-base leading-relaxed text-gray-700">
    <li><span class="font-semibold text-teal-600">镜像仓库配置：</span> 支持配置 Docker Hub 或私有仓库的加速镜像，允许连接不安全的 HTTP 仓库，并可为 registry 设置认证方式。</li>
    <li><span class="font-semibold text-teal-600">缓存与构建优化：</span> 可指定本地缓存目录，配置远程缓存（push/pull 缓存），有效减少重复构建、提升构建速度。</li>
    <li><span class="font-semibold text-teal-600">Worker 运行时设置：</span> 支持选择 <code>runc</code> 或 <code>containerd</code> 作为运行时，指定支持的平台（如 <code>linux/amd64</code>、<code>linux/arm64</code>），并可设置并发数与资源限制。</li>
    <li><span class="font-semibold text-teal-600">调试与日志：</span> 可开启 debug 模式，设置 buildkitd 的监听地址，方便远程调试。</li>
  </ul>
</div>

<div class="p-4 rounded-lg bg-gray-50 shadow mb-4">
  <div class="text-base font-semibold text-purple-700 mb-2">🌐 使用镜像源加速 <span class="font-mono text-sm text-gray-800">docker.io</span> 拉取</div>
  <pre class="bg-gray-900 text-white rounded-lg p-3 text-sm overflow-x-auto"><code>[registry."docker.io"]
    mirrors = [
        "https://docker.1panel.live",
        "https://docker.1ms.run",
        "https://dytt.online",
        "https://docker-0.unsee.tech",
        "https://lispy.org",
        "https://docker.xiaogenban1993.com",
        "https://666860.xyz",
        "https://hub.rat.dev",
        "https://docker.m.daocloud.io",
        "https://demo.52013120.xyz",
        "https://proxy.vvvv.ee",
        "https://registry.cyou"
    ]
</code></pre>
  <div class="text-xs text-gray-500 mt-2">建议根据网络环境选择合适的镜像源，提升拉取速度。</div>
</div>
