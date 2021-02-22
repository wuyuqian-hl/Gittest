// module.exports = {
//   devServer: {
//     //配置代理跨域  固定写法
//     proxy: {
//       //  ‘’中间指的是那些请求会触发代理跨域，/ 代表任意请求都会触发
//       '/api': {
//         //target代表的是代理地址，我们要请求的代理地址
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api':'http://localhost:3000'
//         }
//       }
//     }
//   }
// }

module.exports = {
    lintOnSave: false,
    devServer: {
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : 'http://localhost:3000'
        }
      }
    }
  },

}