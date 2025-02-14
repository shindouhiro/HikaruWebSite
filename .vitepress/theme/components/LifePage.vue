<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- 左侧打卡日历 -->
      <div>
        <CheckInCalendar />
      </div>
      
      <!-- 右侧统计信息 -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            打卡统计
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">总打卡天数</span>
              <span class="text-2xl font-bold text-green-500">365</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">最长连续天数</span>
              <span class="text-2xl font-bold text-blue-500">30</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">本月完成率</span>
              <span class="text-2xl font-bold text-purple-500">80%</span>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            打卡目标
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="i-carbon-checkmark-outline text-green-500 text-xl" />
              <span class="text-gray-600 dark:text-gray-400">每日阅读30分钟</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="i-carbon-checkmark-outline text-green-500 text-xl" />
              <span class="text-gray-600 dark:text-gray-400">每日写作500字</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="i-carbon-checkmark-outline text-green-500 text-xl" />
              <span class="text-gray-600 dark:text-gray-400">每日运动30分钟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CheckInCalendar from './CheckInCalendar.vue'
</script> 
