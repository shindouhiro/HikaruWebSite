<template>
  <div class="calendar-wrapper p-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
        {{ currentYear }}年{{ currentMonth + 1 }}月
      </h3>
      <div class="flex gap-2">
        <button @click="previousMonth" 
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div class="i-carbon-chevron-left text-xl"/>
        </button>
        <button @click="nextMonth"
                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div class="i-carbon-chevron-right text-xl"/>
        </button>
      </div>
    </div>

    <!-- 星期标题 -->
    <div class="grid grid-cols-7 gap-2 mb-4">
      <div v-for="day in weekDays" 
           class="text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
        {{ day }}
      </div>
    </div>

    <!-- 日历格子 -->
    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in calendarDays" 
           :key="index"
           class="aspect-square">
        <button v-if="day !== 0"
                @click="toggleCheckIn(day)"
                :class="[
                  'w-full h-full rounded-lg text-sm font-medium',
                  'flex items-center justify-center',
                  'transition-all duration-300',
                  isCheckedIn(day) 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800',
                  isToday(day) && !isCheckedIn(day)
                    ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#1a1a1a]'
                    : ''
                ]">
          {{ day }}
        </button>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="mt-6 flex justify-between items-center px-2">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        本月已打卡: {{ checkedDays.size }} 天
      </div>
      <div class="text-sm text-gray-600 dark:text-gray-400">
        连续打卡: {{ consecutiveDays }} 天
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const currentMonth = ref(currentDate.getMonth())
const checkedDays = ref(new Set<string>())

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

// 计算日历天数
const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  
  // 填充月初空白
  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(0)
  }
  
  // 填充日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i)
  }
  
  return days
})

// 检查是否是今天
const isToday = (day: number) => {
  const today = new Date()
  return currentYear.value === today.getFullYear() &&
         currentMonth.value === today.getMonth() &&
         day === today.getDate()
}

// 切换打卡状态
const toggleCheckIn = (day: number) => {
  const dateStr = `${currentYear.value}-${currentMonth.value + 1}-${day}`
  if (checkedDays.value.has(dateStr)) {
    checkedDays.value.delete(dateStr)
  } else {
    checkedDays.value.add(dateStr)
  }
  // 这里可以添加与后端的交互逻辑
}

// 检查日期是否已打卡
const isCheckedIn = (day: number) => {
  return checkedDays.value.has(`${currentYear.value}-${currentMonth.value + 1}-${day}`)
}

// 切换月份
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value--
    currentMonth.value = 11
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value++
    currentMonth.value = 0
  } else {
    currentMonth.value++
  }
}

// 计算连续打卡天数
const consecutiveDays = computed(() => {
  let count = 0
  const today = new Date()
  let currentDate = new Date()

  while (true) {
    const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
    if (!checkedDays.value.has(dateStr)) break
    count++
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return count
})
</script> 
