import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import 'uno.css'
import './custom.css'
import Giscus from './widgets/Giscus.vue'
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
import WechatShare from './components/WechatShare.vue'
import BilibiliPlayer from './components/BilibiliPlayer.vue'
import DouyinEmbed from '../../frontend/components/DouyinEmbed.vue'
import PackageExecutor from '../../frontend/components/PackageExecutor.vue'
import ThirteenInvitations from '../../frontend/components/ThirteenInvitations.vue'
import MiniVueProgress from '../../components/MiniVueProgress.vue'
import WebSitesShowcase from './components/WebSitesShowcase.vue'
import JenkinsGuide from './components/JenkinsGuide.vue'
import Web3LearningPlan from '../../components/Web3LearningPlan.vue'
import StoreProjectCard from '../../components/StoreProjectCard.vue'

const theme: Theme = {
  extends: DefaultTheme,
  // 包装自定义布局，向 doc-after 槽位注入 Giscus
  Layout: () => h(UnocssLayout, null, { 'doc-after': () => h(Giscus) }),
  enhanceApp({ app }) {
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
    app.component('WechatShare', WechatShare)
    app.component('BilibiliPlayer', BilibiliPlayer)
    app.component('DouyinEmbed', DouyinEmbed)
    app.component('PackageExecutor', PackageExecutor)
    app.component('ThirteenInvitations', ThirteenInvitations)
    app.component('MiniVueProgress', MiniVueProgress)
    app.component('WebSitesShowcase', WebSitesShowcase)
    app.component('JenkinsGuide', JenkinsGuide)
    app.component('Web3LearningPlan', Web3LearningPlan)
    app.component('StoreProjectCard', StoreProjectCard)
  }
}

export default theme
