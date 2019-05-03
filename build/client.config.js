'use strict'
const path = require('path'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	baseConfig = require('./base.config.js');

const HtmlWebpackPlugin = require('html-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(baseConfig, {
	mode: 'development',
	entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: "[name].js",
    publicPath: '/'
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin()
  ]
});
