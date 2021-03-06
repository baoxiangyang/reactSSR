const path = require('path'),
	webpack = require('webpack'),
	nodeExternals = require('webpack-node-externals'),
	merge = require('webpack-merge'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
	entry: './src/server.js',
	target: 'node',
	externals: [nodeExternals()],
	output: {
    // 输出文件名
    filename: 'bundle.js',
    // 输出文件路径
    path: path.resolve(__dirname, '../dist/server'),
    // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
    libraryTarget: 'commonjs2'
	},
	module: {
		rules: [{
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
        }, 'css-loader', {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
    }]
	},
	// 避免路径丢失
  node: {
    __filename: true,
    __dirname: true	
  }
});