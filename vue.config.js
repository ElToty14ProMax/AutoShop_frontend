const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Cambia por la URL de tu backend
        changeOrigin: true,
        secure: false
      }
    }
  }
})