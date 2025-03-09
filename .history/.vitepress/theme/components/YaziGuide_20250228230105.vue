<template>
  <div class="yazi-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 
                   bg-clip-text text-transparent">
          Yazi
        </h1>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
          使用 Rust 编写的终端文件管理器
        </p>
      </div>

      <!-- 视频预览 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV1yRkCYVEUT&page=1&high_quality=1&danmaku=0&autoplay=0"
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
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <div class="i-carbon-star-filled" />
          主要特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">异步文件操作</h3>
              <p class="text-gray-600 dark:text-gray-400">
                基于 Rust 的异步 IO，快速处理大量文件，支持批量操作
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">预览功能</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持图片、视频、PDF等多种文件格式的预览，集成代码高亮
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">Vim 风格操作</h3>
              <p class="text-gray-600 dark:text-gray-400">
                采用类 Vim 的键位绑定，熟悉 Vim 的用户可以快速上手
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">高度可定制</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持主题定制、键位映射、插件扩展等个性化配置
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 安装方法 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <div class="i-carbon-terminal" />
          安装方法
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">macOS</h3>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">brew install yazi</p>
            </div>
          </div>
          <div>
            <h3 class="font-medium mb-3 text-gray-700 dark:text-gray-300">Cargo</h3>
            <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono">cargo install --locked yazi-fm</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 快捷操作 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <div class="i-carbon-keyboard" />
          常用快捷键
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">文件导航</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">h j k l</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">选择文件</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">Space</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">预览文件</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">i</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">搜索文件</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">/</kbd>
          </div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="flex justify-center gap-6">
        <a href="https://github.com/sxyazi/yazi"
           target="_blank"
           class="flex items-center gap-2 px-6 py-3 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-300">
          <div class="i-carbon-logo-github text-xl" />
          <span>GitHub</span>
        </a>
        <a href="https://yazi-rs.github.io/docs"
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
.yazi-wrapper {
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
