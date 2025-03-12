<template>
  <div class="running-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 
                   bg-clip-text text-transparent">
          100天5km跑步挑战
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400"> 每一步都是对自己的突破</p>
      </div>

      <!-- 进度概览 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg mb-6">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 进度条 -->
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">挑战进度</span>
              <span class="text-sm font-medium text-blue-500">{{ completedDays }}/100天</span>
            </div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
                   :style="{ width: `${(completedDays / 100) * 100}%` }" />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              距离目标还差 {{ 100 - completedDays }} 天
            </p>
          </div>

          <!-- 统计卡片 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div class="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 
                        border border-blue-500/20 dark:border-blue-500/30">
              <div class="text-lg font-bold text-blue-500">{{ totalDistance }}km</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">总里程</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 
                        border border-green-500/20 dark:border-green-500/30">
              <div class="text-lg font-bold text-green-500">{{ completedDays }}天</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">已完成</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                        border border-purple-500/20 dark:border-purple-500/30">
              <div class="text-lg font-bold text-purple-500">{{ currentStreak }}天</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">当前连续</div>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                        border border-orange-500/20 dark:border-orange-500/30">
              <div class="text-lg font-bold text-orange-500">{{ averagePace }}'</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">平均配速</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 打卡日历网格 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg mb-6">
        <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <div class="i-carbon-calendar text-purple-500" />
          100天打卡记录
        </h3>
        
        <div class="grid grid-cols-10 gap-2">
          <div v-for="day in 100" 
               :key="day"
               @click="showDayDetail(day)"
               :class="[
                 'aspect-square rounded-lg cursor-pointer transition-all duration-300',
                 'flex items-center justify-center text-sm font-medium',
                 getDayStatus(day).completed ? 
                   'bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg hover:scale-105' :
                   'bg-gray-100 dark:bg-[#161B22] hover:bg-gray-200 dark:hover:bg-[#1C2128]'
               ]">
            {{ day }}
          </div>
        </div>
      </div>

      <!-- 最近记录 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
        <h3 class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <div class="i-carbon-time text-blue-500" />
          最近记录
        </h3>
        <div class="space-y-4">
          <div v-for="record in recentRecords" 
               :key="record.date"
               class="flex items-center gap-4 p-4 rounded-lg 
                      bg-gray-50 dark:bg-[#161B22] 
                      hover:bg-gray-100 dark:hover:bg-[#1C2128]
                      border border-gray-200/50 dark:border-[#30363D]
                      transition-all duration-300">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 
                        flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-500">{{ record.day }}</span>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <h4 class="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {{ record.date }}
                </h4>
                <span class="text-sm text-gray-500">{{ record.time }}</span>
              </div>
              <div class="mt-2 flex gap-4">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.distance }}km
                </span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.pace }}/km
                </span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.duration }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 打卡详情弹窗 -->
      <div v-if="showModal" 
           class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto"
           @click="showModal = false">
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl"
             @click.stop>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
              第 {{ selectedDay }} 天
            </h3>
            <button @click="showModal = false" 
                    class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <div class="i-carbon-close text-xl" />
            </button>
          </div>

          <div v-if="getDayStatus(selectedDay).completed">
            <img :src="getDayStatus(selectedDay).image" 
                 :alt="`Day ${selectedDay}`"
                 class="w-full rounded-lg mb-4 mt-2" />
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">日期</span>
                <span class="text-gray-800 dark:text-gray-200">{{ getDayStatus(selectedDay).date }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">距离</span>
                <span class="text-gray-800 dark:text-gray-200">{{ getDayStatus(selectedDay).distance }}km</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">配速</span>
                <span class="text-gray-800 dark:text-gray-200">{{ getDayStatus(selectedDay).pace }}/km</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">用时</span>
                <span class="text-gray-800 dark:text-gray-200">{{ getDayStatus(selectedDay).duration }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
                {{ getDayStatus(selectedDay).note }}
              </p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            还未完成这天的跑步打卡
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 示例数据
const completedDays = 1
const totalDistance = 5
const currentStreak = 1
const averagePace = "5'30"



// 弹窗控制
const showModal = ref(false)
const selectedDay = ref(1)

// 打卡数据
const runningData = {
  1: {
    completed: true,
    date: '2025-03-10',
    distance: '5.0',
    pace: "9'12",
    duration: '47:49',
    image: 'https://i0.hdslb.com/bfs/article/623a0ceca6c1a0f497b92447bc09199716643837.jpg',
    note: '恢复跑步的第一天'
  },
 
  // 可以继续添加更多天的数据
}

// 获取某天的状态
function getDayStatus(day: number) {
  return runningData[day] || { completed: false }
}

// 显示某天的详情
function showDayDetail(day: number) {
  selectedDay.value = day
  showModal.value = true
}
</script>

<style scoped>
.running-wrapper {
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

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.stats-item {
  @apply flex flex-col items-center p-2 rounded-lg bg-white dark:bg-[#1a1a1a] 
         shadow hover:shadow-md transition-all duration-300
         hover:transform hover:-translate-y-0.5;
  min-width: 80px;
}

.title-section {
  padding: 1rem 0;
}

.running-wrapper > * {
  margin-bottom: 1rem;
}

.stats-item:hover span:first-child {
  @apply scale-110 transition-transform duration-300;
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
</style> 
