const CracoLessPlugin = require('craco-less')
// const path = require('path')
// const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
  // webpack: {
  //   alias: {
  //     '@': resolve('src')
  //   }
  // },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#00965e' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
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
