import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import unocssConfig from '../unocss.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hikaru",
  description: "AI Native Coder",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '工具',
        items: [
          {
            text: 'Mac',
            items: [
              { 
                text: 'Raycast',
                link: '/tools/mac/raycast',
                items: [
                  { text: '基础使用', link: '/tools/mac/raycast/basic' },
                  { text: '插件推荐', link: '/tools/mac/raycast/plugins' },
                  { text: '使用技巧', link: '/tools/mac/raycast/tips' }
                ]
              },
            ]
          },
          {
            text: 'Windows',
            items: [
              {
                text: 'uTools',
                link: '/tools/windows/utools',
                items: [
                  { text: '基础使用', link: '/tools/windows/utools/basic' },
                  { text: '插件推荐', link: '/tools/windows/utools/plugins' },
                  { text: '使用技巧', link: '/tools/windows/utools/tips' }
                ]
              }
            ]
          },
          {
            text: '兼容',
            items: [
              {
                text: 'Yazi',
                link: '/tools/compatible/yazi',
                items: [
                  { text: '安装配置', link: '/tools/compatible/yazi/setup' },
                  { text: '使用指南', link: '/tools/compatible/yazi/guide' },
                  { text: '主题美化', link: '/tools/compatible/yazi/themes' }
                ]
              },
              {
                text: 'LazyVim',
                link: '/tools/compatible/lazyvim',
                items: [
                  { text: '安装配置', link: '/tools/compatible/lazyvim/setup' },
                  { text: '插件推荐', link: '/tools/compatible/lazyvim/plugins' },
                  { text: '使用技巧', link: '/tools/compatible/lazyvim/tips' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: '网站推荐',
        items: [
          { text: '海量资源电子书', link: '/sites/z-library' },

        ]
      },
      {
        text: '生活',
        items: [
          { text: '数字游民', link: '/life/digital-nomad' },
          { text: '旅行日记', link: '/life/travel' },
          { text: '读书笔记', link: '/life/reading' },
        ]
      },
      {
        text: '更多',
        items: [
          { text: '关于我', link: '/about' },
          { text: '联系方式', link: '/contact' },
          { text: '支持我', link: '/support' },
        ]
      }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/tools/mac/': [
        {
          text: 'Mac 应用',
          items: [
            {
              text: '小猫补光灯Pro',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/mac/cat-pro/guide' },
                { text: '常见问题', link: '/tools/mac/cat-pro/faq' },
                { text: '更新日志', link: '/tools/mac/cat-pro/changelog' }
              ]
            },
            {
              text: '小猫补光灯',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/mac/cat/guide' },
                { text: '常见问题', link: '/tools/mac/cat/faq' },
                { text: '更新日志', link: '/tools/mac/cat/changelog' }
              ]
            },
            {
              text: '拍照学单词',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/mac/word/guide' },
                { text: '常见问题', link: '/tools/mac/word/faq' },
                { text: '更新日志', link: '/tools/mac/word/changelog' }
              ]
            }
          ]
        }
      ],
      '/tools/windows/': [
        {
          text: 'Windows 应用',
          items: [
            {
              text: '小猫补光灯Pro',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/windows/cat-pro/guide' },
                { text: '常见问题', link: '/tools/windows/cat-pro/faq' },
                { text: '更新日志', link: '/tools/windows/cat-pro/changelog' }
              ]
            },
            {
              text: '小猫补光灯',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/windows/cat/guide' },
                { text: '常见问题', link: '/tools/windows/cat/faq' },
                { text: '更新日志', link: '/tools/windows/cat/changelog' }
              ]
            },
            {
              text: '拍照学单词',
              collapsed: false,
              items: [
                { text: '使用教程', link: '/tools/windows/word/guide' },
                { text: '常见问题', link: '/tools/windows/word/faq' },
                { text: '更新日志', link: '/tools/windows/word/changelog' }
              ]
            }
          ]
        }
      ],
      '/sites/': [
        {
          text: '网站导航',
          items: [
            { text: 'AI工具集', link: '/sites/ai-tools' },
            { text: '效率工具', link: '/sites/productivity' },
            { text: '学习资源', link: '/sites/learning' },
          ]
        }
      ],
      '/life/': [
        {
          text: '生活记录',
          items: [
            { text: '数字游民', link: '/life/digital-nomad' },
            { text: '旅行日记', link: '/life/travel' },
            { text: '读书笔记', link: '/life/reading' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github' },
      { icon: 'twitter', link: 'https://twitter.com/your-twitter' }
    ]
  },
  vite: {
    plugins: [
      UnoCSS(unocssConfig)
    ]
  }
})
