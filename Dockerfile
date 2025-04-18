FROM nginx:alpine

# 复制构建好的静态文件到 Nginx 目录
COPY .vitepress/dist /usr/share/nginx/html

# 复制 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 创建证书目录并复制证书文件
RUN mkdir -p /etc/nginx/cert
COPY cert/shindou.icu.pem /etc/nginx/cert/
COPY cert/shindou.icu.key /etc/nginx/cert/

# 设置证书文件权限
RUN chmod 644 /etc/nginx/cert/shindou.icu.pem \
    && chmod 600 /etc/nginx/cert/shindou.icu.key

# 暴露 HTTP 和 HTTPS 端口
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"] 
