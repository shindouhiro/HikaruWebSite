<template>
  <div class="bookshelf-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 
                   bg-clip-text text-transparent">
          阅读记录
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">2025记录每一次阅读的收获</p>
      </div>

      <!-- 原有的网格布局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 正在阅读 -->
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div class="i-carbon-book text-blue-500" />
            正在阅读
          </h3>
          <div class="space-y-4">
            <div v-for="book in currentReading" 
                 :key="book.id"
                 class="flex items-start gap-4 p-4 rounded-lg 
                        bg-gray-50 dark:bg-[#161B22] 
                        hover:bg-gray-100 dark:hover:bg-[#1C2128]
                        border border-gray-200/50 dark:border-[#30363D]
                        transition-all duration-300">
              <img :src="book.cover" :alt="book.title" 
                   class="w-20 h-28 object-cover rounded-lg shadow-md" />
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200">{{ book.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ book.author }}</p>
                <div class="mt-2 flex items-center gap-2">
                  <div class="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full transition-all duration-300"
                         :style="{ width: `${book.progress}%` }" />
                  </div>
                  <span class="text-sm text-gray-600 dark:text-gray-400">{{ book.progress }}%</span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  最近阅读: {{ book.lastRead }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 已读完成 -->
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div class="i-carbon-checkmark-outline text-green-500" />
            已读完成
          </h3>
          <div class="space-y-4">
            <div v-for="book in completedBooks" 
                 :key="book.id"
                 class="flex items-start gap-4 p-4 rounded-lg 
                        bg-gray-50 dark:bg-[#161B22] 
                        hover:bg-gray-100 dark:hover:bg-[#1C2128]
                        border border-gray-200/50 dark:border-[#30363D]
                        transition-all duration-300">
              <img :src="book.cover" :alt="book.title" 
                   class="w-20 h-28 object-cover rounded-lg shadow-md" />
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200">{{ book.title }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ book.author }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span v-for="tag in book.tags" 
                        :key="tag"
                        class="px-2 py-1 text-xs rounded-full
                              bg-blue-100 dark:bg-blue-900/30
                              text-blue-600 dark:text-blue-400">
                    {{ tag }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  完成时间: {{ book.completedDate }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 阅读统计 -->
        <div class="md:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <div class="i-carbon-chart-line text-purple-500" />
            阅读统计
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 rounded-lg bg-gray-50 dark:bg-[#161B22] text-center">
              <div class="text-2xl font-bold text-blue-500">{{ stats.totalBooks }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">总阅读书籍</div>
            </div>
            <div class="p-4 rounded-lg bg-gray-50 dark:bg-[#161B22] text-center">
              <div class="text-2xl font-bold text-green-500">{{ stats.thisYear }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">今年已读</div>
            </div>
            <div class="p-4 rounded-lg bg-gray-50 dark:bg-[#161B22] text-center">
              <div class="text-2xl font-bold text-purple-500">{{ stats.thisMonth }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">本月已读</div>
            </div>
            <div class="p-4 rounded-lg bg-gray-50 dark:bg-[#161B22] text-center">
              <div class="text-2xl font-bold text-orange-500">{{ stats.streak }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">连续阅读天数</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 阅读统计后添加年度目标模块 -->
      <div class="mt-6 bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <div class="i-carbon-target text-orange-500" />
          2025年阅读目标
        </h3>
        
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 进度条 -->
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">年度阅读进度</span>
              <span class="text-sm font-medium text-blue-500">{{ completedBooks.length }}/5本</span>
            </div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
                   :style="{ width: `${(completedBooks.length / 5) * 100}%` }" />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              距离目标还差 {{ 5 - completedBooks.length }} 本
            </p>
          </div>

          <!-- 目标卡片 -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
            <div class="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 
                        border border-blue-500/20 dark:border-blue-500/30">
              <div class="text-lg font-bold text-blue-500">5本</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">年度目标</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 
                        border border-green-500/20 dark:border-green-500/30">
              <div class="text-lg font-bold text-green-500">{{ completedBooks.length }}本</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">已完成</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                        border border-purple-500/20 dark:border-purple-500/30">
              <div class="text-lg font-bold text-purple-500">{{ Math.round((completedBooks.length / 5) * 100) }}%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">完成率</div>
            </div>
          </div>
        </div>

        <!-- 激励语 -->
        <div class="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-teal-500/5 
                    border-l-4 border-blue-500 dark:border-blue-400">
          <p class="text-gray-600 dark:text-gray-400">
            {{ getMotivationalMessage() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 示例数据
const currentReading = [
  {
    id: 1,
    title: '非暴力沟通',
    author: '马歇尔•卢森堡',
    cover: 'https://i0.hdslb.com/bfs/article/0158af0f2e4dbb573ac1258c6d371f7e16643837.jpg',
    progress: 50,
    lastRead: '2025-02-14'
  },
  {
    id: 2,
    title: '史蒂夫·乔布斯传',
    author: '沃尔特·艾萨克森',
    cover: 'https://i0.hdslb.com/bfs/article/27876175591147b27e12f192d88e430c16643837.png',
    progress: 20,
    lastRead: '2025-02-15'
  },
]

const completedBooks = [
  {
    id: 3,
    title: '硅谷钢铁侠：埃隆·马斯克的冒险人生',
    author: '阿什利·万斯',
    cover: 'https://i0.hdslb.com/bfs/article/3f36b075efb08d0beba5dfc012b5711116643837.jpg',
    tags: ['传记', '商业'],
    completedDate: '2025-2-13'
  },
]

// 更新统计数据
const stats = {
  totalBooks: completedBooks.length + currentReading.length, // 总书籍数
  thisYear: completedBooks.length,  // 今年已读完成
  thisMonth: completedBooks.length, // 本月已读完成
  streak: 'n'  // 连续阅读天数
}

// 添加激励语函数
function getMotivationalMessage() {
  const remaining = 5 - completedBooks.length;
  if (remaining <= 0) {
    return "🎉 太棒了！你已经完成了今年的阅读目标！继续保持这个势头！";
  } else if (remaining === 5) {
    return "📚 新的一年，新的开始！让我们开启这段阅读之旅吧！";
  } else {
    return `📖 已经完成 ${completedBooks.length} 本书的阅读，继续加油！距离目标只差 ${remaining} 本了！`;
  }
}
</script>

<style scoped>
.bookshelf-wrapper {
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

/* 添加渐变动画 */
.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradient 6s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 
