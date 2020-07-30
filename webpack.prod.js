/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  html: path.resolve(__dirname, 'src/html/pages'),
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
const PAGES = fs.readdirSync(PATHS.html).filter((fileName) => fileName.endsWith('.html'));

module.exports = {
  mode: 'production', // режим сборки
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
    // очистка dist
    new CleanWebpackPlugin({
      verbose: false,
    }),
    // css отдельным файлом
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
    }),
    // собирает все html-файлы из директории src/html/pages
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PATHS.html}/${page}`,
      filename: `./${page}`,
    })
    )
  ],
};
