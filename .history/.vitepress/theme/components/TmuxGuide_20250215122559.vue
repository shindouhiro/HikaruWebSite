<template>
  <div class="tmux-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 顶部横幅 -->
      <div class="mb-12 bg-purple-600 dark:bg-purple-800 rounded-xl p-8 text-white">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Tmux
          </h1>
          <p class="text-xl opacity-90">
            强大的终端复用工具
          </p>
        </div>
      </div>

      <!-- 视频预览 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV1ML411h7tF&page=1"
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
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-star-filled" />
          核心特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-terminal-screen text-3xl text-purple-600 dark:text-purple-400" />
            <div>
              <h3 class="font-medium mb-2">会话管理</h3>
              <p class="text-gray-600 dark:text-gray-400">
                创建、保存和恢复工作会话，随时继续工作
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-screen-split text-3xl text-purple-600 dark:text-purple-400" />
            <div>
              <h3 class="font-medium mb-2">窗格分割</h3>
              <p class="text-gray-600 dark:text-gray-400">
                灵活分割窗口，多任务并行处理
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-keyboard text-3xl text-purple-600 dark:text-purple-400" />
            <div>
              <h3 class="font-medium mb-2">快捷操作</h3>
              <p class="text-gray-600 dark:text-gray-400">
                强大的快捷键系统，提升操作效率
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-settings-adjust text-3xl text-purple-600 dark:text-purple-400" />
            <div>
              <h3 class="font-medium mb-2">高度定制</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持自定义配置和插件扩展
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用操作 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-operation" />
          常用操作
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-session-border text-xl text-purple-600 dark:text-purple-400" />
              <h3 class="font-medium">会话管理</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              创建、切换、分离会话
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-split text-xl text-purple-600 dark:text-purple-400" />
              <h3 class="font-medium">窗口操作</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              分割、调整、切换窗格
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-copy text-xl text-purple-600 dark:text-purple-400" />
              <h3 class="font-medium">复制模式</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              浏览、搜索、复制文本
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷键 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-keyboard" />
          常用快捷键
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">新建会话</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">prefix + :new</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">水平分割</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">prefix + %</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">垂直分割</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">prefix + "</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">切换窗格</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">prefix + ⬅️➡️⬆️⬇️</kbd>
          </div>
        </div>
      </div>

      <!-- 安装配置 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-download" />
          安装配置
        </h2>
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">使用包管理器安装</h3>
            <div class="space-y-2">
              <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                # MacOS
                brew install tmux
              </div>
              <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm">
                # Ubuntu/Debian
                sudo apt install tmux
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2">基础配置</h3>
            <div class="bg-gray-100 dark:bg-gray-900 p-3 rounded font-mono text-sm break-words whitespace-pre-wrap">
              # ~/.tmux.conf
              set -g prefix C-a
              unbind C-b
              bind C-a send-prefix
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tmux-wrapper {
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
