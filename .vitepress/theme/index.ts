import DefaultTheme from 'vitepress/theme'
import 'uno.css'  // 直接从 unocss 导入
import UnocssLayout from './layouts/UnocssLayout.vue'
import ProfileCard from './components/ProfileCard.vue'
import AppCard from './components/AppCard.vue'

export default {
  extends: DefaultTheme,
  Layout: UnocssLayout,
  enhanceApp({ app }) {
    // 组件注册
    app.component('ProfileCard', ProfileCard)
    app.component('AppCard', AppCard)
  }
}
