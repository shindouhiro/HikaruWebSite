import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import 'uno.css'  // 直接从 unocss 导入
import UnocssLayout from './layouts/UnocssLayout.vue'
import ProfileCard from './components/ProfileCard.vue'
import CheckInCalendar from './components/CheckInCalendar.vue'
import LifePage from './components/LifePage.vue'
import BookshelfCard from './components/BookshelfCard.vue'
import RunningChallenge from './components/RunningChallenge.vue'
import ProjectCard from './components/ProjectCard.vue'
import LazyGitGuide from './components/LazyGitGuide.vue'
import YaziGuide from './components/YaziGuide.vue'
import LazyVimGuide from './components/LazyVimGuide.vue'
import RaycastGuide from './components/RaycastGuide.vue'
import ZLibraryGuide from './components/ZLibraryGuide.vue'
import LazyDockerGuide from './components/LazyDockerGuide.vue'
import TmuxGuide from './components/TmuxGuide.vue'
import PhotoCompositionGuide from './components/PhotoCompositionGuide.vue'
import BilibiliVideo from '../../components/BilibiliVideo.vue'
import GitHubActions from './components/GitHubActions.vue'
import './custom.css'

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
    app.component('ProjectCard', ProjectCard)
    app.component('LazyGitGuide', LazyGitGuide)
    app.component('YaziGuide', YaziGuide)
    app.component('LazyVimGuide', LazyVimGuide)
    app.component('RaycastGuide', RaycastGuide)
    app.component('ZLibraryGuide', ZLibraryGuide)
    app.component('LazyDockerGuide', LazyDockerGuide)
    app.component('TmuxGuide', TmuxGuide)
    app.component('PhotoCompositionGuide', PhotoCompositionGuide)
    app.component('BilibiliVideo', BilibiliVideo)
    app.component('GitHubActions', GitHubActions)
  }
}
