# Codex CLI 接入指南

## 什么是 Codex CLI

Codex CLI 是一个强大的命令行工具，旨在帮助开发者更高效地使用 AI 编程助手。通过 Codex CLI，您可以直接在终端中与 AI 模型交互，无需切换界面，从而提高开发效率。

## 安装

### 系统要求

- Node.js 16.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

```bash
# 使用 npm 安装
npm install -g @codex/cli

# 或使用 yarn 安装
yarn global add @codex/cli

# 或使用 pnpm 安装
pnpm add -g @codex/cli
```

## 配置

### 设置 API 密钥

首次使用前，需要配置您的 API 密钥：

```bash
# 设置 API 密钥
codex config set api_key your-api-key-here

# 查看当前配置
codex config get
```

### 配置模型

您可以选择要使用的 AI 模型：

```bash
# 设置默认模型
codex config set model gpt-4
# 或 codex config set model claude-3
# 或 codex config set model qwen-max
```

### (接入glm4.6 modelscope)[https://www.modelscope.cn/models/ZhipuAI/GLM-4.6]


## 基本用法

### 与 AI 对话

```bash
# 直接与 AI 对话
codex chat "帮我写一个快速排序算法"

# 从文件读取内容并询问
echo "function bubbleSort(arr) { ... }" | codex chat "请优化这个冒泡排序算法"
```

### 代码审查

```bash
# 审查当前目录下的所有 JavaScript 文件
codex review "**/*.js"

# 审查特定文件
codex review src/utils.js --format detailed
```

### 代码生成

```bash
# 生成代码片段
codex generate "创建一个 React 组件，用于显示用户信息"

# 生成特定类型的文件
codex generate --type component "用户资料卡片组件"
```

## 高级功能

### 自定义提示模板

创建自定义提示模板以提高开发效率：

```bash
# 创建自定义模板
codex template create "code-review" "请以资深架构师的身份审查以下代码，重点关注性能、安全性和可维护性方面的问题："
```

### 项目集成

将 Codex CLI 集成到您的开发工作流中：

```bash
# 在 package.json 中添加脚本
{
  "scripts": {
    "ai:review": "codex review src/**",
    "ai:docs": "codex document src/** --output docs/"
  }
}
```

## 配置选项

### 常用配置项

| 配置项 | 描述 | 默认值 |
|--------|------|--------|
| `api_key` | API 密钥 | - |
| `model` | 默认模型 | gpt-4 |
| `temperature` | 创造性参数 (0-1) | 0.7 |
| `max_tokens` | 最大输出 token 数 | 2048 |
| `format` | 输出格式 | simple |

### 设置配置项

```bash
# 设置温度参数
codex config set temperature 0.5

# 设置最大 token 数
codex config set max_tokens 4096
```

## 插件系统

Codex CLI 支持插件扩展功能：

```bash
# 安装插件
codex plugin install @codex/git

# 查看已安装插件
codex plugin list

# 使用插件功能
codex git review
```

## 最佳实践

### 1. 提示工程

- 使用清晰、具体的指令
- 提供足够的上下文信息
- 指定所需的输出格式

### 2. 项目集成

- 在项目根目录创建 `.codexrc` 配置文件
- 将常用命令添加到 `package.json` 脚本中
- 使用版本控制管理配置文件

### 3. 安全性

- 不要在代码中硬编码 API 密钥
- 定期轮换 API 密钥
- 使用环境变量或安全的密钥管理系统

## 常见问题

### Q: 如何查看所有可用命令？

A: 使用以下命令查看所有可用命令：

```bash
codex --help
codex <command> --help
```

### Q: 如何切换模型？

A: 使用配置命令切换模型：

```bash
codex config set model claude-3
```

### Q: 如何保存对话历史？

A: Codex CLI 会自动保存对话历史：

```bash
# 查看对话历史
codex history

# 清除对话历史
codex history clear
```

## 故障排除

### API 密钥问题

如果遇到 API 密钥相关错误，请检查：

1. 确保 API 密钥已正确配置
2. 确保 API 密钥有足够的权限
3. 确保 API 密钥未过期

### 网络连接问题

如果遇到网络连接问题：

```bash
# 测试连接
codex ping

# 设置代理（如果需要）
codex config set proxy http://proxy-server:port
```

## 贡献

Codex CLI 是一个开源项目，欢迎贡献：

- 报告问题：https://github.com/codex/cli/issues
- 提交 PR：https://github.com/codex/cli/pulls
- 文档改进：https://github.com/codex/cli-docs
