/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS = { // переменные для папок разработки и продакшена
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/html/pages'),
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES = fs.readdirSync(PATHS.html).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
  mode: 'development', // режим сборки

  devtool: 'cheap-module-eval-source-map', // для карты стилей

  devServer: { // сервер для разработчика
    contentBase: PATHS.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  entry: `${PATHS.src}/index.js`, // точка входа

  output: {
    filename: 'js/main.js',
    path: `${PATHS.dist}`,
  },

  stats: { // отображение статистики при сборке
    modules: false,
    hash: false,
    children: false,
    version: false,
    builtAt: false,
    warnings: false,
    entrypoints: false,
  },

  module: {
    rules: [
      { // изображения из стилей
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          name: '[name].[ext]',
        },
      },
      { // изображения и файлы из html
        test: /\.html$/i,
        use: ['html-loader'],
      },
      { // шрифты
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts',
        },
      },
      { // javascript
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      { // файлы стилей
        test: /\.(sa|sc)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: false,
            sourceMap: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'resolve-url-loader',
          options: {},
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }
        ],
      }
    ],
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    // css отдельным файлом
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    // собирает все html-файлы из директории src/html/pages
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PATHS.html}/${page}`,
      filename: `./${page}`,
    })
    )
  ],
};
