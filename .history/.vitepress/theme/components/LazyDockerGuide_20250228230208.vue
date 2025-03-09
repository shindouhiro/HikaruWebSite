<template>
  <div class="lazydocker-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 顶部横幅 -->
      <div class="mb-12 bg-green-600 dark:bg-green-800 rounded-xl p-8 text-white">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            LazyDocker
          </h1>
          <p class="text-xl opacity-90">
            简单而强大的 Docker 终端管理工具
          </p>
        </div>
      </div>

      <!-- 视频预览 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV196NHeXE37&page=1&autoplay=0"
            allowfullscreen="true"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            class="w-full h-full"
          ></iframe>
        </div>
      </div>

      <!-- 主要特性 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600 dark:text-green-400">
          <div class="i-carbon-star-filled" />
          核心特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-terminal text-3xl text-green-600 dark:text-green-400" />
            <div>
              <h3 class="font-medium mb-2">终端界面</h3>
              <p class="text-gray-600 dark:text-gray-400">
                简洁的 TUI 界面，无需离开终端即可管理 Docker
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-view text-3xl text-green-600 dark:text-green-400" />
            <div>
              <h3 class="font-medium mb-2">实时监控</h3>
              <p class="text-gray-600 dark:text-gray-400">
                容器状态、日志和资源使用实时展示
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-keyboard text-3xl text-green-600 dark:text-green-400" />
            <div>
              <h3 class="font-medium mb-2">快捷操作</h3>
              <p class="text-gray-600 dark:text-gray-400">
                键盘快捷键支持，快速执行常用操作
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-settings text-3xl text-green-600 dark:text-green-400" />
            <div>
              <h3 class="font-medium mb-2">简单配置</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持自定义配置，适应个性化需求
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用操作 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600 dark:text-green-400">
          <div class="i-carbon-operation" />
          常用操作
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-container-services text-xl text-green-600 dark:text-green-400" />
              <h3 class="font-medium">容器管理</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              启动、停止、重启、删除容器
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-data-view text-xl text-green-600 dark:text-green-400" />
              <h3 class="font-medium">日志查看</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              实时查看容器日志输出
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-chart-line text-xl text-green-600 dark:text-green-400" />
              <h3 class="font-medium">资源监控</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              CPU、内存使用情况监控
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷键 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600 dark:text-green-400">
          <div class="i-carbon-keyboard" />
          常用快捷键
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">查看容器</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">1</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">查看镜像</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">2</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">查看卷</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">3</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">查看网络</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">4</kbd>
          </div>
        </div>
      </div>

      <!-- 安装方式 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600 dark:text-green-400">
          <div class="i-carbon-download" />
          安装方式
        </h2>
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">使用 Homebrew 安装</h3>
            <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
              brew install lazydocker
            </div>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">使用 Curl 安装</h3>
            <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm break-words whitespace-pre-wrap">
              curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lazydocker-wrapper {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc) {
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.VPDoc .container) {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPContent) {
  padding: 0 !important;
}

:deep(.VPDoc .content) {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc h1) {
  display: none;
}
</style> 
