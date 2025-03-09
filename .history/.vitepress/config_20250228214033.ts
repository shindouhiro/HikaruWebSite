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
  title: "Hikaru",
  description: "AI Native Coder",
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  themeConfig: {
    outlineTitle: '本页目录',
    
    // 添加导航菜单
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
        text: '编程',
        items: [
          {
            text: '前端八股文',
            items: [
              { text: 'JavaScript基础', link: '/frontend/interview/javascript/scope-closure' },
              { 
                text: '工程化', 
                items: [
                  { text: '幽灵依赖', link: '/frontend/interview/package-management' },
                  { text: '构建工具', link: '/frontend/interview/build-tools' },
                  { text: '模块化', link: '/frontend/interview/module-system' }
                ]
              },
              { text: '框架原理', link: '/frontend/interview/framework/react' },
              { text: '性能优化', link: '/frontend/interview/performance/loading' }
            ]
          }
        ]
      },
      {
        text: '生活',
        items: [
          { text: '阅读', link: '/life/reading' },
          { text: '运动', link: '/life/running' },
         
        ]
      },
      { 
        text: '兴趣',
        items: [
          { 
            text: '摄影',
            items: [
              { text: '构图基础', link: '/interests/photography/composition-basics' },
              { text: '吊脚式构图', link: '/interests/photography/composition-dangling' }
            ]
          }
          // 其他兴趣可以在这里添加，比如:
          // { text: '绘画', items: [...] },
          // { text: '音乐', items: [...] }
        ]
      },
      {
        text: '站点',
        items: [
          { text: 'Z-Library', link: '/sites/z-library' }
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
