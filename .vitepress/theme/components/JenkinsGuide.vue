<template>
  <div class="jenkins-guide max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
    <!-- 标题区域 -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
        <i class="i-logos-jenkins text-5xl text-orange-500"></i>
        Jenkins 部署指南
      </h1>
      <p class="text-gray-600 text-lg">完整的Jenkins安装、配置和部署流程</p>
    </div>

    <!-- Docker安装Jenkins -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <i class="i-logos-docker text-3xl text-blue-500"></i>
        Docker安装Jenkins
      </h2>

      <div class="bg-gray-50 rounded-xl p-6 mb-4">
        <h3 class="text-lg font-medium text-gray-700 mb-3">配置docker-compose.yml</h3>
        <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto relative group">
          <!-- 复制按钮 -->
          <button @click="copyDockerComposeConfig"
            class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-1"
            :class="{ 'bg-green-600 text-white': copySuccess }" :title="copySuccess ? '已复制!' : '复制配置'">
            <i v-if="!copySuccess" class="i-carbon-copy text-sm"></i>
            <i v-else class="i-carbon-checkmark text-sm"></i>
            {{ copySuccess ? '已复制' : '复制' }}
          </button>

          <pre class="text-green-400 text-sm"><code>version: "3.8"
services:
  jenkins:
    user: root
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - /var/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
    restart: unless-stopped</code></pre>
        </div>
      </div>

      <div class="grid md:grid-cols-1 gap-2">
        <div class="bg-blue-50 rounded-xl p-4 relative group">
          <h4 class="font-medium text-blue-800 mb-2">启动服务</h4>
          <div class="bg-gray-900 rounded-lg p-4 relative overflow-x-auto">
            <!-- 复制按钮 -->
            <button @click="copyCommand('docker-compose up -d', 'start')"
              class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-1"
              :class="{ 'bg-green-600 text-white': copyStates.start }" :title="copyStates.start ? '已复制!' : '复制命令'">
              <i v-if="!copyStates.start" class="i-carbon-copy text-sm"></i>
              <i v-else class="i-carbon-checkmark text-sm"></i>
              {{ copyStates.start ? '已复制' : '复制' }}
            </button>
            <pre class="text-green-400 text-sm m-0"><code>docker-compose up -d</code></pre>
          </div>
        </div>

        <div class="bg-green-50 rounded-xl p-4 relative group">
          <h4 class="font-medium text-green-800 mb-2">查看初始密码</h4>
          <div class="bg-gray-900 rounded-lg p-4 relative overflow-x-auto">
            <!-- 复制按钮 -->
            <button @click="copyCommand('cat /var/jenkins_home/secrets/initialAdminPassword', 'password')"
              class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-1"
              :class="{ 'bg-green-600 text-white': copyStates.password }"
              :title="copyStates.password ? '已复制!' : '复制命令'">
              <i v-if="!copyStates.password" class="i-carbon-copy text-sm"></i>
              <i v-else class="i-carbon-checkmark text-sm"></i>
              {{ copyStates.password ? '已复制' : '复制' }}
            </button>
            <pre
              class="text-green-400 text-sm m-0"><code>cat /var/jenkins_home/secrets/initialAdminPassword</code></pre>
          </div>
        </div>

        <div class="bg-purple-50 rounded-xl p-4 relative group">
          <h4 class="font-medium text-purple-800 mb-2">访问地址</h4>
          <div class="bg-gray-900 rounded-lg p-4 relative overflow-x-auto">
            <!-- 复制按钮 -->
            <button @click="copyCommand('http://localhost:8080', 'url')"
              class="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-3 py-1 rounded-md text-xs transition-all duration-200 opacity-0 group-hover:opacity-100 flex items-center gap-1"
              :class="{ 'bg-green-600 text-white': copyStates.url }" :title="copyStates.url ? '已复制!' : '复制地址'">
              <i v-if="!copyStates.url" class="i-carbon-copy text-sm"></i>
              <i v-else class="i-carbon-checkmark text-sm"></i>
              {{ copyStates.url ? '已复制' : '复制' }}
            </button>
            <pre class="text-green-400 text-sm m-0"><code>http://localhost:8080</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 飞牛识别 -->
    <section class="mb-8">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 class="text-xl font-semibold mb-3 flex items-center gap-2">
          <i class="i-logos-nginx text-2xl"></i>
          飞牛识别Jenkins
        </h3>
        <img src="https://i0.hdslb.com/bfs/openplatform/236e7b26726f2f1fc0a9cce342c36781f891251d.png@1e_1c.webp"
          alt="飞牛识别Jenkins" class="rounded-lg max-w-full h-auto" />
      </div>
    </section>

    <!-- 安装NodeJS插件 -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <i class="i-logos-nodejs text-3xl text-green-500"></i>
        安装NodeJS插件
      </h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-green-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-green-800 mb-3">安装Node插件</h3>
          <p class="text-green-700 mb-3">系统管理 > 插件管理</p>
          <img src="https://i0.hdslb.com/bfs/openplatform/32119dc1611d6c668f22b53facaa4159cb132804.png@1e_1c.webp"
            alt="安装Node插件" class="rounded-lg max-w-full h-auto" />
        </div>

        <div class="bg-blue-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-blue-800 mb-3">配置Node版本</h3>
          <p class="text-blue-700 mb-3">系统管理 > 全局工具配置</p>
          <img src="https://i0.hdslb.com/bfs/openplatform/9eaa208c675602549f50c72aa7c1911641407c97.png" alt="配置Node版本"
            class="rounded-lg max-w-full h-auto" />
        </div>

        <div class="bg-blue-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-blue-800 mb-3">项目指定Node版本</h3>
          <p class="text-blue-700 mb-3"></p>
          <img src="https://i0.hdslb.com/bfs/openplatform/09f9a1873aec95b9f3d26b88d66bf529c61c0c6c.png"
            alt="配置Node版本" class="rounded-lg max-w-full h-auto" />
        </div>
      </div>
    </section>

    <!-- GitHub Webhook -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <i class="i-logos-github text-3xl text-gray-800"></i>
        GitHub Webhook 触发Jenkins构建
      </h2>
      <div class="bg-gray-50 rounded-xl p-6">
        <img src="https://i0.hdslb.com/bfs/openplatform/8f0fb2a417957e5e6463425d86eedcc231b0434a.png"
          alt="GitHub Webhook触发" class="rounded-lg max-w-full h-auto" />
      </div>
    </section>



    <!-- GitLab Webhook -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <i class="i-logos-gitlab text-3xl text-orange-500"></i>
        GitLab Webhook
      </h2>

      <div class="space-y-6">
        <div class="bg-orange-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-orange-800 mb-3">生成Token</h3>
          <img src="https://i0.hdslb.com/bfs/openplatform/cc79242aaa539cc3d08902365bc6b98f685a803d.png" alt="生成Token"
            class="rounded-lg max-w-full h-auto" />
        </div>

        <div class="bg-blue-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-blue-800 mb-3">配置GitLab Webhook</h3>
          <img src="https://i0.hdslb.com/bfs/openplatform/f3f580af972972f65bc6b3f6bb45c2600de32ea9.png"
            alt="配置GitLab Webhook" class="rounded-lg max-w-full h-auto" />
        </div>


        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            Build Steps
          </h2>
          <div class="bg-gray-50 rounded-xl p-6">
            <img src="https://i0.hdslb.com/bfs/openplatform/3603363befabb295f971385513b8a208e4b6ca81.png"
              alt="GitHub Webhook触发" class="rounded-lg max-w-full h-auto" />
          </div>
        </div>


        <div class="bg-green-50 rounded-xl p-6">
          <h3 class="text-lg font-medium text-green-800 mb-3">提交代码触发构建</h3>
          <img src="https://i0.hdslb.com/bfs/openplatform/c6d3a98da38db31d971a30c8a03d4a6a993906d7.png" alt="Jenkins构建"
            class="rounded-lg max-w-full h-auto" />
        </div>
      </div>
    </section>






    <!-- 快速操作按钮 -->
    <div class="fixed bottom-6 right-6 flex flex-col gap-3">
      <button @click="scrollToTop"
        class="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
        title="回到顶部">
        <i class="i-carbon-arrow-up text-xl"></i>
      </button>

      <button @click="copyDockerCompose"
        class="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
        title="复制Docker配置">
        <i class="i-carbon-copy text-xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const copySuccess = ref(false)
const copyStates = ref({
  start: false,
  password: false,
  url: false
})

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyDockerCompose = async () => {
  const dockerCompose = `version: "3.8"
services:
  jenkins:
    user: root
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - /var/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
    restart: unless-stopped`

  try {
    await navigator.clipboard.writeText(dockerCompose)
    // 这里可以添加一个提示
    alert('Docker配置已复制到剪贴板！')
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const copyDockerComposeConfig = async () => {
  const dockerCompose = `version: "3.8"
services:
  jenkins:
    user: root
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - /var/jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
    restart: unless-stopped`

  try {
    await navigator.clipboard.writeText(dockerCompose)
    copySuccess.value = true

    // 3秒后重置状态
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const copyCommand = async (text: string, type: 'start' | 'password' | 'url') => {
  try {
    await navigator.clipboard.writeText(text)
    copyStates.value[type] = true

    // 3秒后重置状态
    setTimeout(() => {
      copyStates.value[type] = false
    }, 3000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}
</script>

<style scoped>
.jenkins-guide {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 响应式图片 */
img {
  max-width: 100%;
  height: auto;
  border: 1px solid #e5e7eb;
}

/* 代码块样式 */
pre {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', monospace;
  line-height: 1.5;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .jenkins-guide {
    padding: 1rem;
  }

  .fixed {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  .w-12 {
    width: 3rem;
    height: 3rem;
  }
}
</style>
