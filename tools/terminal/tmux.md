---
layout: doc
title: Tmux - 强大的终端复用工具
description: Tmux 使用指南
aside: true
outline: deep
---

<TmuxGuide />

## 详细说明

### 配置说明

Tmux 的配置文件位于 `~/.tmux.conf`，以下是一些常用配置：

```bash
# 修改前缀键
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# 开启鼠标支持
set -g mouse on

# 设置状态栏
set -g status-style bg=black,fg=white
set -g window-status-current-style bg=white,fg=black

# 设置分割线颜色
set -g pane-border-style fg=green
set -g pane-active-border-style fg=white
```

### 插件推荐

1. **Tmux Plugin Manager (TPM)**
   - 插件管理器
   - 简化插件安装和管理

2. **tmux-resurrect**
   - 保存和恢复会话状态
   - 重启后恢复工作环境

3. **tmux-continuum**
   - 自动保存会话
   - 自动恢复最后保存的环境

4. **tmux-yank**
   - 改进复制功能
   - 与系统剪贴板集成

### 常见问题

1. **快捷键冲突**
   - 修改 prefix 键
   - 自定义快捷键绑定

2. **复制模式问题**
   - 安装 tmux-yank
   - 配置 vi 模式

3. **状态栏显示**
   - 自定义状态栏内容
   - 调整刷新间隔

### 高级技巧

1. **会话管理**
   ```bash
   # 创建命名会话
   tmux new -s myproject

   # 附加到已存在的会话
   tmux attach -t myproject

   # 列出所有会话
   tmux ls
   ```

2. **窗口布局**
   - 使用预设布局
   - 保存自定义布局

3. **命令模式**
   - 使用 prefix + : 进入
   - 执行 tmux 命令

### 相关资源

- [Tmux GitHub](https://github.com/tmux/tmux)
- [Tmux 速查表](https://tmuxcheatsheet.com)
- [Awesome Tmux](https://github.com/rothgar/awesome-tmux)

--- 
