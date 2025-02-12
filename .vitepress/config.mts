import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import unocssConfig from '../unocss.config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "花生.AI",
  description: "AI Native Coder",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],
    socialLinks: []
  },
  vite: {
    plugins: [
      UnoCSS(unocssConfig)
    ]
  }
})
