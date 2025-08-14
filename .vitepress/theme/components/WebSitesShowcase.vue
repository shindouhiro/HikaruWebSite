<template>
  <div class="web-sites-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-20 text-center">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r 
                       from-blue-600 via-purple-500 to-blue-600
                       animate-gradient-x">Web网站展示</span>
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">精选的Web网站项目集合</p>
      </div>

      <!-- 网站项目网格 -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="site in webSites" :key="site.id" class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：网站预览 -->
            <div class="h-64 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br backdrop-blur-[2px] z-10"
                   :class="site.gradientClass"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 网站封面图 -->
              <img :src="site.coverImage" 
                   :alt="site.name"
                   class="w-full h-full object-cover transform group-hover:scale-105 
                          transition-transform duration-700 ease-out" />
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：网站信息 -->
            <div class="p-6">
              <!-- 网站标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {{ site.name }}
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm"
                      :class="site.statusClass">
                  {{ site.status }}
                </span>
              </div>

              <!-- 网站描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                {{ site.description }}
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-for="tag in site.tags" :key="tag"
                      class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  {{ tag }}
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <div class="flex gap-4">
                  <a v-if="site.githubUrl" :href="site.githubUrl" 
                     target="_blank"
                     class="text-gray-600 dark:text-gray-400 
                            hover:text-blue-600 dark:hover:text-blue-400
                            transition-colors duration-300">
                    <div class="i-carbon-logo-github text-2xl" />
                  </a>
                  <a v-if="site.liveUrl" :href="site.liveUrl" 
                     target="_blank"
                     class="text-gray-600 dark:text-gray-400 
                            hover:text-blue-600 dark:hover:text-blue-400
                            transition-colors duration-300">
                    <div class="i-carbon-view text-2xl" />
                  </a>
                </div>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>{{ site.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部统计信息 -->
      <div class="mt-20 text-center">
        <div class="flex justify-center items-center gap-12 text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-3">
            <span class="text-3xl">🌐</span>
            <span class="text-lg font-medium">{{ webSites.length }} 个Web网站</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl">⭐</span>
            <span class="text-lg font-medium">全部在线运行</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-3xl">🔗</span>
            <span class="text-lg font-medium">欢迎访问体验</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WebSite {
  id: string
  name: string
  description: string
  coverImage: string
  gradientClass: string
  status: string
  statusClass: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  date: string
}

const webSites: WebSite[] = [
  {
    id: 'belt-dealers',
    name: 'BeltDealers',
    description: 'Discover our collection of handcrafted leather belts. From casual to formal, find the perfect belt for every occasion.',
    coverImage: 'https://i0.hdslb.com/bfs/openplatform/1eeed7a28eac7d9091cb9c792eaf27bf4540994a.png',
    gradientClass: 'from-blue-500/20 to-green-500/20',
    status: '在线运行',
    statusClass: 'bg-green-500 text-white',
    tags: ['React', 'Next','Tailwind'],
    liveUrl: 'http://beltdealers.shindou.icu/',
  },
  {
    id: 'belt-dealer-hub',
    name: 'BeltDealerHub',
    description: '皮带经销商管理平台，提供经销商注册、产品管理、订单处理等完整解决方案',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    gradientClass: 'from-purple-500/20 to-pink-500/20',
    status: '在线运行',
    statusClass: 'bg-green-500 text-white',
    tags: ['Next.js', 'Dashboard'],
    githubUrl: 'https://github.com/yourusername/belt-dealer-hub',
    liveUrl: 'https://beltdealer-hub.com',
    date: '2025-02-08'
  },
  {
    id: 'cool-magnets',
    name: 'CoolMagnets',
    description: '创意磁铁产品展示网站，提供各种有趣和实用的磁铁产品，支持在线定制',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    gradientClass: 'from-orange-500/20 to-red-500/20',
    status: '在线运行',
    statusClass: 'bg-green-500 text-white',
    tags: ['Vue.js', 'Creative'],
    githubUrl: 'https://github.com/yourusername/cool-magnets',
    liveUrl: 'https://coolmagnets.com',
    date: '2025-02-05'
  },
  {
    id: 'cartoon-world',
    name: 'CartoonWorld',
    description: 'Bringing your wildest dreams to life through colorful characters, amazing animations, and endless creativity!',
    coverImage: 'https://i0.hdslb.com/bfs/openplatform/1713566efc4642c9f3e3b7629325e57e636fdf7e.png',
    gradientClass: 'from-yellow-500/20 to-green-500/20',
    status: '在线运行',
    statusClass: 'bg-green-500 text-white',
    tags: ['React', 'Next','Tailwind'],
    liveUrl: 'http://cartoonworld.shindou.icu/',
  }
]
</script>

<style scoped>
.web-sites-wrapper {
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .web-sites-wrapper .grid {
    @apply grid-cols-1 gap-6;
  }
  
  .web-sites-wrapper h1 {
    @apply text-4xl;
  }
  
  .web-sites-wrapper p {
    @apply text-lg;
  }
}

@media (min-width: 1024px) {
  .web-sites-wrapper .grid {
    @apply grid-cols-3;
  }
}
</style>
