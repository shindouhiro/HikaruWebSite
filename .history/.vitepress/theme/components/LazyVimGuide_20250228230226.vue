<template>
  <div class="lazyvim-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 
                   bg-clip-text text-transparent">
          LazyVim
        </h1>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
          现代化的 Neovim 配置框架
        </p>
      </div>

      <!-- 视频预览 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV1uE421u7xE&autoplay=0"
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
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-star-filled" />
          核心特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">极速启动</h3>
              <p class="text-gray-600 dark:text-gray-400">
                基于懒加载机制，启动时间小于 50ms
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">智能补全</h3>
              <p class="text-gray-600 dark:text-gray-400">
                集成 LSP、Treesitter 等现代编辑器特性
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">美观界面</h3>
              <p class="text-gray-600 dark:text-gray-400">
                精心设计的主题和状态栏，支持透明度配置
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">开箱即用</h3>
              <p class="text-gray-600 dark:text-gray-400">
                合理的默认配置，支持个性化定制
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 安装方法 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div class="i-carbon-terminal" />
          快速开始
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Linux/macOS</h3>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">
                git clone https://github.com/LazyVim/starter ~/.config/nvim
              </p>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Windows</h3>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">
                git clone https://github.com/LazyVim/starter $env:LOCALAPPDATA\nvim
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用快捷键 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-purple-600 dark:text-purple-400">
          <div class="i-carbon-keyboard" />
          常用快捷键
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">查找文件</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">&lt;leader&gt;ff</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">打开文件树</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">&lt;leader&gt;e</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">全局搜索</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">&lt;leader&gt;sg</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">命令面板</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">&lt;leader&gt;cm</kbd>
          </div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="flex justify-center gap-6">
        <a href="https://github.com/LazyVim/LazyVim"
           target="_blank"
           class="flex items-center gap-2 px-6 py-3 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-300">
          <div class="i-carbon-logo-github text-xl" />
          <span>GitHub</span>
        </a>
        <a href="https://www.lazyvim.org"
           target="_blank"
           class="flex items-center gap-2 px-6 py-3 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-300">
          <div class="i-carbon-document text-xl" />
          <span>官方文档</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lazyvim-wrapper {
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
