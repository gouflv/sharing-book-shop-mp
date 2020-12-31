# 共读微信小程序

## 安装

全局安装 CLI，基于 [Taro v2.2.9](https://nervjs.github.io/taro/docs/2.x/README)

```
npm install -g @tarojs/cli@2.2.9
```

安装项目依赖，推荐 Yarn

```
yarn install
或
npm install
```

## 本地开发

1. 运行开发模式编译
```
npm run dev:weapp
```
2. 将编译生成的 `dist` 目录导入 微信开发者工具
3. 完成 微信开发者工具 内的相关配置，以及[注意事项](https://nervjs.github.io/taro/docs/2.x/before-dev-remind)
4. 开发
   

## 发布

1. 关闭开发模式编译
2. 运行打包命令
```
npm run build:weapp
```
3. 通过 微信开发者工具 的发布功能完成发布
