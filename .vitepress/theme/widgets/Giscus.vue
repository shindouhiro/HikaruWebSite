<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useData } from 'vitepress'

const { page, isDark } = useData()
const enabled = computed(() => page.value?.frontmatter?.comments !== false)

// 直接用 script 标签注入 Giscus
const CONFIG = {
  repo: 'shindouhiro/HikaruWebSite',
  repoId: 'R_kgDON4w02Q',
  category: 'Announcements',
  categoryId: 'DIC_kwDON4w02c4CvwSJ', // 按要求更新
  mapping: 'pathname', // 使用路径映射，避免把 localhost 全链接写入讨论
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '1',
  inputPosition: 'top',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy'
}

function updateGiscusTheme(dark: boolean) {
  const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({
    giscus: {
      setConfig: { theme: dark ? 'dark' : 'light' }
    }
  }, 'https://giscus.app')
}

function injectGiscus() {
  if (!enabled.value) return
  const container = document.getElementById('giscus-container')
  if (!container) return
  // 清理旧的 iframe 与脚本，避免路由切换残留
  container.querySelectorAll('iframe.giscus-frame, script.giscus-script').forEach(n => n.remove())

  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.className = 'giscus-script'
  Object.entries(CONFIG).forEach(([k, v]) => script.setAttribute(`data-${k}`, String(v)))
  container.appendChild(script)

  // 等待 iframe 挂载后同步一次主题
  const trySync = () => updateGiscusTheme(!!isDark.value)
  setTimeout(trySync, 800)
}

onMounted(() => {
  injectGiscus()
})

watch(isDark, (val) => {
  updateGiscusTheme(!!val)
})

// 路由切换时重载 giscus，确保 pathname 映射正确
watch(() => page.value?.relativePath, () => {
  injectGiscus()
})
</script>

<template>
  <div v-if="enabled" id="giscus-container" class="mt-8 px-4 sm:px-0">
    <div class="text-sm text-gray-500 mb-2">
      想法与讨论欢迎在下方留言～
    </div>
    <div class="rounded-lg border border-gray-200 dark:border-gray-700 p-2 sm:p-4">
      <!-- giscus 将自动注入到此容器 -->
    </div>
  </div>
  <!-- 移动端适配（UnoCSS 原子类） -->
</template>

<style scoped>
</style>


