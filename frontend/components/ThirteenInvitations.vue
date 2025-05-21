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
              :src="episode.cover || defaultCover"
              :alt="episode.title"
              class="w-[154px] h-[209px] object-cover mx-auto mt-4"
              @error="handleImageError"
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
      cover: 'https://i0.hdslb.com/bfs/openplatform/8b359e8e9db3fdb39091132ca80f6fbbb1255a8e.png',
      watched: true,
    },
    {
      id: '1-2', 
      title: '许知远对话姚晨',
      guest: '姚晨',
      cover: 'https://i0.hdslb.com/bfs/openplatform/1fa96377efae154a861b90beacdffb6578bb81b9.png',
      watched: true
    },
    {
      id: '1-3',
      title: '许知远对话二次元',
      guest: '二次元',
      cover: 'https://i0.hdslb.com/bfs/archive/4c5c0d19bf3deb0b4df4925d1c9008d2a2d4fb37.jpg', 
      watched: false
    },
    {
      id: '1-4',
      title: '许知远对话冯小刚',
      guest: '冯小刚',
      cover: 'https://i0.hdslb.com/bfs/openplatform/1c28c95068c8fa4a1240d6ab6382cca91b6badd1.png',
      watched: true
    },
    {
      id: '1-5',
      title: ' 许知远对话叶准 ',
      guest: '叶准',
      cover: 'https://i0.hdslb.com/bfs/openplatform/67a397b83b8bbe9ce85a56760fdc191ecc9d2f0c.png',
      watched: true
    },
    {
      id: '1-6',
      title: '许知远对话李安',
      guest: '李安',
      cover: 'https://i0.hdslb.com/bfs/openplatform/002b16de14bf474750faa442b16983b2d3e0e706.png',
      watched: true 
    },
    {
      id: '1-7',
      title: '许知远对话张楚',
      guest: '张楚',
      cover: 'https://i0.hdslb.com/bfs/openplatform/6033de28306130ae0f1a664249c1ed4645a42fc0.png',
      watched: true
    },
    {
    id: '1-8',
    title: ' 许知远对话蔡澜 ',
    guest: '蔡澜',
    cover: 'https://i0.hdslb.com/bfs/openplatform/93181ca34dccab68015da8feeb51ef417e8e4894.png',
    watched: true
  },
  {
    id: '1-9',
    title: ' 许知远对话俞飞鸿 ',
    guest: '俞飞鸿',
    cover: 'https://i0.hdslb.com/bfs/openplatform/30bfe15029da88eb19230471f15b181492be5f46.png',
    watched: true
  },
  {
    id: '1-10',
    title: '许知远对话陈嘉映',
    guest: '陈嘉映',
    cover: 'https://i0.hdslb.com/bfs/openplatform/b5d7ade8bff82e8aac8807688d55ff75595adb7e.png',
    watched: true
  },
  {
    id: '1-11',
    title: '许知远对话贾樟柯',
    guest: '贾樟柯',
    cover: 'https://i0.hdslb.com/bfs/openplatform/6cb598a5b45b208514587687797c1894309f5f85.png',
    watched: true
  },
  {
    id: '1-12',
    title: '许知远对话上海彩虹室内合唱团',
    guest: '合唱团',
    cover: '',
    watched: false
  },
  {
    id: '1-13',
    title: '许知远对话白先勇',
    guest: '白先勇',
    cover: 'https://i0.hdslb.com/bfs/openplatform/08db0c7d96c99c80b860b4aa30eab1e35abc82c4.png',
    watched: true
  },
 
  ],
  2: [
  {
    id: '2-1',
    title: '许知远对话马东',
    guest: '马东',
    cover: 'https://i0.hdslb.com/bfs/openplatform/e45f02accc978f52c23de197ad8a93b97f25e08e.png',
    watched: true
  },
  {
    id: '2-4',
    title: '许知远对话张艾嘉',
    guest: '张艾嘉',
    cover: 'https://i0.hdslb.com/bfs/openplatform/b4b1e9b849d937c37a3ec2def304555332b88968.png',
    watched: true
  },
  {
    id: '2-5',
    title: '许知远对话西川',
    guest: '西川',
    cover: 'https://i0.hdslb.com/bfs/openplatform/2218102a45794545891d605ecdbc2c2efea50133.png',
    watched: true
  },
  {
    id: '2-6',
    title: '许知远对话汪健',
    guest: '汪健',
    cover: 'https://i0.hdslb.com/bfs/openplatform/97c84bb4148435f0c44a9c02080d8d703dec8cac.png',
    watched: true
  },
  ]
  
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

// 默认封面图
const defaultCover = 'https://i0.hdslb.com/bfs/archive/4c5c0d19bf3deb0b4df4925d1c9008d2a2d4fb37.jpg'

// 处理图片加载错误
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = defaultCover
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
