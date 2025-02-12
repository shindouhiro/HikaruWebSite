import DefaultTheme from 'vitepress/theme'
import 'uno.css'
import ProfileCard from './components/ProfileCard.vue'
import AppCard from './components/AppCard.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 组件注册
    app.component('ProfileCard', ProfileCard)
    app.component('AppCard', AppCard)
  }
}
