<template>
    <div class="relative inline-block">
      <!-- 分享按钮 -->
      <button
        @click="handleShare"
        class="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300"
      >
        <div class="i-carbon-logo-wechat text-xl" />
        分享到微信
      </button>
  
      <!-- 二维码弹出层 -->
      <div
        v-if="showQRCode"
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-4 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <!-- 分享标题 -->
        <h3 class="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">{{ title }}</h3>
        <!-- 分享描述 -->
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">{{ text }}</p>
        <!-- 二维码容器 -->
        <div ref="qrCodeRef" class="w-32 h-32 bg-white"></div>
        <!-- 提示文本 -->
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center whitespace-nowrap">
          使用微信扫码分享
        </p>
        <!-- 三角形指示器 -->
        <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-dark-800 border-r border-b border-gray-200 dark:border-gray-700"></div>
      </div>
  
      <!-- 复制成功提示 -->
      <div
        v-if="showCopyTip"
        class="fixed top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-300"
        :class="{ 'opacity-0': !showCopyTip }"
      >
        链接已复制到剪贴板
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, onUnmounted } from 'vue'
  import QRCode from 'qrcode'
  
  const props = defineProps<{
    title?: string
    text?: string
    url?: string
  }>()
  
  const showQRCode = ref(false)
  const showCopyTip = ref(false)
  const qrCodeRef = ref<HTMLElement | null>(null)
  
  // 处理分享逻辑
  const handleShare = async () => {
    const shareData = {
      title: props.title || document.title,
      text: props.text || '',
      url: props.url || window.location.href
    }
  
    // 如果支持原生分享API
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error('分享失败:', err)
        toggleQRCode()
      }
    } else {
      // 如果不支持，显示二维码
      toggleQRCode()
    }
  }
  
  const toggleQRCode = () => {
    showQRCode.value = !showQRCode.value
  }
  
  // 复制链接到剪贴板
  const copyToClipboard = async () => {
    const url = props.url || window.location.href
    try {
      await navigator.clipboard.writeText(url)
      showCopyTip.value = true
      setTimeout(() => {
        showCopyTip.value = false
      }, 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }
  
  // 生成二维码
  const generateQRCode = async () => {
    if (!qrCodeRef.value) return
    
    const shareUrl = props.url || window.location.href
    
    try {
      await QRCode.toCanvas(qrCodeRef.value, shareUrl, {
        width: 128,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
    } catch (err) {
      console.error('生成二维码失败:', err)
    }
  }
  
  // 监听显示状态变化
  watch(showQRCode, (newVal) => {
    if (newVal) {
      generateQRCode()
    }
  })
  
  // 点击外部关闭
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (showQRCode.value && !target.closest('.relative')) {
      showQRCode.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script> 