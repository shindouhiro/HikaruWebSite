---
layout: doc
title: LazyVim - 现代化的 Neovim 配置框架
description: LazyVim 使用指南与插件推荐
aside: true
outline: deep
---

# LazyVim - 现代化的 Neovim 配置框架

::: tip 🚀 简介
LazyVim 是一个基于 Neovim 的现代化配置框架，它提供了开箱即用的编辑体验和强大的可扩展性。
:::

::: info 导航
- [核心特性](#features)
- [安装配置](#setup)
- [插件生态](#plugins)
- [使用技巧](#tips)
:::

## 核心特性 {#features}

<div class="features">
  <div class="feature">
    <h3>⚡️ 极速启动</h3>
    <ul>
      <li>懒加载机制</li>
      <li>异步加载</li>
      <li>优化的性能</li>
    </ul>
  </div>

  <div class="feature">
    <h3>🎨 美观界面</h3>
    <ul>
      <li>现代化主题</li>
      <li>状态栏美化</li>
      <li>文件树优化</li>
    </ul>
  </div>

  <div class="feature">
    <h3>🔧 开发工具</h3>
    <ul>
      <li>LSP 支持</li>
      <li>代码补全</li>
      <li>语法高亮</li>
    </ul>
  </div>
</div>

## 安装配置 {#setup}

::: code-group
```bash # Linux/macOS
# 备份现有配置
mv ~/.config/nvim{,.bak}
mv ~/.local/share/nvim{,.bak}
mv ~/.local/state/nvim{,.bak}
mv ~/.cache/nvim{,.bak}

# 克隆 LazyVim 启动器
git clone https://github.com/LazyVim/starter ~/.config/nvim
rm -rf ~/.config/nvim/.git
```

```powershell # Windows
# 备份现有配置
Move-Item $env:LOCALAPPDATA\nvim $env:LOCALAPPDATA\nvim.bak
Move-Item $env:LOCALAPPDATA\nvim-data $env:LOCALAPPDATA\nvim-data.bak

# 克隆 LazyVim 启动器
git clone https://github.com/LazyVim/starter $env:LOCALAPPDATA\nvim
Remove-Item $env:LOCALAPPDATA\nvim\.git -Recurse -Force
```
:::

## 插件生态 {#plugins}

### 核心插件

::: details 基础插件
- **lazy.nvim**: 插件管理器
- **telescope.nvim**: 模糊查找
- **neo-tree.nvim**: 文件树
- **which-key.nvim**: 快捷键提示
- **mason.nvim**: LSP 管理
:::

### 推荐插件

<div class="plugin-grid">
  <div class="plugin-card">
    <h4>🔍 telescope-fzf-native.nvim</h4>
    <p>高性能模糊搜索</p>
  </div>

  <div class="plugin-card">
    <h4>📝 none-ls.nvim</h4>
    <p>代码格式化与检查</p>
  </div>

  <div class="plugin-card">
    <h4>🎨 nvim-treesitter</h4>
    <p>语法高亮增强</p>
  </div>

  <div class="plugin-card">
    <h4>💡 nvim-cmp</h4>
    <p>智能代码补全</p>
  </div>
</div>

## 使用技巧 {#tips}

### 常用快捷键

::: details 文件操作
- `<leader>ff`: 查找文件
- `<leader>fg`: 全局搜索
- `<leader>e`: 打开文件树
:::

::: details 编辑操作
- `gcc`: 注释/取消注释
- `<leader>cf`: 格式化代码
- `K`: 查看文档
:::

### 自定义配置

```lua
-- ~/.config/nvim/lua/config/options.lua
vim.opt.relativenumber = true  -- 相对行号
vim.opt.wrap = true           -- 自动换行
vim.opt.scrolloff = 8         -- 光标上下边距

-- ~/.config/nvim/lua/config/keymaps.lua
vim.keymap.set("n", "<C-d>", "<C-d>zz")  -- 保持光标居中
vim.keymap.set("n", "<C-u>", "<C-u>zz")
```

## 性能优化 {#optimization}

<div class="optimization-tips">
  <div class="tip">
    <h4>📦 插件管理</h4>
    <p>按需启用插件，避免加载不必要的功能</p>
  </div>

  <div class="tip">
    <h4>⚡️ 启动优化</h4>
    <p>合理使用懒加载，减少启动时间</p>
  </div>

  <div class="tip">
    <h4>🔧 LSP 配置</h4>
    <p>只加载当前项目需要的语言服务器</p>
  </div>
</div>

## 总结 {#summary}

<div class="summary-box">
  <h4>💡 使用建议</h4>
  <ol>
    <li>循序渐进学习，不要一次性添加太多插件</li>
    <li>熟悉核心快捷键，提高编辑效率</li>
    <li>定期更新插件，获取新特性</li>
    <li>根据需求自定义配置</li>
  </ol>
</div>

---

<div class="links-section">
  <h3>相关链接</h3>
  <a href="https://www.lazyvim.org/" class="link-item">📚 官方文档</a>
  <a href="https://github.com/LazyVim/LazyVim" class="link-item">⭐ GitHub</a>
  <a href="https://www.lazyvim.org/configuration" class="link-item">⚙️ 配置指南</a>
</div>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.feature {
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: transform 0.2s;
}

.feature:hover {
  transform: translateY(-2px);
}

.plugin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.plugin-card {
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}

.optimization-tips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.tip {
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
}

.summary-box {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand);
}

.links-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  transition: transform 0.2s;
}

.link-item:hover {
  transform: translateX(4px);
}
</style> 
