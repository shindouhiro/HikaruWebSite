---
layout: doc
title: Yazi - 现代化终端文件管理器
description: Yazi 使用指南与配置教程
aside: true
outline: deep
---

# Yazi - 现代化终端文件管理器

::: tip 🚀 简介
Yazi 是一个用 Rust 编写的终端文件管理器，具有现代化的用户界面和极速的性能表现。
:::

::: info 导航
- [核心特性](#features)
- [使用指南](#usage)
- [配置说明](#config)
- [性能优化](#optimization)
:::

## 核心特性 {#features}

<div class="features">
  <div class="feature">
    <h3>🎯 极速性能</h3>
    <ul>
      <li>异步文件操作</li>
      <li>快速目录扫描</li>
      <li>高效内存使用</li>
    </ul>
  </div>

  <div class="feature">
    <h3>🎨 现代界面</h3>
    <ul>
      <li>精美主题支持</li>
      <li>图标集成</li>
      <li>布局自定义</li>
    </ul>
  </div>

  <div class="feature">
    <h3>🔍 预览功能</h3>
    <ul>
      <li>图片/视频预览</li>
      <li>文本高亮</li>
      <li>压缩包预览</li>
    </ul>
  </div>
</div>

## 使用指南 {#usage}

::: code-group
```bash # 导航
h/j/k/l  # 移动光标
space     # 选择文件
enter     # 打开文件/目录
```

```bash # 复制/移动
yy        # 复制
dd        # 剪切
p         # 粘贴
```

```bash # 查找
/         # 搜索文件
n/N       # 下一个/上一个
```
:::

## 配置说明 {#config}

::: details 配置文件示例
```toml
# ~/.config/yazi/yazi.toml

[manager]
ratio         = [ 1, 4, 3 ]  # 布局比例
show_hidden   = false        # 显示隐藏文件
show_symlink  = true        # 显示软链接

[preview]
max_width     = 1920        # 预览最大宽度
max_height    = 1080        # 预览最大高度
cache_dir     = ""          # 缓存目录
```
:::

::: warning 注意事项
- 修改配置后需要重启 Yazi
- 建议备份原始配置
- 注意权限设置
:::

## 性能优化 {#optimization}

<div class="optimization-tips">
  <div class="tip">
    <h4>📦 缓存优化</h4>
    <p>合理设置缓存大小和位置，可显著提升预览速度</p>
  </div>

  <div class="tip">
    <h4>🔄 异步加载</h4>
    <p>大目录使用异步加载，避免界面卡顿</p>
  </div>

  <div class="tip">
    <h4>🎯 资源限制</h4>
    <p>设置合适的预览大小限制，平衡性能与体验</p>
  </div>
</div>

## 常见问题 {#faq}

::: details 为什么预览图片/视频很慢？
- 检查是否安装了必要的依赖
- 调整预览图片的最大尺寸
- 确保缓存目录有足够空间
:::

::: details 如何自定义快捷键？
编辑 `~/.config/yazi/keymap.toml` 文件：
```toml
[manager]
prepend_keymap = [
    { on = [ "<C-s>" ], exec = "shell '$SHELL'", desc = "Open shell here" },
    { on = [ "H" ], exec = "cd ..", desc = "Go to parent directory" },
]
```
:::

## 总结 {#summary}

<div class="summary-box">
  <h4>💡 使用建议</h4>
  <ol>
    <li>熟练掌握基本快捷键</li>
    <li>根据需求定制配置</li>
    <li>合理设置预览选项</li>
    <li>定期清理缓存</li>
  </ol>
</div>

---

<div class="links-section">
  <h3>相关链接</h3>
  <a href="https://yazi-rs.github.io/" class="link-item">📚 官方文档</a>
  <a href="https://github.com/sxyazi/yazi" class="link-item">⭐ GitHub</a>
  <a href="https://yazi-rs.github.io/docs/" class="link-item">📖 使用指南</a>
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
