# vite_rails_practice
vite_rails项目结构的构建练习, 之前创建的项目是基于国内的服务器, 各种镜像的设置已经让项目无法简单的转移到海外服务器, 所以就新建了一个从头开始.

>## 参考:
>- [Vite Ruby](https://vite-ruby.netlify.app/guide/introduction.html)
>- [Vue](https://cn.vuejs.org/)
>- [Vue Router](https://router.vuejs.org/zh/introduction.html)
>- [Vite](https://cn.vitejs.dev/guide/)
>- [Pug](https://pugjs.org/api/getting-started.html)
>- [rollup-plugin-pug](https://github.com/aMarCruz/rollup-plugin-pug)
>- [菜鸟教程-docker](https://www.runoob.com/docker/docker-tutorial.html)

[TOC!]

## Struct Log
### 2022-08-31
```shell
rails new vite_rails  # 构建rails项目
```

Gemfile 添加 `gem "vite_rails"`
```shell
bundle install
bundle exec vite install
# 试运行
bin/vite dev 
```
试着运行但页面打不开

安装vue

```js
//package.json:
"@vitejs/plugin-vue": "^3.0.3"
"vue": "^3.2.38"
```
gem "vite_rails" 默认安装vite v2, 而plugin-vue 和vue的最新版本的对应vite是v3
所以package.json 里 vite的版本手动调到最新
```javascript
//package.json:
"vite":"^3.0.9"
```
之前运行忘记rails了
创建main_controller.rb 修改routes等等, 然后
```shell
bin/rails server
bin/vite dev
```
能进入项目页面了. 虽然在报错,

### 2022-09-01
设定项目需求: 简单的bootpay admin

- 导入vue后创建应用
- 安装typescript `npm install typescript -g`
- `tsc --init` 生成 tsconfig.json 并初始化
- 设置tsconfig.json vie [vitejs](https://vitejs.dev/guide/features.html#typescript)
- `npm init vue@lates` 创建标准的vue项目参考tsconfig.json
- stuck in require not found
### 2022-09-08
- require 使用 'vite-plugin-require-transform' 解决
- 编辑器require报错是因为 tsconfig.json 中设置了 "types" 和 "typeRoots", 明明vite教程里说需要设置这两项..
- rollup-plugin-pug 插件运行时报错. 似乎pug插件需要安装, 但不需要它运行 (为啥?) 所以在配置中添加{ staticPattern: /\b/ }使其无法匹配文件
- `application.slim`里javascript_import 什么的删除, 似乎entrypoint 在vite中控制, 不需要我们动手, 不然会报错
- 这下console干净了
- 创建 Side, Left, 等空白基础组件
- 配置使用`vue-router`

### 2022-09-14
- jquery  需要安装 `@types/jquery`
- 开始tailwind css
### 2022-09-15
- 安装 `sass`, 只需要在`package.json` 里添加 "sass"
- 重新运行本地服务器的时候console报错显示
    ```text
    [vite] server connection lost. polling for restart...
    GET http://127.0.0.1:3036/vite-dev/ net::ERR_CONNECTION_REFUSED
    GET http://127.0.0.1:3036/vite-dev/ net::ERR_CONNECTION_REFUSED
    ...
    ```
  应该是vite-dev服务器没能启动导致找不到本地服务器, 在`config/vite.json`里把`development.port` 更改为3038(或者任意其他)就好了, 估计是端口被占用了.
- tailwindcss 没有效果的原因是在`tailwind.config.js`中, content的配置项里, 匹配路径中不能包含空格🥲
  ```javascript
  module.exports = {
    content: [
        // 这是错误的, "ts, js"之间的空格去掉, 这时候就不要管没不美观了, 毕竟是字符串啊!
        "./app/**/*.{ts, js, pug, vue, jsx, tsx}",
    ]
  }
  ```
- hmr 服务器连接不上的问题还是存在....
### 2022-09-16
- hmr 服务器本地无法连接的问题通过在`vite.config.ts` 中添加 `server.hmr: true` 来暂时解决. 
  但也会显示websocket连接不上反向代理所以fallback的问题.
  不过不影响开发使用, 暂时就这样搁置. 在部署阶段再研究.
- 制作一个简易的menu面板
### 2022-09-19
- docker化,用于开发服务器
- 参考1: https://yeasy.gitbook.io/docker_practice/compose/rails
- foreman manual(third party): https://ddollar.github.io/foreman/#SYSTEMD-EXPORT
### 2022-09-20
- docker化中的一些关键点:
  - `Dockerfile`
    - 安装curl, yarn, 等依赖
    - 设置根目录
    - 复制 Gemfile, package.json, 并 `yarn install` `bundle install`
    - 将本地目录覆盖过来, 创建`/tmp`路径下所需的文件夹, 设置各个路径的权限
    - 末尾运行项目的命令打包到.sh文件里, 因为需要运行多项命令, 而Dockerfile的`CMD`只能运行最后一行
    - .sh里用`foreman start -f Procfile.dev` 来发起项目, 因使用`foreman`做进程守护, 所以`Gemfile`里需要添加`foreman` 
  - `Procfile.dev`
    ```text
    # Procfile.dev
  
    vite: bin/vite dev
    rails: bundle exec puma -C config/docker/development/puma.rb
    web: bin/rails s
    ```
  - `docker-compose.yml`
    - 添加数据卷到镜像路径中, 这样服务器上的代码修改会直接反应到镜像容器中
    - 端口映射, 外部端口10000(任意)映射到内部80端口上
    
### 2022-09-21
- 发现一篇不错的文章, Mark一下: https://5xruby.tw/posts/deploying-your-docker-rails-app
- nginx 配置:
  - 部署结构: 
    - 服务器中运行一个nginx镜像(1)用来接收外部请求, 项目的镜像中再单独运行一个nginx(2)用来接收由(1)转发过来的请求. 
  - 请求过程:
    1. nginx镜像接收请求, 发送到对应项目的镜像打开的端口 
    2. 对应项目镜像中的nginx从镜像公开的端口接收转发过来的请求, 在转发给puma的socket上
    3. 由rails接手
  - 配置摘要
    - 项目内部nginx:
      1. Dockerfile中加入安装nginx的命令 `RUN apt-get install nginx-extras` 
      2. 生成`nginx.conf`和 `site.conf` 
      3. 在build时复制到nginx配置路径:
         ```dockerfile
         COPY ./config/docker/development/nginx.example.conf /etc/nginx/nginx.conf
         COPY ./config/docker/development/site.example.conf /etc/nginx/sites-enabled/site.conf
         RUN rm -f /etc/nginx/sites-enabled/default
         ```
      4. Dockerfile末尾的`CMD`中添加运行nginx命令
         ```dockerfile
         CMD ( nginx -g "daemon off;" & ) && ( ./development-startup.sh )
         ```
      5. docker-compose.yml `service.alfred_admin.ports: - "10000:80"`
        暴露出10000号端口, 映射到自身的80端口上. 这样其他容器将请求发送到10000号端口即可.
        往后在服务器里添加其他项目的镜像可以延续使用叠加端口号, 如: 10001, 10002, ..
    - nginx单独镜像配置
      1. Dockerfile `FROM nginx` 拉取nginx的镜像
      2. 生成要复制到配置路径的文件夹`conf`, 生成`conf/nginx.conf` 和 `conf/sites-enabled/admin.conf`
      3. `nginx.conf`可以使用默认设置, 注意末尾要把`sites-enable/*`路径include进来, 在这里我将镜像build后, 把`/etc/nginx/nginx.conf` 的内容直接复制了过来, 然后添加一些配置
      4. `sites-enabled/admin.conf` 是对应这次项目的配置, 以后添加项目就可以在该路径下继续添加对应conf文件来在服务器里运行多个项目实例.
      5. 将本地的`conf`文件夹复制到镜像的`/etc/nginx`路径 (代码如下)
      6. 获取镜像的本地IP, 映射到host里 (代码如下), 并运行nginx
      ```dockerfile
      ADD ./conf /etc/nginx
      
      CMD ( echo "$(/sbin/ip route|awk '/default/ { print $3 }') vm.host" >> /etc/hosts) && (nginx -g "daemon off;")
      ```
- 需要解决的问题: 
  - `Procfile.dev` 中puma似乎和rails命令重叠 [v](#2022-09-22) 
  - vite-dev 链接出错 [v](#2022-09-22)
### 2022-09-22
- `Procfile.dev` 中尝试删除rails命令, 运行正常. 原因待研究
- `/vite-dev`socket 链接出错解决: vite在客户端会和服务器端构建套接字连接来进行hmr, 通信的地址是`ws://YOUR-IP-OR-DOMAIN/vite-dev`
  所以开发服务器的nginx需要处理该请求
  - 服务器的nginx docker 项目中调整 `sites-enabled/admin.conf`文件
    ```text
    # 将下面的内容添加到 sites-enabled/admin.conf 文件的 server 配置块内部
    
    location ~ ^/vite-dev {
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
        proxy_pass http://alfred_admin;
        break;
    }
    # proxy_pass的转发地址记得修改适配
    ```
  - 重新 `docker compose build`  `docker compose up -d`
### 2022-09-23
- 尝试用域名访问网站(暂时用host映射)
- 尝试alpine镜像
- alpine 切换成功, 但对容量帮助不大, 放弃
### 2022-10-07
- package.json 中 "dependencies" 和 "devDependencies" 在开发自身项目的时候并没有区别. 在开发包或库的时候需要区别对待.