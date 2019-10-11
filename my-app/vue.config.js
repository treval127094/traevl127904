module.exports = {

  devServer: {  //当我们访问别人的接口，发生跨域问题的时候需要这个配置项
      proxy: {
          '/api': {
              target: 'https://m.bmtrip.com',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': ''  
                }
          }
      }
  }
}