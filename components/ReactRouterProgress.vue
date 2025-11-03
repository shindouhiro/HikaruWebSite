<template>
  <div class="react-router-progress">
    <!-- 标题区域 - 添加React Logo和GitHub链接 -->
    <div class="project-header">
      <div class="logo-title">
        <div class="i-custom-react-logo react-logo"></div>
        <h1>React Router 6 源码学习进度</h1>
      </div>
      <a href="https://github.com/shindouhiro/mini-react-router.git" target="_blank" class="github-link">
        <div class="i-custom-github-logo github-icon"></div>
        <span>GitHub 仓库</span>
      </a>
    </div>

    <!-- 总体进度 -->
    <div class="overall-progress">
      <div class="progress-text">
        <h2>总体进度</h2>
        <span class="percentage">{{ overallProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${overallProgress}%` }"></div>
      </div>
    </div>

    <!-- 学习章节导航 -->
    <div class="chapter-navigation">
      <h2>📚 学习章节</h2>
      <div class="chapters-grid">
        <div v-for="(chapter, index) in chapters" :key="index"
             class="chapter-card"
             :class="{
               'completed': chapterProgress(chapter.tasks) === 100,
               'current': currentChapter === index
             }">
          <div class="chapter-header">
            <div class="chapter-info">
              <span class="chapter-number">第{{ chapter.number }}章</span>
              <h3>{{ chapter.title }}</h3>
            </div>
            <div class="chapter-meta">
              <span class="difficulty" :class="`difficulty-${chapter.difficulty}`">
                {{ chapter.difficulty }}⭐
              </span>
              <span class="time">{{ chapter.estimatedTime }}</span>
            </div>
          </div>

          <div class="chapter-tasks">
            <div v-for="(task, taskIndex) in chapter.tasks"
                 :key="taskIndex"
                 class="task-item"
                 :class="{ 'completed': task.completed }">
              <input type="checkbox"
                     v-model="task.completed"
                     @change="updateProgress" />
              <span>{{ task.name }}</span>
            </div>
          </div>

          <div class="chapter-actions">
            <div class="progress-indicator">
              <div class="progress-bar-small">
                <div class="progress-fill-small" :style="{ width: `${chapterProgress(chapter.tasks)}%` }"></div>
              </div>
              <span class="progress-text-small">{{ chapterProgress(chapter.tasks) }}%</span>
            </div>

            <a v-if="chapter.link"
               :href="chapter.link"
               class="chapter-link"
               :class="{ 'disabled': chapterProgress(chapter.tasks) < 50 }">
              <span v-if="chapterProgress(chapter.tasks) >= 50">开始学习 →</span>
              <span v-else>完成 {{ Math.ceil(50 - chapterProgress(chapter.tasks)) }}% 解锁</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习笔记区域 -->
    <div class="notes-section">
      <h2>📝 学习笔记</h2>
      <div class="note-tabs">
        <button
          v-for="chapter in chapters"
          :key="chapter.title"
          :class="{ active: currentTab === chapter.title }"
          @click="currentTab = chapter.title"
          :disabled="chapterProgress(chapter.tasks) === 0"
        >
          {{ chapter.title }}
          <span class="tab-progress">{{ chapterProgress(chapter.tasks) }}%</span>
        </button>
      </div>
      <div class="note-content">
        <div v-for="chapter in chapters"
             v-show="currentTab === chapter.title"
             :key="chapter.title">
          <div class="note-header">
            <h3>{{ chapter.title }}学习笔记</h3>
            <div class="note-meta">
              <span class="last-updated" v-if="chapter.lastUpdated">
                最后更新: {{ formatDate(chapter.lastUpdated) }}
              </span>
              <span class="key-points">
                💡 核心要点: {{ chapter.keyPoints.length }}
              </span>
            </div>
          </div>

          <div class="key-points-section" v-if="chapter.keyPoints.length > 0">
            <h4>🎯 核心要点</h4>
            <div class="key-points-list">
              <div v-for="(point, index) in chapter.keyPoints"
                   :key="index"
                   class="key-point-item">
                <input
                  v-model="point.completed"
                  type="checkbox"
                  @change="saveNotes"
                />
                <span>{{ point.text }}</span>
              </div>
            </div>
          </div>

          <div class="note-editor">
            <h4>📖 详细笔记</h4>
            <textarea
              v-model="chapter.notes"
              placeholder="在这里记录你的学习心得、代码示例、遇到的问题等..."
              @input="saveNotes"
            ></textarea>
          </div>

          <div class="code-snippets" v-if="chapter.codeSnippets.length > 0">
            <h4>💻 代码片段</h4>
            <div v-for="(snippet, index) in chapter.codeSnippets"
                 :key="index"
                 class="code-snippet">
              <div class="snippet-header">
                <input
                  v-model="snippet.title"
                  placeholder="片段标题"
                  @input="saveNotes"
                />
                <button @click="removeSnippet(index)" class="remove-btn">删除</button>
              </div>
              <textarea
                v-model="snippet.code"
                placeholder="粘贴代码片段..."
                @input="saveNotes"
                class="code-textarea"
              ></textarea>
            </div>
            <button @click="addSnippet" class="add-snippet-btn">+ 添加代码片段</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习统计 -->
    <div class="statistics-section">
      <h2>📊 学习统计</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-info">
            <span class="stat-number">{{ completedChapters }}/{{ chapters.length }}</span>
            <span class="stat-label">完成章节</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <span class="stat-number">{{ completedTasks }}/{{ totalTasks }}</span>
            <span class="stat-label">完成任务</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⏱️</div>
          <div class="stat-info">
            <span class="stat-number">{{ estimatedTotalTime }}h</span>
            <span class="stat-label">预计总时长</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <span class="stat-number">{{ currentStreak }}天</span>
            <span class="stat-label">连续学习</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 当前章节索引
const currentChapter = ref(0)

// 章节数据
const chapters = ref([
  {
    number: 1,
    title: '实现Routes',
    difficulty: 2,
    estimatedTime: '2小时',
    link: '/frontend/react-router-ch01-routes',
    tasks: [
      { name: '理解路由匹配原理', completed: true },
      { name: '实现基础类型定义', completed: true },
      { name: '创建RouterProvider', completed: true },
      { name: '实现Routes和Route组件', completed: true }
    ],
    keyPoints: [
      { text: '路由匹配是路由系统的核心', completed: true },
      { text: 'React Context用于状态管理', completed: true },
      { text: '浏览器历史API的集成', completed: true }
    ],
    notes: '通过实现基础的Routes组件，我理解了路由匹配的基本原理。关键在于将URL路径与路由配置进行匹配，然后渲染对应的组件。',
    codeSnippets: [
      {
        title: '基础路由匹配函数',
        code: 'function matchRoute(routes, pathname) {\n  for (const route of routes) {\n    if (route.path === pathname) {\n      return route;\n    }\n  }\n  return undefined;\n}'
      }
    ],
    lastUpdated: new Date('2024-01-15')
  },
  {
    number: 2,
    title: '路由切换',
    difficulty: 2,
    estimatedTime: '1.5小时',
    link: '/frontend/react-router-ch02-switching',
    tasks: [
      { name: '实现Link组件', completed: true },
      { name: '实现useNavigate Hook', completed: true },
      { name: '处理浏览器历史', completed: true },
      { name: '添加导航状态管理', completed: true }
    ],
    keyPoints: [
      { text: '声明式vs编程式导航', completed: true },
      { text: '阻止默认浏览器行为', completed: true },
      { text: 'History API的使用', completed: true }
    ],
    notes: '学习了如何实现声明式和编程式导航。关键是要阻止浏览器的默认行为，并使用History API来管理URL变化。',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 3,
    title: '路由渲染',
    difficulty: 3,
    estimatedTime: '2.5小时',
    link: '/frontend/react-router-ch03-rendering',
    tasks: [
      { name: '实现嵌套路由', completed: false },
      { name: '创建Outlet组件', completed: false },
      { name: '实现路由上下文传递', completed: false },
      { name: '支持useRoutes Hook', completed: false }
    ],
    keyPoints: [
      { text: '嵌套路由的实现机制', completed: false },
      { text: 'Outlet组件的作用', completed: false },
      { text: 'Context在路由中的应用', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 4,
    title: '路由匹配与动态切换',
    difficulty: 3,
    estimatedTime: '3小时',
    link: '/frontend/react-router-ch04-matching',
    tasks: [
      { name: '实现高级路由匹配', completed: false },
      { name: '支持动态路由参数', completed: false },
      { name: '实现路由优先级', completed: false },
      { name: '添加通配符支持', completed: false }
    ],
    keyPoints: [
      { text: '动态路由参数处理', completed: false },
      { text: '路由优先级算法', completed: false },
      { text: '正则表达式在路由中的应用', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 5,
    title: '路由守卫',
    difficulty: 4,
    estimatedTime: '2小时',
    link: '/frontend/react-router-ch05-guards',
    tasks: [
      { name: '实现认证守卫', completed: false },
      { name: '创建权限控制系统', completed: false },
      { name: '实现路由拦截', completed: false },
      { name: '添加重定向功能', completed: false }
    ],
    keyPoints: [
      { text: '基于角色的访问控制', completed: false },
      { text: '守卫执行顺序', completed: false },
      { text: '导航拦截机制', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 6,
    title: 'Navigate与useNavigate',
    difficulty: 3,
    estimatedTime: '2小时',
    link: '/frontend/react-router-ch06-navigation',
    tasks: [
      { name: '完善编程式导航', completed: false },
      { name: '实现导航状态管理', completed: false },
      { name: '添加导航拦截', completed: false },
      { name: '支持相对路径导航', completed: false }
    ],
    keyPoints: [
      { text: '导航状态传递', completed: false },
      { text: '相对路径解析', completed: false },
      { text: '导航确认机制', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 7,
    title: '懒加载',
    difficulty: 4,
    estimatedTime: '2.5小时',
    link: '/frontend/react-router-ch07-lazy-loading',
    tasks: [
      { name: '实现代码分割', completed: false },
      { name: '创建LazyRoute组件', completed: false },
      { name: '实现预加载策略', completed: false },
      { name: '添加错误处理', completed: false }
    ],
    keyPoints: [
      { text: 'React.lazy和Suspense', completed: false },
      { text: '预加载策略优化', completed: false },
      { text: '错误边界处理', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  },
  {
    number: 8,
    title: 'Link状态管理',
    difficulty: 3,
    estimatedTime: '2小时',
    link: '/frontend/react-router-ch08-link-state',
    tasks: [
      { name: '实现NavLink组件', completed: false },
      { name: '创建useMatch Hook', completed: false },
      { name: '实现useResolvedPath', completed: false },
      { name: '优化导航交互', completed: false }
    ],
    keyPoints: [
      { text: '路由匹配状态计算', completed: false },
      { text: '路径解析算法', completed: false },
      { text: '动态样式处理', completed: false }
    ],
    notes: '',
    codeSnippets: [],
    lastUpdated: null
  }
])

const currentTab = ref(chapters.value[0].title)

// 计算章节完成进度
const chapterProgress = (tasks) => {
  if (!tasks.length) return 0
  const completed = tasks.filter(task => task.completed).length
  return Math.round((completed / tasks.length) * 100)
}

// 计算总体进度
const overallProgress = computed(() => {
  const totalTasks = chapters.value.reduce((acc, chapter) => acc + chapter.tasks.length, 0)
  const completedTasks = chapters.value.reduce((acc, chapter) =>
    acc + chapter.tasks.filter(task => task.completed).length, 0)
  return Math.round((completedTasks / totalTasks) * 100)
})

// 统计数据
const completedChapters = computed(() =>
  chapters.value.filter(chapter => chapterProgress(chapter.tasks) === 100).length
)

const totalTasks = computed(() =>
  chapters.value.reduce((acc, chapter) => acc + chapter.tasks.length, 0)
)

const completedTasks = computed(() =>
  chapters.value.reduce((acc, chapter) =>
    acc + chapter.tasks.filter(task => task.completed).length, 0)
)

const estimatedTotalTime = computed(() => {
  const times = chapters.value.map(chapter => {
    const match = chapter.estimatedTime.match(/(\d+(\.\d+)?)/)
    return match ? parseFloat(match[1]) : 0
  })
  return times.reduce((acc, time) => acc + time, 0).toFixed(1)
})

const currentStreak = ref(3) // 模拟连续学习天数

// 更新进度
const updateProgress = () => {
  localStorage.setItem('react-router-progress', JSON.stringify(chapters.value))

  // 更新当前章节
  const nextUncompletedChapter = chapters.value.findIndex((chapter, index) =>
    chapterProgress(chapter.tasks) < 100 && index > currentChapter.value
  )
  if (nextUncompletedChapter !== -1) {
    currentChapter.value = nextUncompletedChapter
  }
}

// 保存笔记
const saveNotes = () => {
  const currentChapterData = chapters.value.find(ch => ch.title === currentTab.value)
  if (currentChapterData) {
    currentChapterData.lastUpdated = new Date()
    localStorage.setItem('react-router-notes', JSON.stringify(chapters.value))
  }
}

// 添加代码片段
const addSnippet = () => {
  const currentChapterData = chapters.value.find(ch => ch.title === currentTab.value)
  if (currentChapterData) {
    currentChapterData.codeSnippets.push({
      title: '',
      code: ''
    })
    saveNotes()
  }
}

// 删除代码片段
const removeSnippet = (index) => {
  const currentChapterData = chapters.value.find(ch => ch.title === currentTab.value)
  if (currentChapterData) {
    currentChapterData.codeSnippets.splice(index, 1)
    saveNotes()
  }
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 初始化时加载保存的数据
onMounted(() => {
  const savedProgress = localStorage.getItem('react-router-progress')
  const savedNotes = localStorage.getItem('react-router-notes')

  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    chapters.value = chapters.value.map((chapter, index) => ({
      ...chapter,
      tasks: parsed[index]?.tasks || chapter.tasks
    }))
  }

  if (savedNotes) {
    const parsed = JSON.parse(savedNotes)
    chapters.value = chapters.value.map(chapter => {
      const savedChapter = parsed.find(ch => ch.title === chapter.title)
      return savedChapter ? { ...chapter, ...savedChapter } : chapter
    })
  }

  // 设置当前章节
  const firstIncompleteChapter = chapters.value.findIndex(chapter =>
    chapterProgress(chapter.tasks) < 100
  )
  if (firstIncompleteChapter !== -1) {
    currentChapter.value = firstIncompleteChapter
    currentTab.value = chapters.value[firstIncompleteChapter].title
  }
})
</script>

<style scoped>
.react-router-progress {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* 项目标题区域样式 */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(var(--vp-c-brand-rgb), 0.1);
}

.logo-title {
  display: flex;
  align-items: center;
  gap: 15px;
}

.react-logo {
  width: 40px;
  height: 40px;
  color: #61dafb;
}

.logo-title h1 {
  margin: 0;
  font-size: 1.8rem;
  background: linear-gradient(90deg, #61dafb, #21232a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.github-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #24292e, #1a1e22);
  color: white;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.github-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.github-icon {
  width: 20px;
  height: 20px;
  color: white;
}

/* 总体进度样式 */
.overall-progress {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05),
              0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(125, 125, 125, 0.1);
}

.overall-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand), #61dafb);
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.progress-text h2 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(90deg, var(--vp-c-brand), #61dafb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.percentage {
  font-size: 1.8em;
  font-weight: bold;
  color: var(--vp-c-brand);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 10px;
  background: var(--vp-c-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #61dafb);
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 0 8px #61dafb;
}

/* 章节导航样式 */
.chapter-navigation {
  margin-bottom: 40px;
}

.chapter-navigation h2 {
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.chapter-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(125, 125, 125, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.chapter-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #61dafb, var(--vp-c-brand));
  opacity: 0.7;
}

.chapter-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.chapter-card.completed {
  background: linear-gradient(135deg, rgba(97, 218, 251, 0.05) 0%, rgba(var(--vp-c-brand-rgb), 0.05) 100%);
}

.chapter-card.completed::before {
  height: 6px;
  opacity: 1;
}

.chapter-card.current {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-rgb), 0.2);
}

.chapter-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.chapter-info {
  flex: 1;
}

.chapter-number {
  display: inline-block;
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8em;
  font-weight: 600;
  margin-bottom: 8px;
}

.chapter-info h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.chapter-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.difficulty {
  font-size: 0.9em;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}

.difficulty-2 { background: #28a745; color: white; }
.difficulty-3 { background: #ffc107; color: black; }
.difficulty-4 { background: #dc3545; color: white; }

.time {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  background: rgba(125, 125, 125, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
}

.chapter-tasks {
  margin-bottom: 20px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: rgba(125, 125, 125, 0.05);
  transition: all 0.2s ease;
}

.task-item:hover {
  background: rgba(125, 125, 125, 0.1);
}

.task-item.completed {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
}

.task-item.completed span {
  text-decoration: line-through;
  color: var(--vp-c-text-2);
}

.task-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--vp-c-brand);
}

.chapter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-indicator {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.progress-bar-small {
  flex: 1;
  height: 6px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), #61dafb);
  transition: width 0.3s ease;
}

.progress-text-small {
  font-size: 0.85em;
  font-weight: 600;
  color: var(--vp-c-brand);
  min-width: 40px;
}

.chapter-link {
  background: var(--vp-c-brand);
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.chapter-link:hover:not(.disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.chapter-link.disabled {
  background: var(--vp-c-text-3);
  cursor: not-allowed;
  opacity: 0.6;
}

/* 笔记区域样式 */
.notes-section {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.notes-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: var(--vp-c-text-1);
}

.note-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.note-tabs button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.note-tabs button:hover:not(:disabled) {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
}

.note-tabs button.active {
  background: var(--vp-c-brand);
  color: white;
}

.note-tabs button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab-progress {
  font-size: 0.8em;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
}

.note-content {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 24px;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(125, 125, 125, 0.1);
}

.note-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.note-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.last-updated, .key-points {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  background: rgba(125, 125, 125, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.key-points-section {
  margin-bottom: 24px;
}

.key-points-section h4 {
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.key-points-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.key-point-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(125, 125, 125, 0.05);
  border-radius: 6px;
}

.key-point-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--vp-c-brand);
}

.note-editor h4 {
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.note-editor textarea {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 1px solid rgba(125, 125, 125, 0.2);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;
}

.note-editor textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.code-snippets {
  margin-top: 24px;
}

.code-snippets h4 {
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.code-snippet {
  margin-bottom: 16px;
  border: 1px solid rgba(125, 125, 125, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.snippet-header {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: rgba(125, 125, 125, 0.05);
  border-bottom: 1px solid rgba(125, 125, 125, 0.2);
}

.snippet-header input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid rgba(125, 125, 125, 0.2);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.remove-btn {
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85em;
}

.remove-btn:hover {
  background: #c82333;
}

.code-textarea {
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.9em;
  resize: vertical;
}

.add-snippet-btn {
  padding: 10px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.add-snippet-btn:hover {
  background: var(--vp-c-brand-dark);
}

/* 统计区域样式 */
.statistics-section {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.statistics-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.stat-card {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  border-radius: 12px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .chapters-grid {
    grid-template-columns: 1fr;
  }

  .chapter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .chapter-meta {
    align-items: flex-start;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .react-router-progress {
    padding: 15px;
  }

  .chapter-actions {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .note-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>