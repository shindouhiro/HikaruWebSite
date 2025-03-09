---
layout: doc
title: ESM 与 CJS 的区别
description: 深入理解 ES Modules 和 CommonJS 的区别
aside: true
outline: deep
---

# ESM 与 CJS 的区别

## 基本概念

### CommonJS (CJS)
CommonJS 是 Node.js 最初采用的模块系统，使用 `require()` 和 `module.exports`/`exports` 进行模块的导入和导出。

::: code-group
```js [导出]
// 方式一：直接导出对象
module.exports = { 
  method1, 
  method2 
}

// 方式二：单个导出
exports.method3 = function() {}
```

```js [导入]
// 导入整个模块
const module = require('./module')

// 使用解构导入
const { method1, method2 } = require('./module')
```
:::

### ES Modules (ESM)
ES Modules 是 ECMAScript 官方的模块系统标准，使用 `import` 和 `export` 语句。

::: code-group
```js [导出]
// 命名导出
export const method1 = () => {}
export const method2 = () => {}

// 默认导出
export default class MyClass {}
```

```js [导入]
// 导入命名导出
import { method1, method2 } from './module'

// 导入默认导出
import MyClass from './module'

// 同时导入命名和默认导出
import MyClass, { method1, method2 } from './module'
```
:::

## 七大核心区别

### 1. 语法差异 {#syntax}

::: tip 语法对比
| 特性 | CommonJS | ES Modules |
|------|----------|------------|
| 导入语法 | `require()` | `import` |
| 导出语法 | `module.exports`, `exports` | `export`, `export default` |
| 导入位置 | 任意位置 | 模块顶层 |
| 导入动态性 | 支持动态导入 | 仅支持静态导入（可用 `import()` 动态） |
:::

### 2. 加载机制 {#loading}

::: warning 加载特点
**CommonJS**
- 同步加载
- 运行时加载
- 加载整个模块
- 性能相对较低

**ES Modules**
- 异步加载
- 编译时输出接口
- 可以只加载需要的部分
- 性能更好
:::

### 3. 导入导出特性 {#export-import}

::: code-group
```js [CJS值拷贝]
// module.js
let counter = 0
module.exports = {
  counter,
  increment: () => counter++
}

// main.js
const mod = require('./module')
console.log(mod.counter) // 0
mod.increment()
console.log(mod.counter) // 仍然是 0
```

```js [ESM值引用]
// module.js
export let counter = 0
export const increment = () => counter++

// main.js
import { counter, increment } from './module'
console.log(counter) // 0
increment()
console.log(counter) // 1
```
:::

### 4. 静态分析能力 {#static-analysis}

::: code-group
```js [CJS动态导入]
// ✅ CJS 支持动态导入
if (condition) {
  const module = require('./module')
}
```

```js [ESM静态导入]
// ❌ ESM 不支持条件导入
if (condition) {
  import { method } from './module' // 语法错误！
}

// ✅ 但可以使用动态 import()
if (condition) {
  import('./module').then(module => {
    // 使用模块
  })
}
```
:::

### 5. 循环依赖处理 {#circular-dependency}

::: code-group
```js [CJS循环依赖]
// a.js
exports.done = false
const b = require('./b')
exports.done = true

// b.js
const a = require('./a')
console.log(a.done) // false
```

```js [ESM循环依赖]
// a.mjs
import { b } from './b.mjs'
export let a = 1

// b.mjs
import { a } from './a.mjs'
export let b = 2
// 通过实时绑定处理循环依赖
```
:::

### 6. 文件扩展名 {#file-extension}

::: tip 文件扩展名使用
| 模块系统 | 推荐扩展名 | 说明 |
|---------|------------|------|
| CommonJS | `.js`, `.cjs` | `.cjs` 强制使用 CommonJS |
| ES Modules | `.mjs` | 明确表示这是一个 ES Module |
:::

### 7. this 指向 {#this-binding}

::: warning this 的差异
**CommonJS**
- 顶层 `this` 指向当前模块的 `exports` 对象
- 可以使用 `this` 添加导出

**ES Modules**
- 顶层 `this` 是 `undefined`
- 不能使用 `this` 添加导出
:::

## 最佳实践

### 如何选择？

::: tip 选择建议
1. **新项目**
   - 优先使用 ESM
   - 更好的静态分析
   - 更好的 Tree Shaking

2. **维护项目**
   - 保持与现有代码一致
   - 避免混合使用导致的复杂性

3. **库开发**
   - 考虑提供双模块格式
   - 使用工具如 Rollup 构建
:::

### 在 Node.js 中配置 ESM

::: code-group
```json [package.json]
{
  "name": "my-package",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  }
}
```

```js [双模块入口]
// index.mjs
export const hello = () => 'Hello from ESM'

// index.cjs
module.exports = {
  hello: () => 'Hello from CJS'
}
```
:::

## 总结

ESM 是 JavaScript 的未来标准模块系统，提供了：
- 更好的静态分析能力
- 异步加载特性
- 实时绑定
- Tree Shaking 支持

而 CJS 作为 Node.js 的传统模块系统：
- 仍在广泛使用
- 运行时加载
- 同步特性
- 更简单的循环依赖处理

选择哪种模块系统应基于：
- 项目需求
- 运行环境
- 团队熟悉度
- 生态系统兼容性
