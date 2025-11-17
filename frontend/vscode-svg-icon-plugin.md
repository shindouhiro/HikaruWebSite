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
## 生成json文件代码 [参考generate-iconify-json.mjs](https://github.com/shindouhiro/generate-iconify-json)
```js
import { promises as fs } from 'fs'
import { importDirectory } from '@iconify/tools'

const ICONS_DIR = 'icons'
const OUTPUT_JSON = 'my-icons.json'

// 自定义 loader：先正则替换 fill/stroke，再交给 iconify/tools
const iconSet = await importDirectory(ICONS_DIR, { includeSubDirs: true }, {
  customLoader: async (file) => {
    let svg = await fs.readFile(file, 'utf-8')
    svg = svg
      .replace(/(fill|stroke)\s*=\s*['"](?!none|transparent|url\()[^'"]*['"]/gi, '$1="currentColor"')
      .replace(/(fill|stroke)\s*:\s*(?!none|transparent|url\()[^;"']*/gi, '$1:currentColor')
    return svg
  }
})

iconSet.prefix = 'my-icons'
await fs.writeFile(OUTPUT_JSON, JSON.stringify(iconSet.export(), null, 2))
console.log('✅ my-icons.json (all icons currentColor) generated for react-use-icons') 
 
```

## 📦 使用 Iconify API 生成的JSON 文件

```json
{
  "prefix": "my-icons",
  "icons": {
    "add": {
      "body": "<g fill=\"none\"><g clip-path=\"url(#clip0_11914_3177)\"><path d=\"M8.00016 14.6663C11.6821 14.6663 14.6668 11.6816 14.6668 7.99967C14.6668 4.31777 11.6821 1.33301 8.00016 1.33301C4.31826 1.33301 1.3335 4.31777 1.3335 7.99967C1.3335 11.6816 4.31826 14.6663 8.00016 14.6663Z\" stroke=\"#4D15D8\" stroke-linejoin=\"round\"/><path d=\"M8 5.33301V10.6663\" stroke=\"#4D15D8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M5.3335 8H10.6668\" stroke=\"#4D15D8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><defs><clipPath id=\"clip0_11914_3177\"><rect width=\"16\" height=\"16\" fill=\"white\"/></clipPath></defs></g>"
    },
    "app-store-default": {
      "body": "<g fill=\"none\"><g clip-path=\"url(#clip0_14302_1800)\"><path d=\"M13.3464 7.33301V13.9997H2.67969V7.33301\" stroke=\"#6B696E\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M1.94791 4.5922C1.43806 5.91257 2.4215 7.33333 3.83687 7.33333C4.94144 7.33333 5.84301 6.4379 5.84301 5.33333C5.84301 6.4379 6.73844 7.33333 7.84301 7.33333H8.18247C9.28704 7.33333 10.1825 6.4379 10.1825 5.33333C10.1825 6.4379 11.0844 7.33333 12.189 7.33333C13.6051 7.33333 14.5895 5.91173 14.0792 4.59077L13.0784 2H2.94888L1.94791 4.5922Z\" stroke=\"#6B696E\" stroke-linejoin=\"round\"/></g><defs><clipPath id=\"clip0_14302_1800\"><rect width=\"16\" height=\"16\" fill=\"white\"/></clipPath></defs></g>"
    },
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


