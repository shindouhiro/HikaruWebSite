<!-- BilibiliVideo.vue -->
<script setup lang="ts">
defineProps<{
  bvid: string
}>()
</script>

<template>
  <div class="video-container">
    <iframe
      :src="`//player.bilibili.com/player.html?bvid=${bvid}&page=1`"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
      class="w-full aspect-video rounded-lg shadow-lg"
    />
  </div>
</template>

<style scoped>
.video-container {
  @apply w-full max-w-4xl mx-auto my-4;
}
</style> 
