<template>
    <div class="p-4 my-4 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300">
      <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-2">
          <div class="i-carbon-workflow text-2xl text-blue-500" />
          <h3 class="text-lg font-medium m-0">{{ title }}</h3>
        </div>
        <div :class="[
          'flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
          status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' :
          status === 'running' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' :
          'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
        ]">
          <div :class="statusIcon" />
          {{ status }}
        </div>
      </div>
      
      <div class="space-y-4">
        <div v-for="(step, index) in steps" 
             :key="index" 
             class="group flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
             :class="{ 'border-l-4 border-green-500': step.completed }">
          <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
            {{ index + 1 }}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center mb-2">
              <h4 class="text-base font-medium m-0 truncate">{{ step.name }}</h4>
              <span v-if="step.time" class="text-sm text-gray-500 dark:text-gray-400 ml-2">{{ step.time }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 m-0 line-clamp-2">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface Step {
    name: string
    description: string
    completed: boolean
    time?: string
  }
  
  interface Props {
    title: string
    status: 'success' | 'running' | 'failed'
    steps: Step[]
  }
  
  const props = defineProps<Props>()
  
  const statusIcon = computed(() => {
    const icons = {
      success: 'i-carbon-checkmark-filled text-green-500',
      running: 'i-carbon-play-filled text-blue-500',
      failed: 'i-carbon-close-filled text-red-500'
    }
    return icons[props.status]
  })
  </script>
  
  <!-- 移除所有 style 标签内容，完全使用 UnoCSS 类名 -->