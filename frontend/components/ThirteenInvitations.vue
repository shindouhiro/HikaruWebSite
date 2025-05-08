<template>
  <div class="bg-gray-50 dark:bg-gray-900 thirteen-invitations-wrapper">
    <div class="w-full min-h-screen px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                   bg-clip-text text-transparent animate-fade-in">
          十三邀打卡
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400">
          记录每一期的观看记录
        </p>
      </div>
{{currentSeason}}
      <!-- 季数选择器 -->
      <div class="mb-8 flex flex-wrap justify-center gap-4">
        <button
          v-for="season in 8"
          :key="season"
          @click="() => currentSeason = season"
          class="px-6 py-2 rounded-full transition-all duration-200 shadow-sm"
          :class="[
            currentSeason === season 
              ? 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50 hover:bg-blue-200 dark:hover:bg-blue-900/50 active:bg-blue-300 dark:active:bg-blue-900/70 shadow-md' 
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 hover:shadow-md'
          ]"
        >
          第{{ season }}季
        </button>
      </div>

      <!-- 集数列表 -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="episode in currentSeasonEpisodes"
          :key="episode.id"
          class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden
                 transition-all duration-200
                 border border-gray-200 dark:border-gray-700
                 hover:shadow-lg dark:hover:shadow-gray-900/50
                 hover:translate-y-[-2px]"
          :class="episode.watched ? 'border-green-500/20' : ''"
        >
          <div class="relative overflow-hidden">
            <!-- 封面图 -->
            <img
              :src="episode.cover"
              :alt="episode.title"
              class="w-full aspect-video object-cover"
            />
            <!-- 观看状态标签 -->
            <div
              v-if="episode.watched"
              class="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm
                     shadow-lg backdrop-blur-sm bg-opacity-90"
            >
              已观看
            </div>
          </div>

          <div class="p-4">
            <h3 class="text-lg font-medium mb-1 text-gray-800 dark:text-gray-200 line-clamp-2">
              {{ episode.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
              {{ episode.guest }}
            </p>
            
            <!-- 观看日期 -->
            <div v-if="episode.watched" class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              <i class="i-carbon-calendar mr-1"></i>
              观看日期：{{ episode.watchDate }}
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Episode {
  id: string
  title: string
  guest: string
  cover: string
  watched: boolean
  watchDate?: string
}

// 当前选中的季数
const currentSeason = ref<number>(1)

// 模拟数据 - 实际使用时可以从API获取
const episodes = ref<Record<number, Episode[]>>({
  1: [
    {
      id: '1-1',
      title: '许知远对话罗振宇',
      guest: '罗振宇',
      cover: 'https://i0.hdslb.com/bfs/article/watermark/1234567890.jpg',
      watched: true,
      watchDate: '2024-03-15'
    },
    {
      id: '1-2', 
      title: '许知远对话柯文哲',
      guest: '柯文哲',
      cover: 'https://i0.hdslb.com/bfs/archive/7d6a20b48c9fd347dd87e3289bb87b886a94e2e3.jpg',
      watched: false
    },
    {
      id: '1-3',
      title: '许知远对话李诞',
      guest: '李诞',
      cover: 'https://i0.hdslb.com/bfs/archive/4c5c0d19bf3deb0b4df4925d1c9008d2a2d4fb37.jpg', 
      watched: false
    },
    {
      id: '1-4',
      title: '许知远对话韩寒',
      guest: '韩寒',
      cover: 'https://i0.hdslb.com/bfs/archive/d1e6ea6d602c603686f9a1e40bc5035e7d4d8ee0.jpg',
      watched: false
    },
    {
      id: '1-5',
      title: '许知远对话蔡康永',
      guest: '蔡康永',
      cover: 'https://i0.hdslb.com/bfs/archive/f9e2f78d4c8a10d1a5fa66d3d1e7b5c8a7f5e5d3.jpg',
      watched: false
    }
  ],
  // 更多季数...
})

// 当前季的集数列表
const currentSeasonEpisodes = computed(() => {
  return episodes.value[currentSeason.value] || []
})

// 标记为已观看
const markAsWatched = (episode: Episode) => {
  episode.watched = true
  episode.watchDate = new Date().toISOString().split('T')[0]
}

// 取消标记
const markAsUnwatched = (episode: Episode) => {
  episode.watched = false
  episode.watchDate = undefined
}
</script>

<style scoped>
.thirteen-invitations-wrapper {
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
  gap: 1rem !important;
}

:deep(.VPDocAside) {
  display: none !important;
}

:deep(.VPDoc h1) {
  display: none;
}
</style> 