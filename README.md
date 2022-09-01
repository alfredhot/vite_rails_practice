# vite_rails_practice
vite_rails项目结构的构建练习, 之前创建的项目是基于国内的服务器, 各种镜像的设置已经让项目无法简单的转移到海外服务器, 所以就新建了一个从头开始.

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

package.json:
```json
{
    ...
    "@vitejs/plugin-vue" "^3.0.3"
    "vue": "^3.2.38"
}
```
gem "vite_rails" 默认安装vite v2, 而plugin-vue 和vue的最新版本的对应vite是v3
所以package.json 里 vite的版本手动调到最新

package.json:
```json
{
  ...
  "vite":"^3.0.9"
}
```
之前运行忘记rails了
创建main_controller.rb 修改routes等等, 然后
```shell
bin/rails server
bin/vite dev
```
能进入项目页面了. 虽然在报错,
