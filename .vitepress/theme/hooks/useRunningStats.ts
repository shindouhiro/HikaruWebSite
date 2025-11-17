import { computed } from 'vue'
import type { RunningRecord, RunningData } from '../types'
import { parsePaceToSeconds, formatSecondsToPace, diffInDays } from '../utils'

export function useRunningStats(runningData: RunningData) {
  // 获取所有记录
  const allRecords = computed(() => {
    return Object.entries(runningData).map(([day, data]) => ({
      day: parseInt(day),
      ...data,
    }))
  })

  // 获取已完成的记录
  const completedRecords = computed(() => {
    return allRecords.value
      .filter((record) => record.completed)
      .sort((a, b) => a.day - b.day)
  })

  // 统计信息
  const completedDays = computed(() => completedRecords.value.length)

  const totalDistance = computed(() => {
    return completedRecords.value
      .reduce((total, record) => {
        return total + (parseFloat(record.distance) || 0)
      }, 0)
      .toFixed(1)
  })

  const averagePace = computed(() => {
    const validPaces = completedRecords.value.filter((r) => r.pace)
    if (validPaces.length === 0) return "0'00\""
    const totalSeconds = validPaces.reduce((total, record) => {
      return total + parsePaceToSeconds(record.pace)
    }, 0)
    return formatSecondsToPace(totalSeconds / validPaces.length)
  })

  const currentStreak = computed(() => {
    if (completedRecords.value.length === 0) return 0

    const sortedByDate = [...completedRecords.value].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )

    if (sortedByDate.length <= 1) return sortedByDate.length

    let streak = 1
    for (let i = 0; i < sortedByDate.length - 1; i++) {
      const currentRunDate = new Date(sortedByDate[i].date)
      const previousRunDate = new Date(sortedByDate[i + 1].date)
      if (diffInDays(previousRunDate, currentRunDate) === 1) {
        streak++
      } else {
        break
      }
    }
    return streak
  })

  const recentRecords = computed(() => {
    return completedRecords.value
      .slice(-5)
      .sort((a, b) => b.day - a.day)
      .map((record: RunningRecord) => ({
        ...record,
        duration: record.duration || "N/A",
      }))
  })

  return {
    allRecords,
    completedRecords,
    completedDays,
    totalDistance,
    averagePace,
    currentStreak,
    recentRecords
  }
} 
