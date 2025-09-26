<template>
  <div class="project-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-20 text-center">
        <h1 class="text-5xl md:text-6xl font-bold tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r 
                       from-blue-600 via-purple-500 to-blue-600
                       animate-gradient-x">项目展示</span>
        </h1>
        <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">精选开源项目，持续更新中</p>
      </div>

      <!-- 项目卡片网格 -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <!-- 项目卡片 1 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">🧩</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  SVG 预览插件
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-green-500 text-white">
                  已完成
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                VSCode 插件，提供 SVG 文件的实时预览功能，支持自定义图标管理
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  TypeScript
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  VSCode
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/projects/vscode-plugin-svg-preview" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-02-14</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 2 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">🎨</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  组件库
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-blue-500 text-white">
                  进行中
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                基于 Vue 3 + TypeScript 的现代化组件库，支持按需引入和主题定制
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Vue 3
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  TypeScript
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/frontend/component-ui" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-02-10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 3 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">⚡</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  CLI 工具
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-green-500 text-white">
                  已完成
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                命令行工具集，提供项目初始化、代码生成、部署自动化等功能
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Node.js
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  CLI
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/frontend/cli-publish" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-01-25</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 4 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">🤖</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  AI 助手
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-green-500 text-white">
                  已完成
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                基于 Claude API 的智能助手，支持代码生成、问题解答、文档编写
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Python
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Claude API
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/ai/claude-cli" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-01-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 5 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">🚀</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  部署自动化
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-green-500 text-white">
                  已完成
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                GitHub Actions 自动化部署方案，支持多环境、多服务、容器化部署
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Docker
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  GitHub Actions
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/devops/github-actions" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-01-10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 6 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">📚</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  学习笔记
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-blue-500 text-white">
                  进行中
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                Mini-Vue 源码学习笔记，深入理解 Vue 3 响应式原理和实现细节
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  JavaScript
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Vue 3
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/frontend/mini-vue" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-01-05</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 项目卡片 7 - Web网站展示 -->
        <div class="group">
          <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                      shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                      hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                      dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                      transition-all duration-500 ease-out
                      overflow-hidden cursor-pointer">
            
            <!-- 顶部：项目预览 -->
            <div class="h-48 relative overflow-hidden">
              <!-- 渐变背景 -->
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 
                          backdrop-blur-[2px] z-10"></div>
              
              <!-- 装饰图案 -->
              <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
              
              <!-- 项目图标 -->
              <div class="absolute inset-0 flex items-center justify-center z-20">
                <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">🌐</div>
              </div>
              
              <!-- 渐变遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
            </div>

            <!-- 底部：项目信息 -->
            <div class="p-6">
              <!-- 项目标题和状态 -->
              <div class="flex items-start justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Web网站展示
                </h3>
                <span class="px-2 py-1 text-xs font-medium rounded-full shadow-sm bg-green-500 text-white">
                  已完成
                </span>
              </div>

              <!-- 项目描述 -->
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                精选的Web网站项目集合，包含电商、社交、娱乐等多个领域的优秀作品
              </p>

              <!-- 技术标签 -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  React
                </span>
                <span class="px-3 py-1 text-xs font-medium rounded-full
                          bg-gray-100 dark:bg-gray-800
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-200 dark:hover:bg-gray-700
                          transition-colors duration-300">
                  Next.js
                </span>
              </div>

              <!-- 底部操作栏 -->
              <div class="flex items-center justify-between">
                <a href="/projects/web-sites" 
                   class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                  查看详情 →
                </a>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <span>2025-02-15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具技能展示 -->
      <div class="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">
        <div class="mb-16 text-center">
          <h2 class="text-4xl md:text-5xl font-bold tracking-tight">
            <span class="bg-clip-text text-transparent bg-gradient-to-r 
                         from-blue-600 via-purple-500 to-blue-600
                         animate-gradient-x">技能工具</span>
          </h2>
          <p class="mt-4 text-xl text-gray-600 dark:text-gray-400">掌握的核心技术与工具</p>
        </div>

        <!-- 技能分类标签 -->
        <div class="mb-12 flex flex-wrap justify-center gap-4">
          <span 
            v-for="category in categories" 
            :key="category"
            class="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors"
            :class="[
              selectedCategory === category 
                ? 'text-white shadow-lg transform scale-105' 
                : 'text-gray-700 dark:text-gray-300 hover:opacity-90',
              category === '前端开发' ? 'bg-blue-500' :
              category === '编辑器' ? 'bg-green-500' :
              category === '版本控制' ? 'bg-teal-500' :
              category === '容器化' ? 'bg-cyan-500' :
              category === 'CI/CD' ? 'bg-purple-500' :
              category === '云服务' ? 'bg-orange-500' :
              category === 'AI 工具' ? 'bg-yellow-500' :
              'bg-gray-500'
            ]"
            @click="selectCategory(category)"
          >
            {{ category }}
          </span>
        </div>

        <!-- 技能卡片网格 -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div 
            v-for="card in filteredCards" 
            :key="card.id"
            class="group skill-card"
          >
            <div class="relative bg-white dark:bg-[#1a1a1a] rounded-2xl
                        shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                        dark:shadow-[0_2px_8px_rgba(0,0,0,0.16)]
                        hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                        dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.24)]
                        transition-all duration-500 ease-out
                        overflow-hidden cursor-pointer flex flex-col h-full">
              
              <!-- 顶部：技能预览 -->
              <div class="h-48 relative overflow-hidden">
                <!-- 渐变背景 -->
                <div class="absolute inset-0 bg-gradient-to-br" :class="card.gradient"></div>
                
                <!-- 装饰图案 -->
                <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]"></div>
                
                <!-- 技能图标 -->
                <div class="absolute inset-0 flex items-center justify-center z-20">
                  <div class="text-6xl transform group-hover:scale-110 transition-transform duration-500">{{ card.icon }}</div>
                </div>
                
                <!-- 渐变遮罩 -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30"></div>
              </div>

              <!-- 底部：技能信息 -->
              <div class="p-6 flex-grow card-content">
                <!-- 技能标题 -->
                <div class="flex items-start justify-between mb-4">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {{ card.title }}
                  </h3>
                </div>

                <!-- 技能描述 -->
                <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {{ card.description }}
                </p>

                <!-- 技术标签 -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span 
                    v-for="tag in card.tags" 
                    :key="tag"
                    class="px-3 py-1 text-xs font-medium rounded-full
                           bg-gray-100 dark:bg-gray-800
                           text-gray-700 dark:text-gray-300
                           hover:bg-gray-200 dark:hover:bg-gray-700
                           transition-colors duration-300"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 社交联系方式 -->
      <div class="mt-20 border-t border-gray-200 dark:border-gray-700 pt-16">

        <div class="flex justify-center items-center gap-8 md:gap-12 social-container">
          <div v-for="link in socialLinks" :key="link.key" class="relative group">
            <div class="flex flex-col items-center gap-3 cursor-pointer">
              <div class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-all duration-300 ease-out social-icon" :class="link.hoverBg">
                <div class="relative w-16 h-16 md:w-20 md:h-20">
                  <div class="transition-all duration-300" :class="[link.icon, 'w-16 h-16 md:w-20 md:h-20 text-gray-600 group-hover:text-white']"></div>
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="[link.iconActive, 'w-16 h-16 md:w-20 md:h-20 text-white']"></div>
                </div>
              </div>
              <span v-if="link.label" class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ link.label }}</span>
            </div>
            <!-- 二维码弹层 -->
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
              <div class="rounded-lg shadow-2xl p-4 border border-gray-200 dark:border-gray-700">
                <div class="relative w-32 h-32 md:w-36 md:h-36 rounded-lg overflow-hidden qr-popup">
                  <img :src="link.qr" alt="二维码" class="w-full h-full object-contain">
                  <div class="absolute inset-0"></div>
                </div>
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div class="w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { socialLinks } from '../../../data/socialLinks'

// 定义技能卡片数据
const skillCards = [
  {
    id: 1,
    category: 'CI/CD',
    title: 'GitHub Actions',
    description: '自动化构建、测试和部署流程，支持多环境配置和容器化部署',
    tags: ['CI/CD', '自动化', 'Docker'],
    icon: '🔗',
    gradient: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    id: 2,
    category: 'CI/CD',
    title: 'Jenkins',
    description: '持续集成和持续部署平台，支持流水线配置和插件扩展',
    tags: ['CI/CD', 'Pipeline', '自动化'],
    icon: '⚙️',
    gradient: 'from-purple-500/20 to-indigo-500/20'
  },
  {
    id: 3,
    category: '前端开发',
    title: 'Vue.js & React',
    description: '精通现代前端框架，熟悉组件化开发和状态管理',
    tags: ['Vue.js', 'React', 'TypeScript'],
    icon: '💻',
    gradient: 'from-green-500/20 to-teal-500/20'
  },
  {
    id: 4,
    category: '编辑器',
    title: '编辑器',
    description: '熟练使用VSCode等现代代码编辑器，提升开发效率',
    tags: ['VSCode', '插件开发', '主题定制'],
    icon: '⌨️',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 5,
    category: '版本控制',
    title: '版本控制',
    description: '精通Git版本控制工具，熟悉分支管理、合并策略等',
    tags: ['Git', 'GitHub', 'GitLab'],
    icon: '🔄',
    gradient: 'from-teal-500/20 to-cyan-500/20'
  },
  {
    id: 6,
    category: '容器化',
    title: '容器化',
    description: '熟练使用Docker进行应用容器化，了解Kubernetes基础',
    tags: ['Docker', '容器编排', '镜像优化'],
    icon: '🐳',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  }
]

// 当前选中的分类
const selectedCategory = ref('全部')

// 分类标签
const categories = ['全部', '前端开发', '编辑器', '版本控制', '容器化', 'CI/CD', '云服务', 'AI 工具']

// 筛选后的卡片
const filteredCards = computed(() => {
  if (selectedCategory.value === '全部') {
    return skillCards
  }
  return skillCards.filter(card => card.category === selectedCategory.value)
})

// 选择分类
const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<style scoped>
.project-wrapper {
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

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 100%;
    background-position: left center;
  }
  50% {
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 统一卡片高度 */
.skill-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.skill-card .flex-grow {
  flex-grow: 1;
}

.skill-card .card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.skill-card .card-content .mb-6 {
  flex-grow: 1;
}

/* 添加按钮点击效果 */
a:active {
  transform: translateY(0);
  transition-duration: 0.1s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .project-wrapper .grid {
    @apply grid-cols-1 gap-6;
  }
  
  .project-wrapper h1 {
    @apply text-4xl;
  }
  
  .project-wrapper p {
    @apply text-lg;
  }

  /* 移动端社交联系方式优化 */
  .project-wrapper .social-container {
    @apply gap-6;
  }
  
  .project-wrapper .social-icon {
    @apply w-14 h-14;
  }
  
  /* 移动端二维码弹层调整 */
  .project-wrapper .qr-popup {
    @apply w-28 h-28;
  }
}
</style>
