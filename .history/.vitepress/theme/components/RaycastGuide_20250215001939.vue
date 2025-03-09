<template>
  <div class="raycast-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 
                   bg-clip-text text-transparent">
          Raycast
        </h1>
        <p class="mt-3 text-lg text-gray-600 dark:text-gray-400">
          现代化的效率启动器
        </p>
      </div>

      <!-- 视频预览 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV1Uo4y137XH&page=1"
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
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-orange-500 dark:text-orange-400">
          <div class="i-carbon-star-filled" />
          核心特性
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">快速启动</h3>
              <p class="text-gray-600 dark:text-gray-400">
                瞬间响应，无延迟体验
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">丰富扩展</h3>
              <p class="text-gray-600 dark:text-gray-400">
                海量插件生态，按需扩展功能
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">界面美观</h3>
              <p class="text-gray-600 dark:text-gray-400">
                现代化设计，支持自定义主题
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-checkmark text-green-500 mt-1 text-xl" />
            <div>
              <h3 class="font-medium mb-2">开发友好</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持自定义扩展开发
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 常用功能 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-orange-500 dark:text-orange-400">
          <div class="i-carbon-application" />
          常用功能
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-search text-xl" />
              <h3 class="font-medium">快速搜索</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              智能搜索文件、应用和系统功能
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-window text-xl" />
              <h3 class="font-medium">窗口管理</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              快速切换和排列应用窗口
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-code text-xl" />
              <h3 class="font-medium">开发工具</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              内置多种开发者实用工具
            </p>
          </div>
        </div>
      </div>

      <!-- 快捷键 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-orange-500 dark:text-orange-400">
          <div class="i-carbon-keyboard" />
          常用快捷键
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">打开 Raycast</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">⌘ Space</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">文件搜索</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">⌘ F</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">剪贴板历史</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">⌘ ⇧ V</kbd>
          </div>
          <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <span class="text-sm">窗口管理</span>
            <kbd class="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">⌘ ⇧ W</kbd>
          </div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="flex justify-center gap-6">
        <a href="https://www.raycast.com"
           target="_blank"
           class="flex items-center gap-2 px-6 py-3 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-300">
          <div class="i-carbon-globe text-xl" />
          <span>官方网站</span>
        </a>
        <a href="https://manual.raycast.com"
           target="_blank"
           class="flex items-center gap-2 px-6 py-3 rounded-full
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-colors duration-300">
          <div class="i-carbon-document text-xl" />
          <span>使用文档</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
.raycast-wrapper {
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
