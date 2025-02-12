<template>
  <div class="max-w-1200px mx-auto p-8">
    <div class="flex gap-12 mb-8">
      <!-- 左侧头像部分 -->
      <div class="flex-shrink-0">
        <div class="avatar-border">
          <!-- <img src="/avatar.jpg" alt="花生" class="w-full h-full object-cover rounded-16px"> -->
        </div>
      </div>

      <!-- 右侧信息部分 -->
      <div class="flex-grow">
        <h1 class="text-4xl font-bold text-primary m-0 mb-2">花生</h1>
        <p class="text-lg text-gray-600 m-0 mb-8">AI Native Coder | 第一代不会写代码的独立开发者</p>
        
        <div class="flex flex-col gap-4">
          <div class="info-item">
            <div class="info-icon">🏪</div>
            <span>AppStore 付费榜 Top1「小猫补光灯」开发者</span>
          </div>
          <div class="info-item">
            <div class="info-icon">✨</div>
            <span>10万+粉AI博主，B站/YouTube 频道：AI进化论-花生</span>
          </div>
          <div class="info-item">
            <div class="info-icon">🎯</div>
            <span>微软 | LinkedIn AI课程讲师</span>
          </div>
          <div class="info-item">
            <div class="info-icon">🌐</div>
            <span>全球旅居中...66%的数字游民</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mt-8">
      <a href="#" class="social-link">
        <div class="i-carbon-box"></div>
        DeepSeek
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-logo-youtube"></div>
        Youtube
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-video"></div>
        Bilibili
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-phone"></div>
        小红书
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-logo-twitter"></div>
        X
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-chat"></div>
        WeChat
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-notification"></div>
        公众号
      </a>
      <a href="#" class="social-link">
        <div class="i-carbon-mobile"></div>
        即刻
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style>
/* 可以移除大部分样式，因为使用了 UnoCSS */
@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
