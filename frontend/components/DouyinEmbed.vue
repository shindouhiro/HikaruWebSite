<template>
  <div class="douyin-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                   bg-clip-text text-transparent animate-fade-in">
          Cursor快速发布一个UI Component到npm
        </h1>
      </div>

      <!-- 内容卡片容器 -->
      <div class="grid gap-8">
        <!-- 封面图卡片 -->
        <div class="card-base hover:scale-102 transition-transform duration-300">
        <img 
          src="https://i0.hdslb.com/bfs/openplatform/89d8570b77db20ee8b7b4c6ecd9d2a9f8c118542.png"
          alt="组件开发封面"
            class="w-full h-auto object-cover rounded-t-2xl"
        />
      </div>

        <!-- B站视频卡片 -->
        <div class="card-base hover:scale-102 transition-transform duration-300">
          <div class="aspect-video">
          <iframe 
            src="//player.bilibili.com/player.html?bvid=BV19EVzzSE5r&page=1&high_quality=1&danmaku=0&autoplay=0"
            allowfullscreen="true"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
              class="w-full h-full rounded-t-2xl"
          ></iframe>
        </div>
          
          <!-- 分享按钮组 -->
          <div class="flex justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl ">
            <button class="share-btn flex justify-center items-center flex-col" @click="shareToWeChat">
              <div class="i-carbon-logo-wechat text-green-500 text-center" />
              分享到朋友圈
            </button>
          </div>
      </div>

        <!-- pnpm 软链测试说明卡片 -->
        <div class="card-base">
        <h2 class="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <div class="i-carbon-code" />
            软链测试说明
        </h2>
        
          <!-- 为什么使用软链测试 -->
          <div class="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">为什么使用软链测试？</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex items-start gap-2">
                <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                <span>实时调试：修改包代码后无需重新发布，项目中即可看到更新</span>
              </li>
              <li class="flex items-start gap-2">
                <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                <span>开发效率：避免反复发布npm包进行测试，节省开发时间</span>
              </li>
              <li class="flex items-start gap-2">
                <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                <span>本地验证：在发布前充分测试包的功能和兼容性</span>
              </li>
              <li class="flex items-start gap-2">
                <div class="i-carbon-checkmark-outline text-green-500 mt-1 flex-shrink-0" />
                <span>依赖调试：方便调试包与项目其他依赖的交互</span>
              </li>
            </ul>
          </div>

          <div class="space-y-6">
            <div v-for="(item, index) in pnpmSteps" :key="index" 
                 class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
              <h3 class="font-medium mb-2 text-gray-700 dark:text-gray-300">{{ item.title }}</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 font-mono whitespace-pre-line">{{ item.command }}</p>
              <p v-if="item.description" class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          </div>
          </div>

          <!-- 使用建议 -->
          <div class="mt-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-4 text-green-600 dark:text-green-400">使用建议</h3>
            <ul class="space-y-3 text-gray-700 dark:text-gray-300">
              <li class="flex items-start gap-2">
                <div class="i-carbon-information text-blue-500 mt-1 flex-shrink-0" />
                <span>开发时使用 <code class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">pnpm link</code> 进行本地测试</span>
              </li>
              <li class="flex items-start gap-2">
                <div class="i-carbon-information text-blue-500 mt-1 flex-shrink-0" />
                <span>确保包的 package.json 中的依赖配置正确</span>
              </li>
              <li class="flex items-start gap-2">
                <div class="i-carbon-information text-blue-500 mt-1 flex-shrink-0" />
                <span>测试完成后记得解除软链，使用正式发布的包</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// 设置文档标题
onMounted(() => {
  document.title = 'Cursor UI Component 开发教程 - npm包发布指南'
})

// pnpm步骤数据
const pnpmSteps = [
  {
    title: '1. 创建软链',
    command: 'pnpm link',
    description: '在组件包目录下执行，将包链接到全局'
  },
  {
    title: '2. 项目中使用软链',
    command: 'cd your-project\npnpm link your-package-name',
    description: '在使用该组件的项目中创建链接，your-package-name 为包名'
  },
  {
    title: '3. 取消软链',
    command: '# 取消项目中的软链\npnpm unlink your-package-name\n\n# 取消全局软链\npnpm unlink --global your-package-name',
    description: '测试完成后记得解除链接，避免影响正式环境'
  },
  {
    title: '4. 查看软链',
    command: '# 查看项目中的软链\npnpm ls\n\n# 查看全局软链\npnpm ls -g',
    description: '检查当前链接状态，方便管理'
  }
]

// 分享功能
const shareToWeChat = () => {
  // 生成要分享的URL
  const shareUrl = window.location.href;
  const shareTitle = 'Cursor UI Component 开发教程';
  const shareDesc = '快速学习如何发布一个UI Component到npm！';

  // 使用原生分享API（如果支持）
  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: shareDesc,
      url: shareUrl,
    });
  } else {
    // 如果不支持，则显示提示
    alert("请长按链接进行分享：" + shareUrl);
  }
};

const shareToWeibo = () => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent('Cursor UI Component 开发教程 - 快速学习如何发布一个UI Component到npm！');
  const weiboShareUrl = `http://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`;
  window.open(weiboShareUrl, "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert('链接已复制到剪贴板！');
  } catch (err) {
    alert('复制失败，请手动复制链接');
  }
};
</script>

<style>
/* 使用 UnoCSS 通用样式 */
.card-base {
  @apply bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg;
}

.share-btn {
  @apply flex items-center gap-2 px-4 py-2 rounded-full 
         bg-white dark:bg-gray-700 shadow hover:shadow-lg
         transition-all duration-300 text-sm;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .share-btn {
    @apply px-2 py-1 text-xs;
  }
}
</style> 