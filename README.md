# vite_rails_practice
vite_rails项目结构的构建练习, 之前创建的项目是基于国内的服务器, 各种镜像的设置已经让项目无法简单的转移到海外服务器, 所以就新建了一个从头开始.

>## 参考:
>- [Vite Ruby](https://vite-ruby.netlify.app/guide/introduction.html)
>- [Vue](https://cn.vuejs.org/)
>- [Vue Router](https://router.vuejs.org/zh/introduction.html)
>- [Vite](https://cn.vitejs.dev/guide/)
>- [Pug](https://pugjs.org/api/getting-started.html)
>- [rollup-plugin-pug](https://github.com/aMarCruz/rollup-plugin-pug)
>- 

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