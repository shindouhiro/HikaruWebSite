<template>
  <div class="web3-learning-plan">
    <!-- 头部介绍 -->
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Web3 学习计划
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        系统化学习 Web3 开发，从基础概念到实战项目。12 周完整学习路径，包含打卡功能和进度追踪。
      </p>

      <!-- 总体进度 -->
      <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-2xl mx-auto">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">总体进度</span>
          <span class="text-sm font-medium text-blue-600">{{ overallProgress }}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: overallProgress + '%' }"
          ></div>
        </div>
        <div class="mt-2 text-xs text-gray-600 dark:text-gray-400">
          已完成 {{ completedWeeks }} / 12 周
        </div>
      </div>
    </div>

    <!-- 月份切换标签 -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <button
        v-for="month in months"
        :key="month.id"
        @click="activeMonth = month.id"
        :class="[
          'px-4 py-2 rounded-lg font-medium transition-all duration-200',
          activeMonth === month.id
            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        ]"
      >
        {{ month.name }}
      </button>
    </div>

    <!-- 当前月份的周计划 -->
    <div class="grid gap-6 max-w-4xl mx-auto">
      <div
        v-for="week in currentMonthWeeks"
        :key="week.weekNumber"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      >
        <!-- 周标题 -->
        <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">
                第 {{ week.weekNumber }} 周
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{{ week.title }}</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-medium text-gray-600 dark:text-gray-300">
                {{ week.progress }}% 完成
              </span>
              <button
                @click="toggleWeekCheck(week.weekNumber)"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  week.checked
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                ]"
              >
                {{ week.checked ? '已完成 ✓' : '打卡' }}
              </button>
            </div>
          </div>

          <!-- 周进度条 -->
          <div class="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
              :style="{ width: week.progress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 周内容 -->
        <div class="p-6">
          <!-- 学习目标 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
              <span class="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                <span class="text-blue-600 dark:text-blue-300 text-sm">🎯</span>
              </span>
              学习目标
            </h4>
            <p class="text-gray-600 dark:text-gray-300">{{ week.objective }}</p>
          </div>

          <!-- 学习内容 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span class="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-2">
                <span class="text-purple-600 dark:text-purple-300 text-sm">📚</span>
              </span>
              学习内容
            </h4>
            <ul class="space-y-2">
              <li
                v-for="topic in week.topics"
                :key="topic"
                class="flex items-start"
              >
                <span class="text-green-500 mr-2 mt-1">▸</span>
                <span class="text-gray-600 dark:text-gray-300">{{ topic }}</span>
              </li>
            </ul>
          </div>

          <!-- 练手项目 -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
              <span class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-2">
                <span class="text-green-600 dark:text-green-300 text-sm">💻</span>
              </span>
              练手项目
            </h4>
            <ul class="space-y-2">
              <li
                v-for="project in week.projects"
                :key="project"
                class="flex items-start"
              >
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span class="text-gray-600 dark:text-gray-300">{{ project }}</span>
              </li>
            </ul>
          </div>

          <!-- 学习笔记 -->
          <div class="border-t dark:border-gray-700 pt-4">
            <button
              @click="toggleWeekNotes(week.weekNumber)"
              class="flex items-center justify-between w-full text-left"
            >
              <h4 class="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                <span class="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-2">
                  <span class="text-yellow-600 dark:text-yellow-300 text-sm">📝</span>
                </span>
                学习笔记
              </h4>
              <svg
                class="w-5 h-5 text-gray-500 transition-transform duration-200"
                :class="{ 'rotate-180': week.showNotes }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              v-show="week.showNotes"
              class="mt-4"
            >
              <textarea
                v-model="week.notes"
                @input="saveNotes"
                class="w-full p-3 border dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="在这里记录你的学习笔记..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习建议 -->
    <div class="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl max-w-4xl mx-auto">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <span class="text-2xl mr-2">💡</span>
        学习建议
      </h3>
      <ul class="space-y-3 text-gray-600 dark:text-gray-300">
        <li class="flex items-start">
          <span class="text-blue-500 mr-3 mt-1">•</span>
          <span>每周安排 3~5 天学习，1~2 天动手做项目</span>
        </li>
        <li class="flex items-start">
          <span class="text-purple-500 mr-3 mt-1">•</span>
          <span>多参与社区（Discord、Reddit、Twitter），学习最新技术</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-3 mt-1">•</span>
          <span>遇到不懂的概念，先查官方文档，不要只看教程</span>
        </li>
      </ul>
    </div>

    <!-- 激励语 -->
    <div class="mt-8 text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl max-w-4xl mx-auto">
      <p class="text-lg font-medium text-gray-800 dark:text-white">
        🚀 坚持就是胜利！每一天的进步都在让你成为更好的 Web3 开发者
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

interface Week {
  weekNumber: number
  title: string
  objective: string
  topics: string[]
  projects: string[]
  checked: boolean
  progress: number
  showNotes: boolean
  notes: string
}

interface Month {
  id: number
  name: string
  weeks: number[]
}

const activeMonth = ref(1)

// 学习数据
const learningData = ref<Record<number, Week>>({
  1: {
    weekNumber: 1,
    title: 'Web3 概念与区块链基础',
    objective: '理解 Web3、区块链和加密货币的基本概念',
    topics: [
      'Web3 vs Web2',
      '区块链基础：区块、链、哈希、节点',
      '加密货币与代币',
      '钱包与交易原理'
    ],
    projects: [
      '创建一个 MetaMask 钱包',
      '在测试网获取一些测试币（Faucet）'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  2: {
    weekNumber: 2,
    title: '智能合约入门',
    objective: '理解智能合约及其工作原理',
    topics: [
      '什么是智能合约',
      'Ethereum 与 Solidity 基础语法',
      'Remix IDE 的使用'
    ],
    projects: [
      '写一个简单的智能合约（如 "Hello World" 或计数器）',
      '在 Remix 上编译并部署到测试网'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  3: {
    weekNumber: 3,
    title: 'Solidity 核心语法',
    objective: '掌握 Solidity 的核心语法和数据结构',
    topics: [
      '变量类型、函数、条件语句、数组、映射',
      'ERC 标准（ERC20 / ERC721）',
      '事件与错误处理'
    ],
    projects: [
      '写一个 ERC20 代币智能合约',
      '模拟代币转账'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  4: {
    weekNumber: 4,
    title: '智能合约开发工具',
    objective: '学会使用开发工具进行本地测试和部署',
    topics: [
      'Hardhat / Truffle 框架',
      'Ganache 本地链',
      '单元测试和部署流程'
    ],
    projects: [
      '在本地链部署代币合约',
      '写测试脚本验证功能'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  5: {
    weekNumber: 5,
    title: 'Web3.js / Ethers.js 基础',
    objective: '学会前端与区块链交互',
    topics: [
      'Web3.js 与 Ethers.js 的区别',
      '连接钱包（MetaMask）',
      '查询余额、发送交易'
    ],
    projects: [
      '在 React 页面显示钱包地址和余额',
      '实现简单代币转账功能'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  6: {
    weekNumber: 6,
    title: '前端 DApp',
    objective: '把智能合约功能集成到前端',
    topics: [
      '调用智能合约方法',
      '监听事件',
      '前端状态与交易状态管理'
    ],
    projects: [
      '实现 ERC20 代币转账 DApp',
      '显示交易历史'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  7: {
    weekNumber: 7,
    title: '去中心化存储',
    objective: '了解 DApp 中的去中心化存储方案',
    topics: [
      'IPFS 上传文件与获取 CID',
      'Arweave 简单使用',
      '在智能合约中存储 CID'
    ],
    projects: [
      '上传图片到 IPFS',
      '在合约中记录图片 CID',
      '前端显示图片'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  8: {
    weekNumber: 8,
    title: 'DApp UI 集成与优化',
    objective: '提升前端交互体验',
    topics: [
      '交易确认状态提示',
      '前端钱包连接优化',
      '使用 Web3Modal 或 RainbowKit'
    ],
    projects: [
      '优化代币转账 DApp',
      '支持多钱包连接'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  9: {
    weekNumber: 9,
    title: 'DeFi / NFT 基础',
    objective: '了解 Web3 生态应用',
    topics: [
      'NFT 铸造与交易',
      'DeFi 核心概念：流动性池、借贷、质押'
    ],
    projects: [
      '铸造一个简单 NFT',
      '在测试网转让 NFT'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  10: {
    weekNumber: 10,
    title: 'Layer 2 与优化',
    objective: '学习性能优化与扩展方案',
    topics: [
      'Layer 2 链：Optimism / Arbitrum',
      'Gas 费用优化',
      '跨链概念'
    ],
    projects: [
      '在 Layer 2 测试网上部署 DApp'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  11: {
    weekNumber: 11,
    title: '综合实战项目',
    objective: '综合应用所学技术',
    topics: [
      '项目规划、合约设计、前端交互'
    ],
    projects: [
      '制作一个小型 NFT 市场或投票系统 DApp',
      '包括智能合约 + 前端 + IPFS 图片存储'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  },
  12: {
    weekNumber: 12,
    title: '优化与发布',
    objective: '将 DApp 部署到测试网或主网',
    topics: [
      '合约安全检查',
      '前端打包与部署（Vercel / Netlify）',
      '与社区分享 / GitHub 开源'
    ],
    projects: [
      '完整部署 DApp',
      '在社区或 GitHub 展示项目'
    ],
    checked: false,
    progress: 0,
    showNotes: false,
    notes: ''
  }
})

// 月份定义
const months: Month[] = [
  { id: 1, name: '第 1 个月：基础概念 + 区块链理解', weeks: [1, 2, 3, 4] },
  { id: 2, name: '第 2 个月：Web3 前端开发', weeks: [5, 6, 7, 8] },
  { id: 3, name: '第 3 个月：进阶 Web3 + 实战项目', weeks: [9, 10, 11, 12] }
]

// 计算当前月份的周
const currentMonthWeeks = computed(() => {
  const currentMonth = months.find(m => m.id === activeMonth.value)
  return currentMonth ? currentMonth.weeks.map(weekNum => learningData.value[weekNum]) : []
})

// 计算总体进度
const overallProgress = computed(() => {
  const totalWeeks = Object.keys(learningData.value).length
  const completedWeeks = Object.values(learningData.value).filter(week => week.checked).length
  return Math.round((completedWeeks / totalWeeks) * 100)
})

// 计算已完成的周数
const completedWeeks = computed(() => {
  return Object.values(learningData.value).filter(week => week.checked).length
})

// 切换周打卡状态
const toggleWeekCheck = (weekNumber: number) => {
  const week = learningData.value[weekNumber]
  week.checked = !week.checked
  week.progress = week.checked ? 100 : 0
  saveProgress()
}

// 切换笔记显示
const toggleWeekNotes = (weekNumber: number) => {
  learningData.value[weekNumber].showNotes = !learningData.value[weekNumber].showNotes
}

// 保存进度到 localStorage
const saveProgress = () => {
  const dataToSave = Object.fromEntries(
    Object.entries(learningData.value).map(([key, week]) => [
      key,
      {
        checked: week.checked,
        progress: week.progress,
        notes: week.notes
      }
    ])
  )
  localStorage.setItem('web3-learning-progress', JSON.stringify(dataToSave))
}

// 保存笔记
const saveNotes = () => {
  saveProgress()
}

// 加载保存的进度
const loadProgress = () => {
  const saved = localStorage.getItem('web3-learning-progress')
  if (saved) {
    try {
      const savedData = JSON.parse(saved)
      Object.entries(savedData).forEach(([weekNumber, data]: [string, any]) => {
        const week = learningData.value[parseInt(weekNumber)]
        if (week) {
          week.checked = data.checked || false
          week.progress = data.progress || 0
          week.notes = data.notes || ''
        }
      })
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }
}

onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.web3-learning-plan {
  @apply min-h-screen py-8 px-4;
}

/* 自定义滚动条 */
textarea::-webkit-scrollbar {
  @apply w-2;
}

textarea::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800 rounded;
}

textarea::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500;
}

/* 动画效果 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.web3-learning-plan > div {
  animation: slideIn 0.6s ease-out;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .web3-learning-plan {
    @apply py-4 px-2;
  }

  .grid {
    @apply gap-4;
  }
}
</style>