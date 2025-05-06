<template>
  <div class="package-executor-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                   bg-clip-text text-transparent animate-fade-in">
          包执行器使用指南
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          深入理解 pnpm dlx 和 npx 的区别与使用场景
        </p>
      </div>

      <!-- 封面图 -->
      <div class="mb-12 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <img 
          src="https://i0.hdslb.com/bfs/openplatform/4ef00e8a76072f709e66a9bf0ac546f3f3042a52.png"
          alt="包执行器封面"
          class="w-full h-auto object-cover"
        />
      </div>

      <!-- 内容卡片容器 -->
      <div class="grid gap-8 md:grid-cols-2">
        <!-- pnpm dlx 卡片 -->
        <div class="card-base hover:scale-102 transition-all duration-300">
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <div class="i-logos-pnpm text-2xl" />
              pnpm dlx
            </h2>
            
            <div class="space-y-4">
              <div class="feature-item">
                <h3 class="font-medium text-lg mb-2 text-gray-800 dark:text-gray-200">特点</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>每次执行都下载最新版本</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>执行完成后自动清理</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>更安全的隔离环境</span>
                  </li>
                </ul>
              </div>

              <div class="feature-item">
                <h3 class="font-medium text-lg mb-2 text-gray-800 dark:text-gray-200">使用示例</h3>
                <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <pre class="text-sm font-mono"><code># 创建 Vue 项目
pnpm dlx create-vue my-vue-app

# 执行一次性命令
pnpm dlx http-server</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- npx 卡片 -->
        <div class="card-base hover:scale-102 transition-all duration-300">
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2 text-green-600 dark:text-green-400">
              <div class="i-logos-npm-icon text-2xl" />
              npx
            </h2>
            
            <div class="space-y-4">
              <div class="feature-item">
                <h3 class="font-medium text-lg mb-2 text-gray-800 dark:text-gray-200">特点</h3>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>优先使用本地安装的包</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>支持指定版本号</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                    <span>可以使用缓存加速</span>
                  </li>
                </ul>
              </div>

              <div class="feature-item">
                <h3 class="font-medium text-lg mb-2 text-gray-800 dark:text-gray-200">使用示例</h3>
                <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <pre class="text-sm font-mono"><code># 创建 React 项目
npx create-react-app my-app

# 指定版本执行
npx package-name@1.2.3</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 对比卡片 -->
        <div class="card-base md:col-span-2">
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              功能对比
            </h2>
            
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                    <th class="py-2 px-4 text-left">功能</th>
                    <th class="py-2 px-4 text-left">pnpm dlx</th>
                    <th class="py-2 px-4 text-left">npx</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in comparisonItems" :key="index"
                      class="border-b border-gray-200 dark:border-gray-700">
                    <td class="py-2 px-4">{{ item.feature }}</td>
                    <td class="py-2 px-4">
                      <div :class="item.pnpm ? 'text-green-500' : 'text-red-500'"
                           class="i-carbon-checkmark-outline" v-if="item.pnpm" />
                      <div :class="item.pnpm ? 'text-green-500' : 'text-red-500'"
                           class="i-carbon-close-outline" v-else />
                    </td>
                    <td class="py-2 px-4">
                      <div :class="item.npx ? 'text-green-500' : 'text-red-500'"
                           class="i-carbon-checkmark-outline" v-if="item.npx" />
                      <div :class="item.npx ? 'text-green-500' : 'text-red-500'"
                           class="i-carbon-close-outline" v-else />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const comparisonItems = [
  {
    feature: '每次使用最新版本',
    pnpm: true,
    npx: false
  },
  {
    feature: '使用本地缓存',
    pnpm: false,
    npx: true
  },
  {
    feature: '自动清理',
    pnpm: true,
    npx: false
  },
  {
    feature: '版本指定',
    pnpm: true,
    npx: true
  },
  {
    feature: '隔离环境',
    pnpm: true,
    npx: false
  }
]
</script>

<style>
.card-base {
  @apply bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg;
}

.feature-item {
  @apply p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 
         dark:from-gray-800/50 dark:to-gray-800 border border-gray-200/50 dark:border-gray-700/50;
}

.package-executor-wrapper :deep(.VPDoc) {
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

.package-executor-wrapper :deep(.VPDoc .container) {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.package-executor-wrapper :deep(.VPContent) {
  padding: 0 !important;
}

.package-executor-wrapper :deep(.VPDoc .content) {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

.package-executor-wrapper :deep(.VPDoc h1) {
  display: none;
}
</style> 