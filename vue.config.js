const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/stream": {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
