<template>
  <div class="project-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-20 text-center">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r 
                       from-blue-600 via-purple-500 to-blue-600
                       animate-gradient-x">使用Ai完成的项目</span>
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">用代码构建有趣的产品</p>
      </div>

      <!-- 项目列表 -->
      <div class="space-y-16">
        <div v-for="project in projects" 
             :key="project.id"
             class="group">
          <!-- 主卡片 -->
          <div class="relative flex flex-col lg:flex-row
                      bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden">
            
            <!-- 左侧：项目预览 -->
            <div class="lg:w-[50%] h-64 lg:h-[400px] relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 封面图片 -->
              <img :src="project.cover" 
                   :alt="project.title"
                   class="w-full h-full object-cover transform group-hover:scale-105 
                          transition-transform duration-700 ease-out" />
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              
              <!-- 悬停时显示的标题 -->
              <div class="absolute bottom-0 left-0 right-0 p-8 z-30
                          opacity-0 group-hover:opacity-100 
                          transform group-hover:translate-y-0 translate-y-4
                          transition-all duration-500">
                <h3 class="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                  {{ project.title }}
                </h3>
                <div class="flex gap-3">
                  <span v-for="tag in project.tags.slice(0, 2)"
                        :key="tag"
                        class="px-3 py-1 text-sm font-medium rounded-full
                              bg-white/10 backdrop-blur-sm text-white
                              shadow-lg">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 右侧：项目信息 -->
            <div class="lg:w-[50%] p-6 lg:p-8 flex flex-col">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {{ project.title }}
                </h3>
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full shadow-sm',
                  project.status === '已完成' ? 
                    'bg-green-500 text-white' :
                  project.status === '进行中' ? 
                    'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                ]">
                  {{ project.status }}
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm lg:text-base leading-relaxed mb-6">
                {{ project.description }}
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in project.tags"
                      :key="tag"
                      class="px-3 py-1 text-xs font-medium rounded-full
                            bg-gray-100 dark:bg-gray-800
                            text-gray-700 dark:text-gray-300
                            hover:bg-gray-200 dark:hover:bg-gray-700
                            transition-colors duration-300">
                  {{ tag }}
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="mt-auto flex items-center">
                <!-- 链接图标 -->
                <div class="flex gap-6">
                  <a :href="project.preview" 
                     target="_blank"
                     class="text-gray-600 dark:text-gray-400 
                            hover:text-blue-600 dark:hover:text-blue-400
                            transition-colors duration-300">
                    <div class="i-carbon-view text-2xl" />
                  </a>

                  <a :href="project.github" 
                     target="_blank"
                     class="text-gray-600 dark:text-gray-400
                            hover:text-blue-600 dark:hover:text-blue-400
                            transition-colors duration-300">
                    <div class="i-carbon-logo-github text-2xl" />
                  </a>
                </div>

                <!-- 日期标签 -->
                <div class="ml-auto flex items-center gap-2
                            text-gray-500 dark:text-gray-400 text-sm">
                  <div class="i-carbon-calendar text-base" />
                  <span>{{ project.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 项目数据
const projects = [
  {
    id: 1,
    title: 'AI 助手网站',
    description: '基于 VitePress 的个人网站，集成了多个 AI 功能，包括阅读追踪、运动记录等。采用 Vue3 + TypeScript 开发，使用 UnoCSS 构建界面，支持深色模式。',
    cover: 'https://i0.hdslb.com/bfs/article/325efb2f3ba50c4b84e153572de49b7116643837.png',
    github: 'https://github.com/yourusername/project1',
    preview: 'https://your-preview-url.com',
    tags: ['Vue3', 'VitePress', 'TypeScript', 'UnoCSS'],
    status: '进行中',
    date: '2025-02-14'
  },
  {
    id: 2,
    title: 'AI 对话助手',
    description: '基于 Claude API 开发的智能对话助手，支持多轮对话、代码生成、文本分析等功能。采用 Next.js 开发，使用 Tailwind CSS 构建响应式界面。',
    cover: 'https://i0.hdslb.com/bfs/article/eae09c5b8e520066725a7317ec0452c216643837.png',
    github: 'https://github.com/yourusername/project2',
    preview: 'https://your-preview-url.com',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude API'],
    status: '已完成',
    date: '2025-01-20'
  }
]
</script>

<style scoped>
.project-wrapper {
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

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 100%;
    background-position: left center;
  }
  50% {
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

/* 添加按钮点击效果 */
a:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* 添加图片优化 */
img {
  filter: contrast(1.05) saturate(1.1);
}

.group:hover img {
  filter: contrast(1.1) saturate(1.2);
}
</style> 
