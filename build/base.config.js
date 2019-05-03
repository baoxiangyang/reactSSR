'use strict'
const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: [{
    BMap: 'window.BMap'
  }],
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
      filename: `styles/[name].css`
    })
  ]
};
