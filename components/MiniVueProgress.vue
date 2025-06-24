<template>
  <div class="mini-vue-progress">
    <!-- 标题区域 - 添加Vue Logo和GitHub链接 -->
    <div class="project-header">
      <div class="logo-title">
        <div class="i-custom-vue-logo vue-logo"></div>
        <h1>Mini Vue 进度追踪</h1>
      </div>
      <a href="https://github.com/shindouhiro/mini-vue.git" target="_blank" class="github-link">
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

    <!-- 进度卡片网格 -->
    <div class="progress-grid">
      <div v-for="(module, index) in modules" :key="index" 
           class="progress-card" 
           :class="{ 'completed': moduleProgress(module.tasks) === 100 }">
        <div class="card-header">
          <h3>{{ module.title }}</h3>
          <span class="module-progress">{{ moduleProgress(module.tasks) }}%</span>
        </div>
        <div class="task-list">
          <div v-for="(task, taskIndex) in module.tasks" 
               :key="taskIndex" 
               class="task-item"
               :class="{ 'completed': task.completed }">
            <input type="checkbox" 
                   v-model="task.completed"
                   @change="updateProgress" />
            <span>{{ task.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 笔记区域 -->
    <div class="notes-section">
      <h2>学习笔记</h2>
      <div class="note-tabs">
        <button 
          v-for="module in modules" 
          :key="module.title"
          :class="{ active: currentTab === module.title }"
          @click="currentTab = module.title"
        >
          {{ module.title }}
          <span class="tab-progress">{{ moduleProgress(module.tasks) }}%</span>
        </button>
      </div>
      <div class="note-content">
        <div v-for="module in modules" 
             v-show="currentTab === module.title" 
             :key="module.title">
          <div class="note-header">
            <h3>{{ module.title }}实现要点</h3>
            <span class="last-updated" v-if="module.lastUpdated">
              最后更新: {{ formatDate(module.lastUpdated) }}
            </span>
          </div>
          <div class="note-editor">
            <textarea 
              v-model="module.notes" 
              placeholder="在这里记录你的学习笔记..."
              @input="saveNotes"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 模块数据
const modules = ref([
  {
    title: '响应式系统',
    tasks: [
      { name: '实现 reactive', completed: true },
      { name: '实现 effect', completed: true },
      { name: '实现 依赖收集', completed: true },
      { name: '实现 依赖触发', completed: true }
    ],
    notes: '',
    lastUpdated: null
  },
  {
    title: '虚拟DOM',
    tasks: [
      { name: '实现 Virtual DOM', completed: false },
      { name: '实现 mount', completed: false },
      { name: '实现 patch', completed: false },
      { name: '实现 diff算法', completed: false }
    ],
    notes: '',
    lastUpdated: null
  },
  {
    title: '组件系统',
    tasks: [
      { name: '实现 组件挂载', completed: true },
      { name: '实现 组件更新', completed: true },
      { name: '实现 props', completed: true },
      { name: '实现 emit', completed: true }
    ],
    notes: '',
    lastUpdated: null
  },
  {
    title: '编译系统',
    tasks: [
      { name: '实现 parse', completed: false },
      { name: '实现 transform', completed: false },
      { name: '实现 generate', completed: false },
      { name: '实现 compiler-core', completed: false }
    ],
    notes: '',
    lastUpdated: null
  }
])

const currentTab = ref(modules.value[0].title)

// 计算模块完成进度
const moduleProgress = (tasks) => {
  if (!tasks.length) return 0
  const completed = tasks.filter(task => task.completed).length
  return Math.round((completed / tasks.length) * 100)
}

// 计算总体进度
const overallProgress = computed(() => {
  const totalTasks = modules.value.reduce((acc, module) => acc + module.tasks.length, 0)
  const completedTasks = modules.value.reduce((acc, module) => 
    acc + module.tasks.filter(task => task.completed).length, 0)
  return Math.round((completedTasks / totalTasks) * 100)
})

// 更新进度
const updateProgress = () => {
  // 可以在这里添加进度保存到本地存储的逻辑
  localStorage.setItem('mini-vue-progress', JSON.stringify(modules.value))
}

// 保存笔记
const saveNotes = () => {
  const currentModule = modules.value.find(m => m.title === currentTab.value)
  if (currentModule) {
    currentModule.lastUpdated = new Date()
    localStorage.setItem('mini-vue-notes', JSON.stringify(modules.value))
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

// 初始化时加载保存的进度
onMounted(() => {
  const savedProgress = localStorage.getItem('mini-vue-progress')
  const savedNotes = localStorage.getItem('mini-vue-notes')
  
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress)
    modules.value = parsed
  }
  
  if (savedNotes) {
    const parsed = JSON.parse(savedNotes)
    modules.value = modules.value.map(module => {
      const savedModule = parsed.find(m => m.title === module.title)
      return savedModule || module
    })
  }
})
</script>

<style scoped>
.mini-vue-progress {
  padding: 20px;
  max-width: 1200px;
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

.vue-logo {
  width: 40px;
  height: 40px;
  color: #41b883;
}

.logo-title h1 {
  margin: 0;
  font-size: 1.8rem;
  background: linear-gradient(90deg, #41b883, #35495e);
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

/* 总体进度样式优化 */
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
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
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
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
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
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 10px;
  transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: 0 0 8px var(--vp-c-brand-light);
}

/* 卡片网格样式优化 */
.progress-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

/* 卡片样式优化 - 增强层次感和阴影效果 */
.progress-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid rgba(125, 125, 125, 0.1);
  /* 多层次阴影效果 */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.03);
  overflow: hidden;
}

.progress-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--vp-c-brand-light), var(--vp-c-brand));
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.progress-card:hover {
  transform: translateY(-5px);
  /* 悬停时增强阴影效果 */
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.05),
    0 6px 10px rgba(0, 0, 0, 0.03),
    0 12px 24px rgba(0, 0, 0, 0.07);
}

.progress-card:hover::before {
  opacity: 1;
}

.progress-card.completed {
  border: none;
  background: linear-gradient(
    135deg, 
    rgba(var(--vp-c-brand-rgb), 0.05) 0%, 
    rgba(var(--vp-c-brand-rgb), 0.15) 100%
  );
  box-shadow: 
    0 8px 16px rgba(var(--vp-c-brand-rgb), 0.1),
    0 2px 4px rgba(var(--vp-c-brand-rgb), 0.2);
}

.progress-card.completed::before {
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  height: 6px;
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(125, 125, 125, 0.1);
}

.card-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.module-progress {
  font-size: 1.1em;
  color: var(--vp-c-brand);
  font-weight: bold;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  padding: 4px 10px;
  border-radius: 20px;
}

/* 任务列表样式优化 */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: rgba(125, 125, 125, 0.05);
}

.task-item:hover {
  background: rgba(125, 125, 125, 0.1);
  transform: translateX(2px);
}

.task-item.completed {
  background: rgba(var(--vp-c-brand-rgb), 0.08);
}

.task-item.completed span {
  text-decoration: line-through;
  color: var(--vp-c-text-2);
}

.task-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--vp-c-brand);
}

/* 笔记区域样式优化 */
.notes-section {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.02),
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(125, 125, 125, 0.1);
}

.notes-section h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.note-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
}

.note-tabs::-webkit-scrollbar {
  height: 4px;
}

.note-tabs::-webkit-scrollbar-thumb {
  background-color: rgba(125, 125, 125, 0.3);
  border-radius: 4px;
}

.note-tabs button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.note-tabs button:hover {
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  transform: translateY(-1px);
}

.note-tabs button.active {
  background: var(--vp-c-brand);
  color: white;
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-rgb), 0.4);
}

.tab-progress {
  font-size: 0.8em;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 10px;
}

.note-content {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 24px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(125, 125, 125, 0.1);
}

.note-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
  font-weight: 600;
}

.last-updated {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
  background: rgba(125, 125, 125, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
}

.note-editor textarea {
  width: 100%;
  min-height: 220px;
  padding: 16px;
  border: 1px solid rgba(125, 125, 125, 0.2);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  line-height: 1.6;
}

.note-editor textarea:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 
    inset 0 1px 3px rgba(0, 0, 0, 0.05),
    0 0 0 3px rgba(var(--vp-c-brand-rgb), 0.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .github-link {
    align-self: flex-start;
  }
  
  .progress-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .note-tabs {
    flex-wrap: nowrap;
  }
  
  .mini-vue-progress {
    padding: 15px;
  }
  
  .overall-progress,
  .progress-card,
  .notes-section {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .card-header,
  .note-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .module-progress {
    align-self: flex-start;
  }
}
</style>
