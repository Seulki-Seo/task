const { defineConfig } = require("@vue/cli-service");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
  configureWebpack: {
    mode: "production",
    stats: { warnings: false },
    devtool: false,
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/assets", // 복사할 원본 경로
            to: "assets", // 복사될 대상 경로
          },
        ],
      }),
    ],
  },
});
