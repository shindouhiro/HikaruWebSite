<template>
  <div class="running-wrapper">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1
          class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text text-transparent"
        >
          100天5km跑步挑战
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          每一步都是对自己的突破
        </p>

        <!-- 分享按钮 -->
        <div class="flex justify-center gap-4 mt-4">
          <button
            @click="shareToWeChat"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white transition-all duration-300 hover:scale-105"
          >
            <div class="i-carbon-logo-wechat text-lg" />
            微信分享
          </button>
          <button
            @click="shareToWeibo"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white transition-all duration-300 hover:scale-105"
          >
            <div class="i-carbon-logo-weibo text-lg" />
            微博分享
          </button>
        </div>
      </div>

      <!-- 进度概览 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg mb-6">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 进度条 -->
          <div class="flex-1 space-y-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-600 dark:text-gray-400"
                >挑战进度</span
              >
              <span class="text-sm font-medium text-blue-500"
                >{{ completedDays }}/100天</span
              >
            </div>
            <div
              class="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
              <div
                class="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-500"
                :style="{ width: `${(completedDays / 100) * 100}%` }"
              />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              距离目标还差 {{ 100 - completedDays }} 天
            </p>
          </div>

          <!-- 统计卡片 -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
            <div
              class="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20 dark:border-blue-500/30"
            >
              <div class="text-lg font-bold text-blue-500">
                {{ totalDistance }}
              </div>
              <div>km</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">总里程</div>
            </div>
            <div
              class="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 dark:border-green-500/30"
            >
              <div class="text-lg font-bold text-green-500">
                {{ completedDays }}天
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">已完成</div>
            </div>
            <div
              class="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-purple-500/30"
            >
              <div class="text-lg font-bold text-purple-500">
                {{ currentStreak }}天
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                当前连续
              </div>
            </div>
            <div
              class="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 dark:border-orange-500/30"
            >
              <div class="text-lg font-bold text-orange-500">
                {{ averagePace }}'
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                平均配速
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 打卡日历网格 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg mb-6">
        <h3
          class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2"
        >
          <div class="i-carbon-calendar text-purple-500" />
          100天打卡记录
        </h3>

        <div class="grid grid-cols-10 gap-2">
          <div
            v-for="day in 100"
            :key="day"
            @click="showDayDetail(day)"
            :class="[
              'aspect-square rounded-lg cursor-pointer transition-all duration-300',
              'flex items-center justify-center text-sm font-medium',
              getDayStatus(day).completed
                ? 'bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg hover:scale-105'
                : 'bg-gray-100 dark:bg-[#161B22] hover:bg-gray-200 dark:hover:bg-[#1C2128]',
            ]"
          >
            {{ day }}
          </div>
        </div>
      </div>

      <!-- 最近记录 -->
      <div class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
        <h3
          class="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center gap-2"
        >
          <div class="i-carbon-time text-blue-500" />
          最近记录
        </h3>
        <div class="space-y-4">
          <div
            v-for="record in recentRecords"
            :key="record.date"
            class="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-[#161B22] hover:bg-gray-100 dark:hover:bg-[#1C2128] border border-gray-200/50 dark:border-[#30363D] transition-all duration-300"
          >
            <div
              class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center"
            >
              <span class="text-2xl font-bold text-blue-500">{{
                record.day
              }}</span>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center">
                <h4
                  class="text-lg font-medium text-gray-800 dark:text-gray-200"
                >
                  {{ record.date }}
                </h4>
              </div>
              <div class="mt-2 flex gap-4">
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.distance }}km
                </span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.pace }}/km
                </span>
                <span class="text-sm text-gray-600 dark:text-gray-400">
                  {{ record.duration }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 打卡详情弹窗 -->
      <Transition name="modal-fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto"
          @click="closeModal"
        >
          <div
            class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl"
            @click.stop
          >
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                  第 {{ selectedDay }} 天
                </h3>
                <span 
                  v-if="getDayStatus(selectedDay).completed"
                  class="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full"
                >
                  已完成
                </span>
                <span 
                  v-else
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-full"
                >
                  未完成
                </span>
              </div>
              <div class="flex items-center gap-2">
                <!-- 左箭头 -->
                <button
                  v-if="hasPreviousDay"
                  @click="previousDay"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="上一天"
                >
                  <div class="i-carbon-arrow-left text-xl" />
                </button>
                <!-- 右箭头 -->
                <button
                  v-if="hasNextDay"
                  @click="nextDay"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="下一天"
                >
                  <div class="i-carbon-arrow-right text-xl" />
                </button>
                <!-- 关闭按钮 -->
                <button
                  @click="closeModal"
                  class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <div class="i-carbon-close text-xl" />
                </button>
              </div>
            </div>

            <div v-if="getDayStatus(selectedDay).completed">
              <img
                :src="getDayStatus(selectedDay).image"
                :alt="`Day ${selectedDay}`"
                class="w-full rounded-lg mb-4 mt-2"
                loading="lazy"
              />
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">日期</span>
                  <span class="text-gray-800 dark:text-gray-200">{{
                    getDayStatus(selectedDay).date
                  }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">距离</span>
                  <span class="text-gray-800 dark:text-gray-200"
                    >{{ getDayStatus(selectedDay).distance }}km</span
                  >
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">配速</span>
                  <span class="text-gray-800 dark:text-gray-200"
                    >{{ getDayStatus(selectedDay).pace }}/km</span
                  >
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600 dark:text-gray-400">用时</span>
                  <span class="text-gray-800 dark:text-gray-200">{{
                    getDayStatus(selectedDay).duration
                  }}</span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  {{ getDayStatus(selectedDay).note }}
                </p>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              还未完成这天的跑步打卡
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  useModal, 
  useKeyboard, 
  useShare, 
  usePageTitle, 
  useRunningStats 
} from '../hooks'
import { ref, onMounted } from 'vue'

// 打卡数据
const runningData = {
  1: {
    completed: true,
    date: "2025-03-10",
    distance: "5.0",
    pace: "9'12",
    duration: "47:49",
    image:
      "https://i0.hdslb.com/bfs/article/623a0ceca6c1a0f497b92447bc09199716643837.jpg",
    note: "恢复跑步的第一天",
  },
  2: {
    completed: true,
    date: "2025-04-17",
    distance: "5.0",
    pace: "6'41",
    image:
      "https://i0.hdslb.com/bfs/article/6ec60bef6ce190ca7b9863ce5308978416643837.jpg",
    note: "恢复跑步的第二天",
  },
  3: {
    completed: true,
    date: "2025-04-18",
    distance: "5.0",
    pace: "6'24",
    image:
      "https://i0.hdslb.com/bfs/article/6633f7d2cee57c9e040cabfa10f91ccc16643837.jpg",
    note: "恢复跑步的第三天",
  },
  4: {
    completed: true,
    date: "2025-04-19",
    distance: "5.0",
    pace: "6'22",
    image:
      "https://i0.hdslb.com/bfs/article/06263bfcf438fbbff52c1f225a1229ee16643837.jpg",
    note: "恢复跑步的第四天",
  },
  5: {
    completed: true,
    date: "2025-04-22",
    distance: "5.0",
    pace: "6'20",
    duration: "32:21",
    image:
      "https://i0.hdslb.com/bfs/article/b6a3c7ca2dcdd3006dd6c05c45da457a16643837.jpg",
    note: "恢复跑步的第五天",
  },
  6: {
    completed: true,
    date: "2025-04-23",
    distance: "5.0",
    pace: "6'10",
    duration: "31:03",
    image:
      "https://i0.hdslb.com/bfs/article/74d3358535668cf221fa43e73ad6831916643837.jpg",
    note: "恢复跑步的第六天",
  },
  7: {
    completed: true,
    date: "2025-06-02",
    distance: "5.0",
    pace: "6'14",
    duration: "31:28",
    image:
      "https://i0.hdslb.com/bfs/openplatform/96291e2b14bf96ec1cff87f40716f7adb63939d9.jpg",
    note: "恢复跑步的第七天",
  },
  8: {
    completed: true,
    date: "2025-06-08",
    distance: "5.0",
    pace: "6'36",
    duration: "33:25",
    image:
      "https://i0.hdslb.com/bfs/openplatform/4114c6c8103c3876622dde4046ebeb2c87317375.jpg",
    note: "恢复跑步的第八天",
  },
  9: {
    completed: true,
    date: "2025-06-09",
    distance: "5.0",
    pace: "6'39",
    duration: "33:25",
    image:
      "https://i0.hdslb.com/bfs/openplatform/a8f49ab4defb6e9eb19340f67f26fb80ad4886b5.jpg",
    note: "恢复跑步第九天",
  },
  10: {
    completed: true,
    date: "2025-06-10",
    distance: "5.0",
    pace: "6'55",
    duration: "34:52",
    image:
      "https://i0.hdslb.com/bfs/openplatform/67838a461901ec17209fd7a3c02e97ccf2b70810.jpg",
    note: "恢复跑步第十天",
  },
  11: {
    completed: true,
    date: "2025-06-18",
    distance: "5.0",
    pace: "6'06",
    duration: "30:50",
    image:
      "https://i0.hdslb.com/bfs/openplatform/d399534d7ddd95a3c00ba14a664051021a1e935a.jpg",
    note: "恢复跑步第十一天",
  },
  12: {
    completed: true,
    date: "2025-06-22",
    distance: "5.0",
    pace: "6'00",
    duration: "30:16",
    image:
      "https://i0.hdslb.com/bfs/openplatform/c437d09a274f3e3e9a2861d9bf7fad3bac60cbba.jpg",
    note: "恢复跑步第十二天",
  },
  13: {
    completed: true,
    date: "2025-06-23",
    distance: "5.0",
    pace: "5'55",
    duration: "29:50",
    image:
      "https://i0.hdslb.com/bfs/openplatform/516f9042791c9e1f198201b3d32d1b4926a232f8.jpg",
    note: "恢复跑步第十三天",
  },
  14: {
   completed: true,
   date: "2025-06-24",
   distance: "5.0",
   pace: "6'15",
   duration: "33:34",
   image:
     "https://i0.hdslb.com/bfs/openplatform/8d0c6e5658655076e26816febc8a7fbce8a5ebdf.jpg",
   note: "恢复跑步第十四天",
  },
  15: {
    completed: true,
    date: "2025-06-25",
    distance: "5.0",
    pace: "5'59",
    duration: "30:38",
    image:
      "https://i0.hdslb.com/bfs/openplatform/8001a5f721f5b7b2c6996731c40c318e01449e94.jpg",
    note: "恢复跑步第十五天",
  },
  16:{
    completed: true,
    date: "2025-07-07",
    distance: "5.0",
    pace: "6'10",
    duration: "31:08",
    image:
      "https://i0.hdslb.com/bfs/openplatform/9da1c9dfb13f38bd59fdaf06cb67bb29b5062225.jpg",
    note: "恢复跑步第十六天",
  },
  17: {
    completed: true,
    date: "2025-07-13",
    distance: "5.0",
    pace: "5'52",
    duration: "29:40",
    image:
      "https://i0.hdslb.com/bfs/openplatform/cab814cef255f8c8d7441b0594432074446cec06.jpg",
    note: "恢复跑步第十七天",
  },
  18: {
    completed: true,
    date: "2025-07-22",
    distance: "5.0",
    pace: "5'46",
    duration: "29:04",
    image:
      "https://i0.hdslb.com/bfs/openplatform/f9ffa345dbbd1c4341ad3b2b5086cacfb2579ec6.jpg",
    note: "恢复跑步第十八天",
  },
  19: {
    completed: true,
    date: "2025-07-24",
    distance: "5.0",
    pace: "5'58",
    duration: "30:06",
    image:
      "https://i0.hdslb.com/bfs/openplatform/cd53d35d6e56c692e28e5a63bff68afa3d9758bb.jpg",
    note: "恢复跑步第十九天",
  },
  20: {
    completed: true,
    date: "2025-07-26",
    distance: "5.0",
    pace: "5'43",
    duration: "28:53",
    image:
      "https://i0.hdslb.com/bfs/openplatform/f2c202c5e765950ab15adba48187229599785742.jpg",
  },
  21: {
    completed: true,
    date: "2025-07-29",
    distance: "5.0",
    pace: "5'51",
    duration: "29:28",
    image:
      "https://i0.hdslb.com/bfs/openplatform/c41bd495a03ac086eeefbbc41c1e8f81913c1b61.jpg",
  },
  22: {
    completed: true,
    date: "2025-08-03",
    distance: "5.0",
    pace: "5'55",
    duration: "29:50",
    image:
      "https://i0.hdslb.com/bfs/openplatform/ea427fd47fffe148a7b0db0e91b4f56ae392eb80.jpg",
    note: "恢复跑步第二十二天",
  },
  23: {
    completed: true,
    date: "2025-08-16",
    distance: "5.0",
    pace: "6'01",
    duration: "30:19",
    image:
      "https://i0.hdslb.com/bfs/openplatform/26dc1e0103429c364e41761b3f08d27a5cb76e81.jpg",
  },
}


// 使用hooks
const {
  showModal,
  selectedDay,
  getDayStatus,
  showDayDetail,
  previousDay,
  nextDay,
  hasPreviousDay,
  hasNextDay,
  closeModal
} = useModal(runningData)

const {
  completedDays,
  totalDistance,
  averagePace,
  currentStreak,
  recentRecords
} = useRunningStats(runningData)

const pageUrl = ref('')
onMounted(() => {
  pageUrl.value = window.location.href
})

const { shareToWeChat, shareToWeibo } = useShare({
  completedDays,
  totalDistance,
  pageUrl
})

usePageTitle({ completedDays })

// 键盘事件处理
useKeyboard({
  onArrowLeft: previousDay,
  onArrowRight: nextDay,
  onEscape: closeModal,
  isEnabled: () => showModal.value
})
</script>

<style scoped>
.running-wrapper {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
}

:deep(.VPDoc) {
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.VPDoc .container) {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPContent) {
  padding: 0 !important;
}

:deep(.VPDoc .content) {
  max-width: 100% !important;
  width: 100% !important;
  padding: 0 !important;
  gap: 1rem !important;
}

:deep(.VPDocAside) {
  display: none !important;
}

:deep(.VPDoc h1) {
  display: none;
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.stats-item {
  @apply flex flex-col items-center p-2 rounded-lg bg-white dark:bg-[#1a1a1a] 
         shadow hover:shadow-md transition-all duration-300
         hover:transform hover:-translate-y-0.5;
  min-width: 80px;
}

.title-section {
  padding: 1rem 0;
}

.running-wrapper > * {
  margin-bottom: 1rem;
}

.stats-item:hover span:first-child {
  @apply scale-110 transition-transform duration-300;
}

@keyframes gradient-x {
  0%,
  100% {
    background-size: 200% 100%;
    background-position: left center;
  }
  50% {
    background-position: right center;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
