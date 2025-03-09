<template>
  <div class="zlibrary-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 顶部横幅 -->
      <div class="mb-12 bg-blue-600 dark:bg-blue-800 rounded-xl p-8 text-white">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Z-Library
          </h1>
          <p class="text-xl opacity-90">
            世界上最大的数字图书馆
          </p>
        </div>
      </div>

      <!-- 统计数据卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="i-carbon-book text-4xl text-blue-600 dark:text-blue-400" />
            <div>
              <div class="text-2xl font-bold">12M+</div>
              <div class="text-gray-600 dark:text-gray-400">电子书藏量</div>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="i-carbon-document text-4xl text-blue-600 dark:text-blue-400" />
            <div>
              <div class="text-2xl font-bold">84M+</div>
              <div class="text-gray-600 dark:text-gray-400">文章数量</div>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="i-carbon-user-multiple text-4xl text-blue-600 dark:text-blue-400" />
            <div>
              <div class="text-2xl font-bold">1M+</div>
              <div class="text-gray-600 dark:text-gray-400">活跃用户</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 主要功能 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg mb-12">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div class="i-carbon-function" />
          主要功能
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex gap-4">
            <div class="i-carbon-search text-3xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="text-xl font-medium mb-2">高级搜索</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持标题、作者、ISBN、出版商等多维度搜索，精准定位所需资源
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="i-carbon-download text-3xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="text-xl font-medium mb-2">多格式下载</h3>
              <p class="text-gray-600 dark:text-gray-400">
                支持 PDF、EPUB、MOBI 等多种格式，适配各类阅读设备
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="i-carbon-cloud-upload text-3xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="text-xl font-medium mb-2">资源上传</h3>
              <p class="text-gray-600 dark:text-gray-400">
                用户可以上传分享电子书，贡献优质资源
              </p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="i-carbon-bookmark text-3xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="text-xl font-medium mb-2">个人书架</h3>
              <p class="text-gray-600 dark:text-gray-400">
                收藏喜爱的书籍，创建阅读清单，同步多设备
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 使用指南 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg mb-12">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div class="i-carbon-guide" />
          使用指南
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">01</div>
            <h3 class="text-xl font-medium mb-2">注册账号</h3>
            <p class="text-gray-600 dark:text-gray-400">
              创建个人账号，获得每日下载配额和个性化功能
            </p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">02</div>
            <h3 class="text-xl font-medium mb-2">搜索资源</h3>
            <p class="text-gray-600 dark:text-gray-400">
              使用搜索功能找到需要的书籍或文章
            </p>
          </div>
          <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">03</div>
            <h3 class="text-xl font-medium mb-2">下载阅读</h3>
            <p class="text-gray-600 dark:text-gray-400">
              选择合适的格式下载，开始阅读学习
            </p>
          </div>
        </div>
      </div>

      <!-- 访问方式 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div class="i-carbon-connection" />
          访问方式
        </h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="i-carbon-earth text-2xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="font-medium">官方域名</h3>
              <p class="text-gray-600 dark:text-gray-400">z-lib.org（需要科学上网）</p>
            </div>
          </div>
          <div class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="i-carbon-tor text-2xl text-blue-600 dark:text-blue-400" />
            <div>
              <h3 class="font-medium">Tor 访问</h3>
              <p class="text-gray-600 dark:text-gray-400">zlibrary24tuxziyiyfr7zd46ytefdqbqd2axkmxm4o5374ptpc52fad.onion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zlibrary-wrapper {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
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

:deep(.VPDoc .content) {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc h1) {
  display: none;
}
</style> 
