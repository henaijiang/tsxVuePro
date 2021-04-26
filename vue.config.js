const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    /* 修改入口文件 */
    config
      .entry("app")
      .clear()
      .add("./src/main.ts");

    config.module
      .rule("images")
      .use("url-loader")
      .tap(options =>
        Object.assign({}, options, {
          name: "static/[name]-[hash:8].[ext]",
          fallback: {
            loader: "file-loader",
            options: {
              name: "static/[name]-[hash:8].[ext]"
            }
          }
        })
      );

    config.module
      .rule("svg")
      .use("file-loader")
      .tap(options =>
        Object.assign({}, options, {
          name: "static/[name]-[hash:8].[ext]"
        })
      );

    config.module
      .rule("media")
      .use("url-loader")
      .tap(options =>
        Object.assign({}, options, {
          name: "static/[name]-[hash:8].[ext]",
          fallback: {
            loader: "file-loader",
            options: {
              name: "static/[name]-[hash:8].[ext]"
            }
          }
        })
      );

    config.module
      .rule("fonts")
      .use("url-loader")
      .tap(options =>
        Object.assign({}, options, {
          name: "static/[name]-[hash:8].[ext]",
          fallback: {
            loader: "file-loader",
            options: {
              name: "static/[name]-[hash:8].[ext]"
            }
          }
        })
      );
  },
  configureWebpack: {
    output: {
      filename: "static/[name]-[hash:8].js",
      chunkFilename: "static/[name]-[hash:8].js"
    },
    plugins: [new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" })]
  },
  css: {
    extract: {
      filename: "static/[name]-[hash:8].css",
      chunkFilename: "static/[name]-[hash:8].css"
    }
  },
  devServer: {
    port: 3000,
    proxy: {
      "/login": {
        ws: false,
        target: "http://localhost:3000"
      },
      "/captch": {
        ws: false,
        target: "http://localhost:3000"
      },
      "/logout": {
        ws: false,
        target: "http://localhost:3000"
      },
      "/user": {
        ws: false,
        target: "http://localhost:3000"
      }
    }
  }
};
