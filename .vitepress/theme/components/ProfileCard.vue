<template>
  <div class="max-w-1200px mx-auto p-6 md:p-8">
    <div class="flex flex-col">
      <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#4D9FFF] to-[#3671E9] 
                 bg-clip-text text-transparent m-0 mb-6 text-center">
        2025 Goals
      </h1>
   
      <div class="flex flex-col gap-3 md:gap-4 max-w-2xl mx-auto w-full">
        <div class="info-item bg-gray-50/80 dark:bg-[#161B22] 
                    hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                    border border-gray-200/50 dark:border-[#30363D] 
                    rounded-xl p-4 
                    hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                    transition-all duration-300">
          <div class="text-2xl transform group-hover:scale-110 transition-transform duration-300">📸</div>
          <span class="text-gray-700 dark:text-[#8B949E]">Goal #1: 开启摄影之旅</span>
        </div>
        <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                    border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
          <div class="text-2xl">✈️</div>
          <span class="text-gray-700 dark:text-[#8B949E]">Goal #2: 实现海外旅行</span>
        </div>
        <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                    border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
          <div class="text-2xl">📚</div>
          <span class="text-gray-700 dark:text-[#8B949E]">Goal #3: 阅读五本好书</span>
        </div>
        <div class="info-item bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] 
                    border border-gray-200 dark:border-[#30363D] rounded-lg p-4 transition-all duration-300">
          <div class="text-2xl">🏃‍♂️</div>
          <span class="text-gray-700 dark:text-[#8B949E]">Goal #4: 100天5公里挑战</span>
        </div>
      </div>
    </div>
  </div>
</template>

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
