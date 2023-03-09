tsconfig.json

```json
baseUrl: './src'  // 绝对路径会去src目录下寻找文件
```

配置格式化工具
npm install --exact prettier -D
创建.prettierrc.json
创建.prettierignore 不需要格式化的文件

借助 pre-commit-hook 实现代码自动格式化
npx mrm lint-staged 安装失败
报错：Preset “default” not found.
We’ve tried to load “mrm-preset-default” and “default” npm packages.
解决： npx mrm@2 lint-staged

prettier 与 eslint 会冲突
安装 npm install eslint-config-prettier -D

使用 prettier

- vscode 插件市场安装 prettier 选择安装量最多的那个
- 创建.prettierrc 文件，支持 json 格式
- vscode 的配置分为用户和工作区，用户区代表配置后所有项目都会延用你的配置，工作区则是对当前的项目生效。推荐工作区中配置 format on save， 然后 vscode 会生成一个.vscode 目录。里面的 setting.json 是对当前项目的 format 配置
- 如上配置后不能自动格式化代码，或者对 ts 文件不能格式化，请进行如下配置

```json
"editor.formatOnSave": true,
"editor.fontLigatures": false,
"editor.defaultFormatter": "esbenp.prettier-vscode"
```

安装 ts-node 解决找不到 ts/tsx 文件的错误

使用 craco 配置 webpack
npm install @craco/craco -S

根目录创建 craco.config.js

```js
// const path = require('path')
// const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  // webpack: {
  //   alias: {
  //     '@': resolve('src')
  //   }
  // },
  devServer: {
    port: 7890,
    proxy: {
      '/api': {
        // target: 'https://placeholder.com/',
        // changeOrigin: true,
        // secure: false,
        // xfwd: false,
        target: 'http://localhost:3008',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
}
```

使用 css-in-js
npm install @emotion/react @emotion/styled

注意：antd table 组件需要指定 rowKey

使用 react-router
npm install react-router@6.0.0-beta.0 react-router-dom6.0.0-beta.0
beta.4 有问题
