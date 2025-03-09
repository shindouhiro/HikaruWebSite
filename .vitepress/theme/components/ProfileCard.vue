<template>
  <div class="max-w-1200px mx-auto p-6 md:p-8">
    <div class="flex gap-8 md:gap-12 mb-8 flex-col md:flex-row">
      <!-- 左侧头像部分 -->
      <div class="flex-shrink-0 flex items-center justify-center md:justify-start">
        <div class="w-28 md:w-32 h-28 md:h-32 rounded-full overflow-hidden 
                    bg-gradient-to-r from-[#4D9FFF] to-[#3671E9] p-1 
                    dark:from-[#4D9FFF] dark:to-[#3671E9] 
                    hover:shadow-[0_0_30px_rgba(77,159,255,0.3)]
                    transition-all duration-500">
          <div class="w-full h-full rounded-full bg-white dark:bg-[#0D1117] 
                      flex items-center justify-center
                      shadow-inner">
            <span class="text-4xl transform hover:scale-110 transition-transform duration-300">⭐</span>
          </div>
        </div>
      </div>

      <!-- 右侧信息部分 -->
      <div class="flex-grow text-center md:text-left">
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4D9FFF] to-[#3671E9] 
                   bg-clip-text text-transparent m-0 mb-3">
          Hikaru
        </h1>
     
        
        <div class="flex flex-col gap-3 md:gap-4">
          <div class="info-item bg-gray-50/80 dark:bg-[#161B22] 
                      hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                      border border-gray-200/50 dark:border-[#30363D] 
                      rounded-xl p-4 
                      hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                      transition-all duration-300">
            <div class="text-2xl transform group-hover:scale-110 transition-transform duration-300">🔮</div>
            <span class="text-gray-700 dark:text-[#8B949E]">代码与峡谷的双重Buff加持者</span>
          </div>
          <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                      border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
            <div class="text-2xl">💫</div>
            <span class="text-gray-700 dark:text-[#8B949E]">Neovim 终端爱好者</span>
          </div>
          <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                      border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
            <div class="text-2xl">⚡</div>
            <span class="text-gray-700 dark:text-[#8B949E]">户外徒步的程序猿酋长</span>
          </div>
          <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                      border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
            <div class="text-2xl">🌐</div>
            <span class="text-gray-700 dark:text-[#8B949E]">挖掘中...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 社交链接部分 -->
    <div class="w-full mt-6 md:mt-8">
      <div class="grid grid-cols-4 md:grid-cols-8 gap-2 max-w-4xl mx-auto px-2">
        <a v-for="(item, index) in socialLinks" 
           :key="index" 
           :href="item.url"
           class="flex flex-col items-center justify-center p-3 md:p-4
                  bg-gray-50/90 dark:bg-[#161B22] 
                  hover:bg-white dark:hover:bg-[#1C2128]
                  border border-gray-200/50 dark:border-[#30363D]
                  hover:border-[#4D9FFF]/30 dark:hover:border-[#4D9FFF]/30
                  rounded-2xl
                  shadow-sm hover:shadow-lg dark:shadow-none
                  dark:hover:shadow-[0_8px_30px_rgba(77,159,255,0.15)]
                  transform hover:-translate-y-1
                  group
                  transition-all duration-300 ease-out">
          <div :class="[item.icon, 
                       'text-2xl md:text-3xl text-gray-700 dark:text-[#8B949E] mb-1 md:mb-2',
                       'group-hover:text-[#4D9FFF] dark:group-hover:text-[#4D9FFF]',
                       'transform group-hover:scale-110 transition-transform duration-300']">
          </div>
          <span class="text-xs md:text-sm text-gray-600 dark:text-[#8B949E] 
                       group-hover:text-[#4D9FFF] dark:group-hover:text-[#4D9FFF]
                       text-center">
            {{ item.name }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const socialLinks = [
//   { name: 'DeepSeek', icon: 'i-carbon-box', url: '#' },
//   { name: 'Youtube', icon: 'i-carbon-logo-youtube', url: '#' },
//   { name: 'Bilibili', icon: 'i-carbon-video', url: '#' },
//   { name: 'X', icon: 'i-carbon-logo-twitter', url: '#' },
//   { name: 'WeChat', icon: 'i-custom:wechat', url: '#' },
//   { name: '公众号', icon: 'i-carbon-notification', url: '#' },
//   { name: '即刻', icon: 'i-carbon-mobile', url: '#' },
//   { name: '小红书', icon: 'i-carbon-phone', url: '#' },
// ]
</script>

<style>
.info-item {
  @apply flex items-center gap-4 justify-center md:justify-start group;
}

@media (max-width: 768px) {
  .profile-section {
    @apply flex-col items-center text-center;
  }
}
</style>
