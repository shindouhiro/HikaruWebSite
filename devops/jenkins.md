## Jenkins
## Docker安装Jenkins
+ 配置docker-compose.yml
```bash
version: "3.8"
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
    restart: unless-stopped
```
+ 启动 
```bash
docker-compose up -d
```

+ 查解锁 Jenkins
```bash
cat /var/jenkins_home/secrets/initialAdminPassword
```


+ 飞牛识别了我Jenkins
![](https://i0.hdslb.com/bfs/openplatform/236e7b26726f2f1fc0a9cce342c36781f891251d.png@1e_1c.webp)


## Github webhook 触发jenkins构建
![触发](https://i0.hdslb.com/bfs/openplatform/8f0fb2a417957e5e6463425d86eedcc231b0434a.png)
## 通过中转触发流程
![https://i0.hdslb.com/bfs/openplatform/59b3155a3912b35d6172af586b09f3f1abfebd5f.png](https://i0.hdslb.com/bfs/openplatform/59b3155a3912b35d6172af586b09f3f1abfebd5f.png)


## 安装NodeJs插件
+ 系统管理>插件管理
+ 安装node插件
![](https://i0.hdslb.com/bfs/openplatform/32119dc1611d6c668f22b53facaa4159cb132804.png@1e_1c.webp)

+ 系统管理>全局工具配置
+ 安装指定版本node
![](https://i0.hdslb.com/bfs/openplatform/12f18c1a489ee97dac4924364e75b6749c253a2e.png@1e_1c.webp)

## 配置项目
