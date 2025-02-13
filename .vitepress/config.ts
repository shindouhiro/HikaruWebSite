import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { presetUno, presetIcons } from 'unocss'

export default defineConfig({
  title: "Hikaru",
  description: "AI Native Coder",
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
            text: '跨平台',
            items: [
              { text: 'LazyVim', link: '/tools/compatible/lazyvim' },
              { text: 'Yazi', link: '/tools/compatible/yazi' }
            ]
          }
        ]
      },
      {
        text: '站点',
        items: [
          { text: 'Z-Library', link: '/sites/z-library' }
        ]
      }
    ],

    // 添加侧边栏
    sidebar: {
      '/tools/': [
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
          text: '跨平台',
          items: [
            { text: 'LazyVim', link: '/tools/compatible/lazyvim' },
            { text: 'Yazi', link: '/tools/compatible/yazi' }
          ]
        }
      ],
      '/sites/': [
        {
          text: '站点',
          items: [
            { text: 'Z-Library', link: '/sites/z-library' }
          ]
        }
      ]
    }
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
