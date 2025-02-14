import DefaultTheme from 'vitepress/theme'
import 'uno.css'  // 直接从 unocss 导入
import UnocssLayout from './layouts/UnocssLayout.vue'
import ProfileCard from './components/ProfileCard.vue'
import CheckInCalendar from './components/CheckInCalendar.vue'
import LifePage from './components/LifePage.vue'
import BookshelfCard from './components/BookshelfCard.vue'
import RunningChallenge from './components/RunningChallenge.vue'

export default {
  extends: DefaultTheme,
  Layout: UnocssLayout,
  enhanceApp({ app }) {
    // 组件注册
    app.component('ProfileCard', ProfileCard)
    app.component('CheckInCalendar', CheckInCalendar)
    app.component('LifePage', LifePage)
    app.component('BookshelfCard', BookshelfCard)
    app.component('RunningChallenge', RunningChallenge)
  }
}
