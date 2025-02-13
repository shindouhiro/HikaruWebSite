<template>
  <div class="max-w-1200px mx-auto p-8 md:p-4">
    <div class="flex gap-12 mb-8 flex-col md:flex-row">
      <!-- 左侧头像部分 -->
      <div class="flex-shrink-0 flex items-center justify-center md:justify-start">
        <div class="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 p-1">
          <div class="w-full h-full rounded-full bg-[var(--vp-c-bg)] flex items-center justify-center">
            <span class="text-4xl">🌟</span>
          </div>
        </div>
      </div>

      <!-- 右侧信息部分 -->
      <div class="flex-grow text-center md:text-left">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent m-0 mb-2">
          Hikaru
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 m-0 mb-8">AI Native Coder</p>
        
        <div class="flex flex-col gap-4">
          <div class="info-item hover:bg-[var(--vp-c-bg)] p-4 rounded-lg transition-all duration-300">
            <div class="text-2xl">🏪</div>
            <span class="text-gray-700 dark:text-gray-300"></span>
          </div>
          <div class="info-item hover:bg-[var(--vp-c-bg)] p-4 rounded-lg transition-all duration-300">
            <div class="text-2xl">✨</div>
            <span class="text-gray-700 dark:text-gray-300"></span>
          </div>
          <div class="info-item hover:bg-[var(--vp-c-bg)] p-4 rounded-lg transition-all duration-300">
            <div class="text-2xl">🎯</div>
            <span class="text-gray-700 dark:text-gray-300"></span>
          </div>
          <div class="info-item hover:bg-[var(--vp-c-bg)] p-4 rounded-lg transition-all duration-300">
            <div class="text-2xl">🌐</div>
            <span class="text-gray-700 dark:text-gray-300"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 社交链接部分 -->
    <div class="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
      <a href="#" class="social-link">
        <div class="i-carbon-box text-xl"></div>
        <span class="hidden md:inline">DeepSeek</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-logo-youtube text-xl"></div>
        <span class="hidden md:inline">Youtube</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-video text-xl"></div>
        <span class="hidden md:inline">Bilibili</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-phone text-xl"></div>
        <span class="hidden md:inline">小红书</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-logo-twitter text-xl"></div>
        <span class="hidden md:inline">X</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-chat text-xl"></div>
        <span class="hidden md:inline">WeChat</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-notification text-xl"></div>
        <span class="hidden md:inline">公众号</span>
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-mobile text-xl"></div>
        <span class="hidden md:inline">即刻</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style>
.social-link {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--vp-c-bg)] hover:translate-y-[-2px] transition-all duration-300;
}

.info-item {
  @apply flex items-center gap-4 justify-center md:justify-start;
}

@media (max-width: 768px) {
  .social-link {
    @apply p-3;
  }
}
</style>
