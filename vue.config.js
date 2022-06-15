const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.geojson$/,
          loader: 'json-loader'
        }
      ]
    },
    devServer: {
      proxy: {
        "/tables": {
          target: "http://127.0.0.1:8000"
        }
      },
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
})
