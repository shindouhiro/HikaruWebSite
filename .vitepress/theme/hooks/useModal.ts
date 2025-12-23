import { ref, computed } from 'vue'
import type { RunningData } from '../types'

export function useModal(runningData: RunningData) {
  const showModal = ref(false)
  const selectedDay = ref(1)

  // 获取有记录的天数列表
  const recordedDays = computed(() => {
    return Object.keys(runningData)
      .map(Number)
      .sort((a, b) => a - b)
  })

  // 获取某天的状态
  const getDayStatus = (day: number) => {
    return runningData[day] || { completed: false }
  }

  // 显示某天的详情
  const showDayDetail = (day: number) => {
    selectedDay.value = day
    showModal.value = true
  }

  // 获取前一天的详情
  const previousDay = () => {
    const currentIndex = recordedDays.value.indexOf(selectedDay.value)
    if (currentIndex > 0) {
      selectedDay.value = recordedDays.value[currentIndex - 1]
    } else if (selectedDay.value > 1) {
      selectedDay.value = selectedDay.value - 1
    }
  }

  // 获取后一天的详情
  const nextDay = () => {
    const currentIndex = recordedDays.value.indexOf(selectedDay.value)
    if (currentIndex < recordedDays.value.length - 1) {
      selectedDay.value = recordedDays.value[currentIndex + 1]
    } else if (selectedDay.value < 100) {
      selectedDay.value = selectedDay.value + 1
    }
  }

  // 计算是否有前一天和后一天
  const hasPreviousDay = computed(() => {
    const currentIndex = recordedDays.value.indexOf(selectedDay.value)
    return currentIndex > 0 || selectedDay.value > 1
  })

  const hasNextDay = computed(() => {
    const currentIndex = recordedDays.value.indexOf(selectedDay.value)
    return currentIndex < recordedDays.value.length - 1 || selectedDay.value < 100
  })

  // 关闭弹窗
  const closeModal = () => {
    showModal.value = false
  }

  return {
    showModal,
    selectedDay,
    recordedDays,
    getDayStatus,
    showDayDetail,
    previousDay,
    nextDay,
    hasPreviousDay,
    hasNextDay,
    closeModal
  }
} 
