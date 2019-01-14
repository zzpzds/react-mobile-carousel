const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const options = {
  entry: {
    index: './test/index.jsx'
  },
  output: {
    path: path.join(__dirname, './test/dist'),
    filename: 'js/[name].js?v=[hash:6]'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [{
      test: /\.(jsx|js)$/,
      exclude: '/node_modules/',
      use: [{
        loader: 'babel-loader',
      }]
    }, {
      test: /\.(css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader',
      options: {
        name: 'img/[name].[ext]?v=[hash:6]'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'test/index.html'),
      chunks: ['index']
    })
  ]
}

module.exports = options