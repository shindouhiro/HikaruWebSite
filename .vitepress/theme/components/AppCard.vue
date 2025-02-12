<script setup>
// 使用 Base64 图片作为临时图标
const catProIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIyMCIgZmlsbD0iI0ZGRTRFNiIvPjxwYXRoIGQ9Ik0zNSA0NUg2NU02NSA0NVY3NU0zNSA0NVY3NU0zNSA3NUg2NSIgc3Ryb2tlPSIjRkY2QjgxIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg=='

const catIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIyMCIgZmlsbD0iI0UwRjJGRSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjIwIiBzdHJva2U9IiMzQjgyRjYiIHN0cm9rZS13aWR0aD0iNiIvPjwvc3ZnPg=='

const wordIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIyMCIgZmlsbD0iI0YzRThGRiIvPjxyZWN0IHg9IjMwIiB5PSIzMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iNiIvPjwvc3ZnPg=='
</script>

<template>
  <div class="container">
    <h2 class="title">
      <div class="i-carbon-phone text-blue-500 text-2xl"></div>
      我开发的App
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      <!-- 小猫补光灯Pro -->
      <div class="card-wrapper group">
        <div class="card">
          <div class="flex items-start gap-4">
            <div class="app-icon">
              <img :src="catProIcon" alt="小猫补光灯Pro">
              <div class="beta-tag">自拍版</div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="card-title">小猫补光灯Pro</h3>
              <div class="badge">
                <span class="i-carbon-trophy"></span>
                应用付费榜 Top1
              </div>
            </div>
          </div>
          <p class="description">专业的自拍补光工具，让你的自拍更出彩！支持自拍键盘、直出live、延时拍摄等多种功能。</p>
          <div class="action-area">
            <a href="#" class="store-btn">
              <span class="i-carbon-apple"></span>
              在 App Store 查看
            </a>
          </div>
        </div>
      </div>

      <!-- 小猫补光灯 -->
      <div class="card-wrapper group">
        <div class="card">
          <div class="flex items-start gap-4">
            <div class="app-icon">
              <img :src="catIcon" alt="小猫补光灯">
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="card-title">小猫补光灯</h3>
              <div class="badge">
                <span class="i-carbon-trophy"></span>
                3天登上分类榜 Top20
              </div>
            </div>
          </div>
          <p class="description">简洁易用的补光工具，8种专业预设光效，支持360度全色彩调节，满足各种场景需求。</p>
          <div class="action-area">
            <a href="#" class="store-btn">
              <span class="i-carbon-apple"></span>
              在 App Store 查看
            </a>
          </div>
        </div>
      </div>

      <!-- 拍照学单词 -->
      <div class="card-wrapper group">
        <div class="card">
          <div class="flex items-start gap-4">
            <div class="app-icon">
              <img :src="wordIcon" alt="拍照学单词">
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="card-title">拍照学单词</h3>
              <div class="badge">
                <span class="i-carbon-trophy"></span>
                Day1 获得收入
              </div>
            </div>
          </div>
          <p class="description">AI驱动的视觉英语学习工具，通过拍照即可学习相关英语单词，让学习融入生活的每一刻。</p>
          <div class="action-area">
            <a href="#" class="store-btn">
              <span class="i-carbon-apple"></span>
              在 App Store 查看
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  @apply max-w-7xl mx-auto py-16;
}

.title {
  @apply text-2xl font-bold flex items-center gap-3 mb-12 text-gray-800 px-4;
}

/* 卡片包装器 - 处理悬浮效果 */
.card-wrapper {
  @apply relative transition-all duration-500;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
}

/* 卡片主体 */
.card {
  @apply bg-white p-8 rounded-2xl
         border border-gray-200
         transition-all duration-500 ease-out
         shadow-[0_2px_8px_rgba(0,0,0,0.08)]
         hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
         hover:border-gray-300
         hover:scale-[1.02]
         hover:-translate-y-1;
}

/* 应用图标 */
.app-icon {
  @apply w-16 h-16 rounded-2xl relative
         shadow-sm
         transition-transform duration-300
         group-hover:scale-110
         group-hover:rotate-3;
}

.app-icon img {
  @apply w-full h-full object-cover rounded-2xl;
}

/* 标签样式 */
.beta-tag {
  @apply absolute bottom-0 left-0 right-0
         bg-gradient-to-r from-blue-500/90 to-blue-600/90
         text-white text-xs font-medium py-0.5 text-center;
}

/* 标题样式 */
.card-title {
  @apply text-lg font-bold text-gray-800 mb-1
         group-hover:text-blue-600
         transition-colors duration-300;
}

/* 成就徽章 */
.badge {
  @apply inline-flex items-center gap-1.5 
         text-amber-600 text-sm font-medium
         bg-gradient-to-r from-amber-50 to-orange-50
         px-3 py-0.5 rounded-full
         group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]
         transition-all duration-300;
}

/* 描述文本 */
.description {
  @apply mt-6 mb-8 text-gray-600 text-sm leading-relaxed;
}

/* 操作区域 */
.action-area {
  @apply mt-auto pt-6 border-t border-gray-100;
}

/* 按钮样式 */
.store-btn {
  @apply inline-flex items-center gap-2 px-6 py-2.5
         bg-black text-white text-sm font-medium rounded-full
         transition-all duration-300
         hover:bg-gray-800
         group-hover:shadow-lg
         active:scale-95;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .container {
    @apply py-8;
  }
  
  .card {
    @apply p-6;
  }
  
  .app-icon {
    @apply w-14 h-14;
  }
  
  .description {
    @apply mt-4 mb-6;
  }
  
  .action-area {
    @apply pt-4;
  }
}
</style> 
