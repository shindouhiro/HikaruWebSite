# Claude CLI (Claude Code) 使用技巧总结

Claude Code 是 Anthropic 官方推出的 AI 驱动的命令行代码助手。它可以直接在终端中帮你写代码、调试、运行测试以及管理 Git 工作流。

## 1. 快速上手

### 安装
使用 npm 全局安装：
```bash
npm install -g @anthropic-ai/claude-code
```

### 初始化与登录
在项目根目录下运行：
```bash
claude
```
首次运行时会引导你完成授权登录（需具备 Claude Pro 或 Max 订阅）。

### 核心命令
- `claude`：启动交互式 REPL 模式。
- `claude "你的任务描述"`：直接带任务启动。
- `claude -p "查询"`：单次执行模式（Headless mode），结果直接输出到终端。
- `claude -c`：继续上一次对话。

---

## 2. 核心工作流：CLAUDE.md

`CLAUDE.md` 是 Claude Code 的“宪法”，是它理解你项目的最重要依据。

- **创建**：运行 `/init` 命令，Claude 会扫描项目并自动生成或建议 `CLAUDE.md` 的内容。
- **内容建议**：在该文件中记录：
  - 项目架构和技术栈。
  - 常用命令（构建、测试、格式化）。
  - 代码风格指南和命名规范。
- **动态更新**：你可以在对话中通过 `#` 指令（例如 `# 将这个编码规范记录到 CLAUDE.md`）要求它更新该文件。

---

## 3. 常用斜杠命令 (Slash Commands)

在交互模式下，使用 `/` 控制 Claude 的行为：

| 命令 | 说明 |
| :--- | :--- |
| `/init` | 初始化项目，生成 `CLAUDE.md` |
| `/clear` | 清除当前对话历史，减少 Context 消耗，提高响应速度 |
| `/compact` | 压缩对话历史，保留关键上下文 |
| `/review` | 请求对现有代码进行审查 |
| `/help` | 显示完整的帮助菜单 |
| `/model` | 切换不同规格的 Claude 模型（如 Sonnet, Haiku） |
| `/permissions` | 查看和修改 Claude 的工具使用权限 |

---

## 4. 如何定义 Skill

Skill 是 Claude Code 能够自主调用的“专业技能”或“复杂工作流”。它们比普通的 Prompt 模板更强大，因为 Claude 会根据你的任务描述自动判断是否需要启用这项技能。

### 定义步骤

1. **创建 Skill 目录**：
   - **全局 Skill**：在 `~/.claude/skills/` 下创建一个文件夹（如 `my-web-expert`）。
   - **项目级 Skill**：在当前项目的 `.claude/skills/` 下创建文件夹。

2. **创建 SKILL.md**：
   在技能文件夹内创建一个名为 `SKILL.md` 的文件。

3. **编写 Skill 内容**：
   文件开头**必须**包含 YAML Frontmatter，Claude 靠 `description` 来决定何时使用它。

   ```markdown
   ---
   name: "web-optimization-expert"
   description: "当用户需要优化网页性能、分析渲染瓶颈或改进 Core Web Vitals 时使用。该技能具备深入的 Chrome DevTools 协议知识和前端性能优化经验。"
   ---

   # 角色定义
   你是一个顶尖的前端性能专家。你的目标是...

   # 工作流程
   1. 首先检查项目中的静态资源加载情况...
   2. 分析包体积大小...
   3. 给出具体的重构建议。
   ```

### Skill vs Slash Command
- **Slash Commands** (`/cmd`)：由你**显示触发**，通常用于具体的工具性操作。
- **Skills**：由 Claude **根据语境自动触发**（类似于 Agent 的 Tool），更适合封装复杂的专家逻辑或项目特定的架构知识。

---

## 5. 高级技巧与提效

### 直接运行 Shell
在 Prompt 前加 `!` 即可让 Claude 执行 Shell 命令，例如：
`! npm test` 或 `! ls -la`

### 引用文件
使用 `@` 符号精确指引 Claude 查看特定文件：
`重构 @./src/utils/math.ts 中的处理逻辑`

### 创建自定义命令
在 `.claude/commands` 目录下添加 Markdown 文件，可以作为 Prompt 模板。

### 使用 MCP (Model Context Protocol)
通过集成外部 MCP 服务器，Claude 可以读取 Jira、数据库或其他第三方工具的数据，极大扩展其能力边界。

### 子代理 (Subagents)
Claude Code 能够启动子实例来并行处理任务，你会看到类似 `Task(...)` 的输出，这标志着它正在自主拆解并执行复杂任务。

---

## 6. Token 节省与成本控制

- **及时清除上下文**：对话过长会大幅消耗 Token，且容易产生幻觉。完成一个任务后，请习惯性使用 `/clear`。
- **选择合适的模型**：简单、琐碎的任务使用 `/model haiku`，复杂的逻辑重构再切回主力模型。
- **精确定位文件**：避免让 Claude 全盘扫描，通过 `@` 明确告知它关注哪些代码块。

---

## 附录：多模型/环境切换

如果你需要切换多套 Claude 环境或使用非官方 API，可以使用类似 `cc-model-switcher` 的工具。

### [cc-model-switcher 配置示例](https://github.com/XiaYeAI/cc-model-switcher)

```json
{
  "models": {
    "glm-4.6": {
      "description": "GLM-4.6",
      "env": {
        "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",
        "ANTHROPIC_MODEL": "GLM-4.6"
      }
    },
    "gemini": {
      "description": "gemini",
      "env": {
        "ANTHROPIC_BASE_URL": "https://openrouter.ai/api/v1/chat/completions",
        "ANTHROPIC_MODEL": "google/gemini-2.0-flash-exp:free"
      }
    }
  }
}
```

