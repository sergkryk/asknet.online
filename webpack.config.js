const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = process.env.NODE_ENV;

// multiple html pages
let htmlPages = ["index", "about", "user", "news", "tariffs"];
// news pages
let newsPages = ["iptv"];

module.exports = {
  mode: mode,
  entry: htmlPages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: (pathData) => {
      const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
      return `${filepath}/[name][ext][query]`;
    },
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: false,
    hot: true,
  },
  optimization: {
    runtimeChunk: "single",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: 
  [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    ...htmlPages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/${page}.html`,
          filename: `${page}.html`,
          chunks: ["index", page],
        })
    ),
    ...newsPages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./src/news/${page}.html`,
          filename: `./news/${page}.html`,
          chunks: ["index", page],
        })
    )
  ]
};
