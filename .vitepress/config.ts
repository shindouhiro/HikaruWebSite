import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'
import type { DefaultTheme } from 'vitepress'

// 定义导航菜单项的类型
interface NavItem {
  text: string
  link?: string
  items?: (NavItem | { text: string; items: NavItem[] })[]
}

export default defineConfig({
  appearance: 'dark', // 默认使用黑色主题，但允许用户切换
  title: "Hikaru",
  description: "AI Native Coder",
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  themeConfig: {
    outlineTitle: '本页目录',
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '工具',
        items: [
          {
            text: 'Mac',
            items: [
              { text: 'Raycast', link: '/tools/mac/raycast' }
            ]
          },
          {
            text: 'Windows',
            items: [
              { text: 'uTools', link: '/tools/windows/utools' }
            ]
          },
          {
            text: '终端',
            items: [
              { text: 'LazyVim', link: '/tools/compatible/lazyvim' },
              { text: 'LazyGit', link: '/tools/compatible/lazygit' },
              { text: 'LazyDocker', link: '/tools/terminal/lazydocker' },
              { text: 'Tmux', link: '/tools/terminal/tmux' },
              { text: 'Yazi', link: '/tools/compatible/yazi' }
            ]
          }
        ]
      },
      {
        text: '技术分享',
        items: [
          {
            text: 'DevOps',
            items: [
              { text: 'GitHub Actions', link: '/devops/github-actions' },
              {text: 'Jenkins自动化部署', link: '/devops/jenkins'}
            ]
          },
          {
            text: '前端开发',
            items: [
              { text: 'NPM 包发布指南', link: '/frontend/npm-publish' },
              { text: 'NPM 发布组件库', link: '/frontend/component-ui' },
              { text: 'NPM 发布CLI工具', link: '/frontend/cli-publish' },
              { text: 'Mini-Vue 学习打卡', link: '/frontend/mini-vue' },
              { text: 'VSCode SVG Icon 插件实践', link: '/frontend/vscode-svg-icon-plugin' }
            ]
          },
          {
            text: 'Cursor',
            items: [
              {text: '解决Claude模型被封', link: '/cursor/claude-model'}
            ]
          }
        ]
      },
      {
        text: '项目',
        items: [
          {
            text: 'VSCode 插件',
            items: [
              { text: '🧩 SVG 预览', link: '/projects/vscode-plugin-svg-preview' }
            ]
          }
          // 可继续添加更多项目子菜单项
        ]
      },
      {
        text: '生活',
        items: [
          { text: '阅读', link: '/life/reading' },
          { text: '运动', link: '/life/running' },
          { text: '十三邀打卡', link: '/life/thirteen-invitations' },
          { text: '观影记录', link: '/movie-collection' }
        ]
      },
    ] satisfies DefaultTheme.NavItem[],

  },
  vite: {
    plugins: [
      UnoCSS({
        presets: [
          presetUno(),
          presetIcons({
            scale: 1.2,
            cdn: 'https://esm.sh/'
          }),
        ]
      }),
    ],
    // 解决构建警告
    ssr: {
      noExternal: ['uno.css']
    }
  }
})
