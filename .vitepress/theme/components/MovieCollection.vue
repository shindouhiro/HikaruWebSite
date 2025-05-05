<template>
  <div class="movie-collection">
    <div class="max-w-[1600px] mx-auto px-4 py-8">
      <!-- 页面标题 -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 
                   bg-clip-text text-transparent">
          我的观影记录
        </h1>
        <p class="mt-2 text-gray-600 dark:text-gray-400">记录每一部精彩电影</p>
      </div>

      <!-- 电影分类标签 -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button v-for="category in categories" 
                :key="category"
                @click="currentCategory = category"
                :class="[
                  'px-4 py-2 rounded-full text-sm transition-all duration-300',
                  currentCategory === category ? 
                    'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' :
                    'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]">
          {{ category }}
        </button>
      </div>

      <!-- 电影网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="movie in filteredMovies" 
             :key="movie.id"
             class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                    hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <!-- 电影封面 -->
          <div class="relative aspect-[2/3] overflow-hidden">
            <img :src="movie.poster" 
                 :alt="movie.title"
                 class="w-full h-full object-cover transition-transform duration-300 
                        group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        flex items-end p-4">
              <div class="text-white">
                <div class="font-bold">{{ movie.title }}</div>
                <div class="text-sm opacity-80">{{ movie.year }}</div>
              </div>
            </div>
          </div>
          
          <!-- 电影信息 -->
          <div class="p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <div class="font-medium text-gray-900 dark:text-gray-100">{{ movie.title }}</div>
                <div class="text-xs text-gray-500 mt-1">观看于 {{ movie.watchDate }}</div>
              </div>
              <div class="flex items-center">
                <div class="i-carbon-star-filled text-yellow-500" />
                <span class="ml-1 text-sm">{{ movie.rating }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{{ movie.summary }}</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="tag in movie.tags" 
                    :key="tag"
                    class="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700
                           text-gray-600 dark:text-gray-400">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// 电影分类
const categories = ['全部', '动作', '剧情', '科幻', '喜剧', '动画','家庭','悬疑',]
const currentCategory = ref('全部')

// 电影数据
const movies = [
 {
  id: 1,
  title: '流水落花',
  year: 2023,
  watchDate: '准备观看',
  category: '家庭',
  rating: 7.2,
  summary: '一群离别原生家庭的小孩子，经莫姑娘（谈善言 饰）安排下，遇上天美姨姨（郑秀文 饰）和彬叔叔（陆骏光 饰）这个短暂的幸福中途站，天美姨姨亦因此经历十三年来从聚合到分离；遇上每一个孩子，他们却又再要分散，感受到喜悦也要经历分离的痛。',
  tags: ['剧情', '家庭' , '儿童'],
  poster: 'https://i0.hdslb.com/bfs/article/604e0725ab755cf15ecb9b9a63fe934c16643837.png'
 },
 {
  id: 2,
  title: '沙尘暴',
  year: 2025,
  watchDate: '2025-04-17',
  category: '悬疑',
  rating: 8.1,
  summary: '一桩焚尸旧案被重查，基层民警陈江河（段奕宏 饰）也被紧急调回。当他再次进入小城，搅局的骗子、撒谎的真凶、复仇的牺牲者，犹如一场沙尘暴将他笼罩其中。但他坚信罪恶皆有源，再大的风暴也终会平息，天地总会恢复澄澈。',
  tags:  ['剧情' ,'悬疑' ,'犯罪'],
  poster: 'https://i0.hdslb.com/bfs/article/c25c538a4191abaf7001d72b69817f5c16643837.png'
 },
 {
  id: 3,
  title: '年少日记',
  year: 2024,
  watchDate: '2025-04-19',
  category: '家庭',
  rating: 8.4,
  summary: '一封没署名的遗书、一群看似无恙的学生，让中学老师郑Sir（卢镇业 饰）想起充满暴力与遗憾的童年往事。他亦面对妻子离别、父亲病危，同时必须找出企图轻生的同学，阻止悲剧重现',
  tags: ['剧情', '家庭'],
  poster: 'https://i0.hdslb.com/bfs/article/94b04596433eec2735c5b59cd847dfa116643837.png'
 },
 {
  id: 4,
  title: '破地狱',
  year: 2024,
  watchDate: '2025-04-19',
  category: '家庭',
  rating: 8.4,
  summary: '婚礼策划师道生（黄子华 饰）因婚礼市场萧条而债台高筑，被迫改行成为葬礼经纪人。红白二事大相径庭，令道生处处碰壁，但最难一关是要得到喃呒师傅文哥（许冠文 饰）的认可。起初因为理念不合，道生与文哥冲突不断，两人的关系岌岌可危。但数次危难时刻文哥的出手相助，以及亲历文哥与女儿文玥（卫诗雅 饰）的相处点滴，道生与文哥之间的心结慢慢解开，也逐渐悟到“破地狱”的真正意义。',
  tags: ['剧情', '家庭'],
  poster: 'https://i0.hdslb.com/bfs/article/c31ff978e4b659ddee56573cf105ccd316643837.png'
 },{
  id: 5,
  title: '倩女幽魂',
  year: 1987,
  watchDate: '2025-04-24',
  category: '爱情',
  rating: 8.8,
  summary: '荒郊中的兰若寺频频有人丧命，身无分文的书生宁采臣（张国荣 饰）不顾道士燕赤霞（午马 饰）的反对借宿在此。深夜，宁采臣邂逅女鬼聂小倩（王祖贤 饰），却不料小倩突露杀机，宁采臣的正直、善良打动了小倩，两人展开了一场旷世人鬼绝恋。此事被掌控着小倩的千年树妖姥姥（刘兆铭 饰）发现，欲将小倩许配给黑山老妖。一边是姥姥的威逼利诱，一边是赤诚书生的情义初起，小倩陷入两难选择……',
  tags: ['古装','武侠','爱情','奇幻 '],
  poster: 'https://i0.hdslb.com/bfs/article/2136cd0550900ca772e39be08b4b76e816643837.png'
 },{
  id: 6,
  title: '无尽的尽头',
  year: 2025,
  watchDate: '2025-05-05',
  category: '家庭',
  rating: 'undefined',
  summary: '聚焦未成年人司法保护，讲述了未成年人检察小组初创，检察官林之桃与助理检察员白恩宇，为了孩子们，携手对抗人性之恶的故事。',
  tags: ['剧情','犯罪'],
  poster: 'https://i0.hdslb.com/bfs/openplatform/b596351eb824d85f2fd91a1561b58caee58d13ac.png'
 }

]

// 根据分类筛选电影
const filteredMovies = computed(() => {
  if (currentCategory.value === '全部') return movies
  return movies.filter(movie => movie.category === currentCategory.value)
})
</script>

<style scoped>
.movie-collection {
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
</style> 
