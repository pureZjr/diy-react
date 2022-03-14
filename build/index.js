const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash:6].bundle.js',
  },
  devServer: {
    port: 9999,
    compress: true,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, '../public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'diy-react',
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
