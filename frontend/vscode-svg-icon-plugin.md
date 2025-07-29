# Iconify：高效批量管理自定义 SVG 图标最佳实践

> **批量管理 SVG 图标的高效方案！**

在日常开发中，**批量管理大量 SVG 图标**一直是个令人头疼的问题。为了解决这个痛点，我选择了 **Iconify API** ——  
- 通过将自定义 SVG 图标**打包为 JSON 文件**，实现了高效、统一的图标数据管理。  
- 配合 **Iconify IntelliSense 插件**，可以在编辑器中**实时预览 SVG 图标效果**，极大提升了开发体验和效率！

✨ **推荐：Iconify 让你的图标管理更简单、更高效！**

## 📋 目录导航

- [🎯 Iconify 核心特性](#iconify-核心特性)
- [📦 使用 Iconify API 生成 JSON 文件](#使用-iconify-api-生成-json-文件)
- [🔧 安装配置 Iconify IntelliSense 插件](#安装配置-iconify-intellisense-插件)
- [⚙️ VSCode 设置配置](#vscode-设置配置)
- [👀 编辑器预览效果](#编辑器预览效果)
## 🎯 Iconify 核心特性
1. **统一图标管理**：Iconify 提供了一个统一的平台，支持从多个图标库（如 Material Icons、Font Awesome、Tabler Icons 等）中获取和使用图标，无需单独引入不同的图标字体或文件。
2. **按需加载**：Iconify 允许开发者按需加载图标，仅加载页面中实际使用的图标，减少资源加载，提升性能。
3. **SVG 图标支持**：Iconify 使用 SVG 格式的图标，确保图标在不同分辨率下保持清晰，且支持动态修改样式（如颜色、大小等）。
4. **跨框架兼容**：Iconify 提供与多种前端框架的集成（如 React、Vue、Svelte 等），以及原生 JavaScript 和 HTML 的支持，方便开发者在不同技术栈中使用。
5. **动态加载与 CDN**：通过 Iconify 的 CDN 或 API，开发者可以动态加载图标，无需本地存储大量图标文件，简化项目维护。
6. **图标定制与优化**：支持自定义图标集，开发者可以上传自己的 SVG 图标，并通过 Iconify 的工具进行优化和使用。

## 📦 使用 Iconify API 生成 JSON 文件

```json
{
  "prefix": "mdi",
  "info": {
    "name": "Material Design Icons",
    "author": {
      "name": "Google"
    },
    "license": {
      "title": "Apache 2.0"
    }
  },
  "icons": {
    "home": {
      "body": "<path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/>",
      "width": 24,
      "height": 24
    },
    "account": {
      "body": "<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'/>",
      "width": 24,
      "height": 24
    }
  }
}
```

## 🔧 安装配置 Iconify IntelliSense 插件
+ 插件默认从 CDN 地址和 node_modules 寻找 JSON 文件
+ 如果自己打包的 JSON 文件需要手动配置编辑器的 setting.json

## ⚙️ VSCode 设置配置

### setting.json 配置示例
```json
  "iconify.annotations": true,
  "iconify.inplace": true,
  "iconify.prefixes": [""],
  "iconify.delimiters": [":"],
  "iconify.customCollectionJsonPaths": ["/Users/hikaru/Desktop/agent/chatbot-ui/src/components/UI/MyIcons/my-icons.json"],
```
1. 当 `annotations: false` 时，**完全关闭 icon 预览功能**。
2. 当 `annotations: true, inplace: false` 时，**显示 icon 预览，但保留原始文本**。
3. 当 `annotations: true, inplace: true` 时，**显示 icon 预览，并在光标不在该行时隐藏原始文本**。
4. `iconify.prefixes: [""]`：允许无前缀识别，支持直接书写 `myicons:home`，无需加 `i-myicons:home` 前缀。
5. `iconify.delimiters: [":"]`：定义分隔符为冒号，用于解析 `集合名:图标名` 的格式。
6. `iconify.customCollectionJsonPaths`：指定自定义图标集合 JSON 文件的绝对路径，插件会从该路径加载图标数据。

## 👀 编辑器预览效果

### 配置完成后即可在编辑器中直接预览 SVG 图标
![](https://i0.hdslb.com/bfs/openplatform/9fac61a6cec4dfe9a9740f4ef7253af3d0c223ea.png@1e_1c.webp)


