'use strict'
const path = require('path'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	baseConfig = require('./base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
	entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: baseConfig.mode === 'production' ? "[name].[chunkhash].js" : "[name].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [baseConfig.mode == 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'public')
            }
          } : 'style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [baseConfig.mode == 'production' ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'public')
            }
          } : 'style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin()
  ]
});
