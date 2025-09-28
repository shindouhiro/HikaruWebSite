<template>
  <div ref="giscusContainer"></div>
</template>

<script>
export default {
  name: "GiscusComments",
  mounted() {
    // 创建 script 元素
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "shindouhiro/HikaruWebSite");
    script.setAttribute("data-repo-id", "R_kgDON4w02Q");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDON4w02c4CvwSJ");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    // 插入到容器中
    this.$refs.giscusContainer.appendChild(script);
  }
};
</script>
