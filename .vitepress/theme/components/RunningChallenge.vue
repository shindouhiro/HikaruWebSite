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
          @click="showModal = false"
        >
          <div
            class="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 max-w-lg w-full mx-4 shadow-xl"
            @click.stop
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                第 {{ selectedDay }} 天
              </h3>
              <button
                @click="showModal = false"
                class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <div class="i-carbon-close text-xl" />
              </button>
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
import { ref, onMounted, watch, computed } from "vue";
import { useData } from "vitepress";
import type { RunningRecord, RunningData } from '../types';
import { parsePaceToSeconds, formatSecondsToPace, diffInDays } from '../utils';

// 获取 VitePress 数据
const { site } = useData();

// 弹窗控制
const showModal = ref(false);
const selectedDay = ref(1);

// 打卡数据
const runningData: RunningData = {
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
};

// --- Computed properties ---
const allRecords = computed(() => {
  return Object.entries(runningData).map(([day, data]) => ({
    day: parseInt(day),
    ...data,
  }));
});

const completedRecords = computed(() => {
  return allRecords.value
    .filter((record) => record.completed)
    .sort((a, b) => a.day - b.day);
});

// Stats
const completedDays = computed(() => completedRecords.value.length);

const totalDistance = computed(() => {
  return completedRecords.value
    .reduce((total, record) => {
      return total + (parseFloat(record.distance) || 0);
    }, 0)
    .toFixed(1);
});

const averagePace = computed(() => {
  const validPaces = completedRecords.value.filter((r) => r.pace);
  if (validPaces.length === 0) return "0'00\"";
  const totalSeconds = validPaces.reduce((total, record) => {
    return total + parsePaceToSeconds(record.pace);
  }, 0);
  return formatSecondsToPace(totalSeconds / validPaces.length);
});

const currentStreak = computed(() => {
  if (completedRecords.value.length === 0) return 0;

  const sortedByDate = [...completedRecords.value].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedByDate.length <= 1) return sortedByDate.length;

  let streak = 1;
  for (let i = 0; i < sortedByDate.length - 1; i++) {
    const currentRunDate = new Date(sortedByDate[i].date);
    const previousRunDate = new Date(sortedByDate[i + 1].date);
    if (diffInDays(previousRunDate, currentRunDate) === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
});

const recentRecords = computed(() => {
  return completedRecords.value
    .slice(-5)
    .sort((a, b) => b.day - a.day)
    .map((record: RunningRecord) => ({
      ...record,
      duration: record.duration || "N/A",
    }));
});

// 设置页面标题
const pageTitle = computed(
  () => `100天5km跑步挑战 - 已完成${completedDays.value}天`
);
const updateTitle = () => {
  // 更新浏览器标题
  document.title = `${pageTitle.value} | ${site.value.title}`;
};

// 在组件挂载时更新标题
onMounted(() => {
  updateTitle();
});

// 监听完成天数变化，动态更新标题
watch(
  () => completedDays.value,
  () => {
    updateTitle();
  }
);

// 分享功能
const shareToWeChat = () => {
  // 生成要分享的URL
  const shareUrl = window.location.href;
  const shareTitle = `100天5km跑步挑战,已完成${completedDays.value}天`;
  const shareDesc = `已完成${completedDays.value}天，总距离${totalDistance.value}km！一起来挑战吧！`;

  // 使用原生分享API（如果支持）
  if (navigator.share) {
    navigator.share({
      title: shareTitle,
      text: shareDesc,
      url: shareUrl,
    });
  } else {
    // 如果不支持，则显示二维码或复制链接
    // 这里可以使用第三方库生成二维码
    alert("请长按链接进行分享：" + shareUrl);
  }
};

const shareToWeibo = () => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(
    `我正在参与100天5km跑步挑战！已完成${completedDays.value}天，总距离${totalDistance.value}km！一起来挑战吧！`
  );
  const weiboShareUrl = `http://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareTitle}`;
  window.open(weiboShareUrl, "_blank");
};

// 获取某天的状态
function getDayStatus(day) {
  return runningData[day] || { completed: false };
}

// 显示某天的详情
function showDayDetail(day) {
  selectedDay.value = day;
  showModal.value = true;
}
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
