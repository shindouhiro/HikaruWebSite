<template>
  <div class="photo-composition-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 顶部横幅 -->
      <div class="mb-12 bg-teal-600 dark:bg-teal-800 rounded-xl p-8 text-white">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            吊脚式构图
          </h1>
          <p class="text-xl opacity-90">
            摄影构图技巧系列
          </p>
        </div>
      </div>

      <!-- 示例图片 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg">
        <div class="aspect-video max-w-4xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="吊脚式构图示例"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- 添加更多示例图片展示 -->
      <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            alt="自然风景吊脚式构图"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              山峰与云海的吊脚式构图
            </p>
          </div>
        </div>
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1496564203457-11bb12075d90"
            alt="建筑吊脚式构图"
            class="w-full h-64 object-cover"
          />
          <div class="p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              摩天大楼的吊脚式构图
            </p>
          </div>
        </div>
      </div>

      <!-- 构图原理 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <div class="i-carbon-concept" />
          构图原理
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-start gap-3">
            <div class="i-carbon-image text-3xl text-teal-600 dark:text-teal-400" />
            <div>
              <h3 class="font-medium mb-2">视觉重心</h3>
              <p class="text-gray-600 dark:text-gray-400">
                主体位于画面上方，形成悬空感和张力
              </p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="i-carbon-movement text-3xl text-teal-600 dark:text-teal-400" />
            <div>
              <h3 class="font-medium mb-2">空间平衡</h3>
              <p class="text-gray-600 dark:text-gray-400">
                下方留白，创造虚实对比的视觉效果
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 应用场景 -->
      <div class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <div class="i-carbon-application" />
          应用场景
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-landscape text-xl text-teal-600 dark:text-teal-400" />
              <h3 class="font-medium">风景摄影</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              悬崖、山峰等自然景观
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-building text-xl text-teal-600 dark:text-teal-400" />
              <h3 class="font-medium">建筑摄影</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              高楼、桥梁等建筑物
            </p>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center gap-2 mb-2">
              <div class="i-carbon-person text-xl text-teal-600 dark:text-teal-400" />
              <h3 class="font-medium">人像摄影</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              特殊场景下的人物肖像
            </p>
          </div>
        </div>
      </div>

      <!-- 拍摄技巧 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-teal-600 dark:text-teal-400">
          <div class="i-carbon-skill-level" />
          拍摄技巧
        </h2>
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2 flex items-center gap-2">
              <div class="i-carbon-camera text-xl text-teal-600 dark:text-teal-400" />
              取景构图
            </h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• 主体放置在画面上方1/3处</li>
              <li>• 下方留出足够的空白空间</li>
              <li>• 注意画面的整体平衡</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 class="font-medium mb-2 flex items-center gap-2">
              <div class="i-carbon-warning text-xl text-teal-600 dark:text-teal-400" />
              注意事项
            </h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• 避免主体过小影响视觉效果</li>
              <li>• 控制好留白空间的比例</li>
              <li>• 注意背景的干扰元素</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-composition-wrapper {
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
