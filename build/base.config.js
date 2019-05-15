'use strict'
const path = require('path');
const webpack = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config/index.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = {
  mode: config.isPro ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,// 屏蔽不需要处理的文件（文件夹）
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'public')
            }
          }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'public')
            }
          }, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin({
      filename: config.isPro ? `styles/[name].[chunkhash].css` : `styles/[name].css`
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "port": JSON.stringify(config.port),
        "NODE_ENV": JSON.stringify(config.isPro ? 'production' : 'development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './views/app.html',
      minify: false,
      filename: path.resolve(__dirname, '../dist/views/app.html'),
    }),
  ]
};

//抽离公共代码
if (config.isPro) {
  base.optimization = {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'initial', 
          minSize: 0, 
          minChunks: 2 
        },
        vendor: {
          priority: 1, //权重
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0, //大于0个字节
          minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
        }
      }
    }
  }
}
module.exports = base;