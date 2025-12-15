<template>
  <div class="gemini-wrapper">
    <div class="max-w-[1200px] mx-auto px-4 py-12">
      <!-- 页面标题 -->
      <div class="mb-16 text-center">
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570]">
            Gemini Pro
          </span>
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400">Experience the best of Google AI</p>
      </div>

      <!-- 卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Gemini Pro Card -->
        <a href="https://gemini.google.com/" target="_blank" class="block group">
          <div class="h-full bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative">
            
            <!-- Badge -->
            <div class="absolute top-4 right-4 z-10">
              <span class="bg-[#1A73E8] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                New
              </span>
            </div>

            <!-- Image/Gradient Area -->
            <div class="h-48 relative overflow-hidden bg-[#000]">
                 <!-- 模拟 Gemini 的星光渐变背景 -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#4285f4] via-[#9b72cb] to-[#d96570] opacity-20"></div>
                
                <div class="absolute inset-0 flex items-center justify-center">
                    <!-- Gemini Logo 模拟 -->
                    <div class="text-6xl i-carbon-idea text-white opacity-90 drop-shadow-lg animate-pulse"></div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="p-8 flex flex-col h-[calc(100%-12rem)]">
              <div class="mb-2">
                <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Available Now</span>
              </div>
              
              <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                Gemini with the best of Google AI
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                Access to Google's most capable AI models.
              </p>

              <div class="mt-auto">
                <span class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 transition-colors">
                  View details
                </span>
              </div>
            </div>
          </div>
        </a>

        <!-- NotebookLM Card -->
        <a href="https://notebooklm.google/" target="_blank" class="block group">
          <div class="h-full bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative">
            
            <!-- Badge -->
            <div class="absolute top-4 right-4 z-10">
              <span class="bg-[#34A853] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                New
              </span>
            </div>

            <!-- Image/Gradient Area -->
            <div class="h-48 relative overflow-hidden bg-[#000]">
                 <!-- 模拟 NotebookLM 的渐变背景 -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#81D4FA] via-[#A5D6A7] to-[#E6EE9C] opacity-30"></div>
                
                <div class="absolute inset-0 flex items-center justify-center">
                    <!-- Notebook Logo 模拟 -->
                    <div class="text-6xl i-carbon-notebook text-white opacity-90 drop-shadow-lg animate-pulse"></div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="p-8 flex flex-col h-[calc(100%-12rem)]">
              <div class="mb-2">
                <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">Available Now</span>
              </div>
              
              <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                NotebookLM
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                An experimental AI-first notebook, grounded in your own trusted sources.
              </p>

              <div class="mt-auto">
                <span class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 transition-colors">
                  View details
                </span>
              </div>
            </div>
          </div>
        </a>
        <!-- Google AI Studio Card -->
        <a href="https://aistudio.google.com/apps" target="_blank" class="block group">
          <div class="h-full bg-white dark:bg-[#1e1e1e] rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative">
            
            <!-- Badge -->
            <div class="absolute top-4 right-4 z-10">
              <span class="bg-[#9333EA] text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Build
              </span>
            </div>

            <!-- Image/Gradient Area -->
            <div class="h-48 relative overflow-hidden bg-[#000]">
                 <!-- AI Studio Gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#D946EF] opacity-30"></div>
                
                <div class="absolute inset-0 flex items-center justify-center">
                    <!-- Icon -->
                    <div class="text-6xl i-carbon-code text-white opacity-90 drop-shadow-lg animate-pulse"></div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="p-8 flex flex-col h-[calc(100%-12rem)]">
              <div class="mb-2">
                <span class="text-xs font-semibold tracking-wider text-gray-500 uppercase">For Developers</span>
              </div>
              
              <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3">
                Google AI Studio
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 mb-8 flex-grow">
                Build generative AI applications quickly with Gemini models.
              </p>

              <div class="mt-auto">
                <span class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 transition-colors">
                  View details
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 覆盖默认的 VitePress 样式以实现自定义布局 */
.gemini-wrapper {
  width: 100%;
  min-height: 80vh;
}

:deep(.VPDoc) {
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.VPDoc .container) {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPContent) {
  padding: 0 !important;
}
</style>
