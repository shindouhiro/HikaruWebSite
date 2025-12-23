<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
    @click="openGitHub"
  >
    <!-- 项目头部 -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-20 h-20 bg-white opacity-10 rounded-full -ml-10 -mb-10"></div>

      <div class="relative flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-white mb-1">Store</h3>
          <p class="text-blue-100 text-sm">电商平台基础架构</p>
        </div>
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-2">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- 项目内容 -->
    <div class="p-5">
      <!-- 技术栈标签 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">技术栈</h4>
        <div class="flex flex-wrap gap-2">
          <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full">TypeScript</span>
          <span class="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs rounded-full">NestJS</span>
          <span class="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">MySQL</span>
          <span class="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full">Docker</span>
          <span class="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 text-xs rounded-full">pnpm</span>
        </div>
      </div>

      <!-- 项目特点 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">项目特点</h4>
        <ul class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
          <li class="flex items-center">
            <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            pnpm workspace 管理多子包
          </li>
          <li class="flex items-center">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            容器化部署支持
          </li>
          <li class="flex items-center">
            <span class="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            NestJS + MySQL 架构
          </li>
        </ul>
      </div>

      <!-- 项目结构 -->
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">核心结构</h4>
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-xs font-mono text-gray-600 dark:text-gray-300">
          <div class="mb-1">server/ - 后端服务</div>
          <div class="mb-1">ui/ - 前端界面</div>
          <div class="mb-1">admin/ - 管理后台</div>
          <div>scripts/ - 构建/部署脚本</div>
        </div>
      </div>

      <!-- 底部链接 -->
      <div class="flex items-center justify-between pt-3 border-t dark:border-gray-700">
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          shindouhiro/Store
        </div>
        <div class="flex items-center text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
          <span class="text-xs font-medium mr-1">查看项目</span>
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openGitHub = () => {
  window.open('https://github.com/shindouhiro/Store', '_blank')
}
</script>

<style scoped>
/* 卡片悬停效果 */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* 光滑过渡 */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>