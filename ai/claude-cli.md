---
layout: doc
---

# Claude CLI 使用指南

<div class="doc-section">

## 📦 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

</div>

<div class="doc-section">

## 📚 官方文档

### [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview)

</div>

<div class="router-section">

## 🔄 接入方式使用 claude-code-router

### 📦 安装 claude-code-router

```bash
npm install -g @musistudio/claude-code-router
```

### ⚙️ 配置

- **api_key**: 添加你的 API 密钥
- **models**: 支持的模型列表
- **transformer**: 模型转换器配置
- **Router**: 路由配置，设置默认模型

</div>

创建配置文件 `~/.claude-code-router/config.json`：

```json
{
  "modelscope": {
    "name": "modelscope",
    "api_base_url": "https://api-inference.modelscope.cn/v1/chat/completions",
    "api_key": "你的API密钥",
    "models": [
      "Qwen/Qwen3-Coder-480B-A35B-Instruct",
      "Qwen/Qwen3-235B-A22B-Thinking-2507"
    ],
    "transformer": {
      "use": [
        [
          "maxtoken",
          {
            "max_tokens": 65536
          }
        ],
        "enhancetool"
      ],
      "Qwen/Qwen3-235B-A22B-Thinking-2507": {
        "use": [
          "reasoning"
        ]
      }
    }
  },
  "Router": {
    "default": "modelscope,Qwen/Qwen3-Coder-480B-A35B-Instruct"
  }
}
```



<div class="install-section">

## 🚀 快速开始

3. **配置 API 密钥**
   - 编辑 `~/.claude-code-router/config.json`
   - 添加你的 API 密钥

4. **开始使用**
   ```bash
   ccr code
   ```

</div>

---


## 全局上下文配置
+ ~/.claude/claude.md
## 全局Hooks
~/.claude/settings.json - 用户设置
.claude/settings.json - 项目设置
.claude/settings.local.json - 本地项目设置（不提交
