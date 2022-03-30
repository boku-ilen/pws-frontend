const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        "/tables": {
          target: "http://192.168.0.165:8000"
        }
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
})
