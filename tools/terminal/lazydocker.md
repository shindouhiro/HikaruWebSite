---
layout: doc
title: LazyDocker - 简单而强大的 Docker 终端管理工具
description: LazyDocker 使用指南
aside: true
outline: deep
---

<LazyDockerGuide />

## 详细说明

### 配置说明

LazyDocker 支持自定义配置，配置文件位置：
- Linux: `~/.config/lazydocker/config.yml`
- MacOS: `~/Library/Application Support/lazydocker/config.yml`
- Windows: `%APPDATA%\lazydocker\config.yml`

### 常见问题

1. **无法连接到 Docker daemon？**
   - 确认 Docker 服务是否运行
   - 检查用户权限
   - 验证 Docker socket 权限

2. **界面显示异常？**
   - 确认终端支持 TUI
   - 检查终端字体
   - 调整终端窗口大小

3. **性能问题？**
   - 减少监控容器数量
   - 调整日志刷新频率
   - 关闭不需要的面板

### 高级用法

1. **自定义命令**
   ```yaml
   customCommands:
     containers:
       - name: bash
         command: "docker exec -it {{ .Container.ID }} bash"
   ```

2. **过滤容器**
   ```yaml
   filterContainers:
     - state: running
     - name: web
   ```

3. **调整日志设置**
   ```yaml
   logs:
     timestamps: true
     since: "2h"
     tail: 200
   ```

### 相关资源

- [GitHub 仓库](https://github.com/jesseduffield/lazydocker)
- [配置文档](https://github.com/jesseduffield/lazydocker/blob/master/docs/Config.md)
- [问题反馈](https://github.com/jesseduffield/lazydocker/issues)

--- 
