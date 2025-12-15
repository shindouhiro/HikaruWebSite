<template>
    <div 
      class="mb-8 bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      :class="{ 'cursor-pointer': !isLoaded }"
      @click="handleClick"
    >
      <!-- 视频容器 -->
      <div class="aspect-video max-w-4xl mx-auto relative">
        <!-- 加载占位 -->
        <div 
          v-if="!isLoaded" 
          class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800"
        >
          <div class="i-carbon-play-filled text-4xl text-gray-400 dark:text-gray-600 mb-2" />
          <p class="text-sm text-gray-500 dark:text-gray-400">点击加载视频</p>
        </div>
        
        <!-- 视频播放器 -->
        <iframe 
          v-show="isLoaded"
          :src="playerSrc"
          allowfullscreen="true"
          scrolling="no"
          border="0"
          frameborder="no"
          framespacing="0"
          class="w-full h-full"
          @load="onIframeLoad"
        />
      </div>
      
      <!-- 视频标题 -->
      <div v-if="title" class="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
        <h3 class="text-base font-medium text-gray-900 dark:text-gray-100">{{ title }}</h3>
        <p v-if="description" class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  interface Props {
    src?: string         // 完整的B站播放器URL
    bvid?: string        // B站视频ID (e.g. BV1xxxx)
    title?: string      // 视频标题（可选）
    description?: string // 视频描述（可选）
  }
  
  const props = defineProps<Props>()

  const playerSrc = computed(() => {
    if (props.bvid) {
      return `//player.bilibili.com/player.html?bvid=${props.bvid}&page=1&high_quality=1`
    }
    return props.src || ''
  })

  
  const isLoaded = ref(false)
  
  // 处理点击事件
  const handleClick = () => {
    if (!isLoaded.value) {
      isLoaded.value = true
    }
  }
  
  // iframe 加载完成
  const onIframeLoad = () => {
    isLoaded.value = true
  }
  </script> 
