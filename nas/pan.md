---
title: 网盘与自动化转存指引
---

<div class="max-w-5xl mx-auto">

# 网盘与自动化转存指引

<div class="mt-8 mb-10 p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
  <h2 class="text-xl font-bold mb-4 text-blue-900 dark:text-blue-100 flex items-center gap-2">
    <span class="i-carbon-folder text-2xl"></span>
    网盘目录规范
  </h2>
  <div class="space-y-3">
    <div class="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
      <span class="i-carbon-document-blank text-xl text-blue-600 dark:text-blue-400 mt-0.5"></span>
      <div>
        <strong class="text-gray-900 dark:text-gray-100">115 网盘：</strong>
        <span class="text-gray-700 dark:text-gray-300">请将资源放在「我的资源」目录（飞牛刮削以此为根目录）</span>
      </div>
    </div>
    <div class="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-gray-800/60">
      <span class="i-carbon-document-blank text-xl text-indigo-600 dark:text-indigo-400 mt-0.5"></span>
      <div>
        <strong class="text-gray-900 dark:text-gray-100">夸克网盘：</strong>
        <span class="text-gray-700 dark:text-gray-300">请将资源放在「独立刮削」目录（飞牛刮削以此为根目录）</span>
      </div>
    </div>
  </div>
  <div class="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500">
    <p class="text-sm text-amber-900 dark:text-amber-200">
      <span class="i-carbon-information inline-block mr-1"></span>
      <strong>目的：</strong>统一目录结构，便于飞牛/媒体库稳定刮削与更新
    </p>
  </div>
</div>

## 常用入口

<div class="grid gap-4 sm:grid-cols-2 mb-10">
  <a
    class="group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    href="http://cloud.shindou.icu/resource"
    target="_blank"
    rel="noreferrer"
    style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
  >
    <span class="i-carbon-cloud-app text-xl text-white"></span>
    <span class="text-white">Cloud Saver 资源面板</span>
    <span class="i-carbon-arrow-right text-lg ml-auto group-hover:translate-x-1 transition-transform"></span>
  </a>
  <a
    class="group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    href="http://null.shindou.icu/"
    target="_blank"
    rel="noreferrer"
    style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
  >
    <span class="i-carbon-folder-shared text-xl text-white"></span>
    <span class="text-white">115 网盘直达</span>
    <span class="i-carbon-arrow-right text-lg ml-auto group-hover:translate-x-1 transition-transform"></span>
  </a>
</div>

## 预览截图

<div class="grid gap-6 sm:grid-cols-2 mb-10">
  <figure class="group rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-xl">
    <div class="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
      <img
        src="https://i0.hdslb.com/bfs/openplatform/ee260a39140dd2d68de85d8cc3c3cded1b9af739.png@1e_1c.webp"
        alt="115 网盘示意"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <figcaption class="p-3 text-center text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <span class="i-carbon-folder-shared inline-block mr-1 text-emerald-600 dark:text-emerald-400"></span>
      115 网盘示意
    </figcaption>
  </figure>
  <figure class="group rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl">
    <div class="relative overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
      <img
        src="https://i0.hdslb.com/bfs/openplatform/319714490c7b971f3d666c62d7ff681f072bb77d.png"
        alt="夸克网盘示意"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <figcaption class="p-3 text-center text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <span class="i-carbon-document-blank inline-block mr-1 text-indigo-600 dark:text-indigo-400"></span>
      夸克网盘示意
    </figcaption>
  </figure>
  <figure class="group rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-xl sm:col-span-2">
    <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
      <img
        src="https://i0.hdslb.com/bfs/openplatform/faf58341ac3e2e6d1197b3dbaa9a22480b672ad1.png@1e_1c.webp"
        alt="自动化脚本示意"
        class="w-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
    <figcaption class="p-3 text-center text-sm font-medium bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
      <span class="i-carbon-script inline-block mr-1 text-purple-600 dark:text-purple-400"></span>
      自动化任务与脚本示意
    </figcaption>
  </figure>
</div>

## 盘搜与自动化

<div class="grid gap-4 sm:grid-cols-2 mb-10 text-white">
  <a
    class="group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    href="http://pansou.shindou.icu/"
    target="_blank"
    rel="noreferrer"
    style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
  >
    <span class="i-carbon-search text-xl text-white"></span>
    <span class="text-white">网盘搜索（PanSou）</span>
    <span class="i-carbon-arrow-right text-lg ml-auto group-hover:translate-x-1 transition-transform"></span>
  </a>
  <a
    class="group relative overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    href="http://quark.shindou.icu/"
    target="_blank"
    rel="noreferrer"
    style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);"
  >
    <span class="i-carbon-task text-xl text-white"></span>
    <span class="text-white">夸克定时触发转存</span>
    <span class="i-carbon-arrow-right text-lg ml-auto group-hover:translate-x-1 transition-transform"></span>
  </a>
</div>

## 使用建议

<div class="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700">
  <ul class="space-y-3">
    <li class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800/80 shadow-sm">
      <span class="i-carbon-checkmark-filled text-xl text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"></span>
      <span class="text-gray-700 dark:text-gray-300">优先将影视类资源命名为「片名.年份.分辨率.来源」格式，减少刮削误差</span>
    </li>
    <li class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800/80 shadow-sm">
      <span class="i-carbon-checkmark-filled text-xl text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"></span>
      <span class="text-gray-700 dark:text-gray-300">大体积文件尽量放在稳定网盘（115）以保证下载和预览体验</span>
    </li>
    <li class="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800/80 shadow-sm">
      <span class="i-carbon-checkmark-filled text-xl text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"></span>
      <span class="text-gray-700 dark:text-gray-300">定期清理失效链接，避免重复刮削与无效任务</span>
    </li>
  </ul>
  <div class="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
    <p class="text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2">
      <span class="i-carbon-idea text-lg flex-shrink-0"></span>
      <span><strong>小贴士：</strong>若页面未显示图片，可能是外链加载受限或网络问题，刷新或更换网络再试。</span>
    </p>
  </div>
</div>

</div>
