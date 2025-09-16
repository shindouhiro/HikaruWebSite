<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { useData } from 'vitepress'

const { page, isDark } = useData()
const enabled = computed(() => page.value?.frontmatter?.comments !== false)

const CONFIG = {
  // Giscus 配置（来自你提供的数据）
  repo: 'shindouhiro/docs',
  repoId: 'R_kgDOPw1hkA',
  category: 'General',
  categoryId: 'DIC_kwDOPw1hkM4CvgHW',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN'
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

onMounted(() => {
  if (!enabled.value) return
  // 避免重复注入
  const container = document.getElementById('giscus-container')
  if (!container) return
  if (container.querySelector('script.giscus-script')) return

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
})

watch(isDark, (val) => {
  updateGiscusTheme(!!val)
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


