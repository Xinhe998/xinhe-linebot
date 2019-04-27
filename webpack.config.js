const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '!!html-webpack-plugin/lib/loader.js!./index.html',
  filename: 'index.html',
  inject: 'body',
  hash: true,
  // favicon: `${__dirname}/public/favicon.ico`,
  title: 'Xinhe on Line',
});

module.exports = {
  // JavaScript執行的入口
  entry: {
    main: './app.js',
  },
  output: {
    // 將輸出的檔案放到這個資料夾下
    path: path.join(__dirname, 'dist/'),
    // 將所有依賴的模組都合併輸出到這個檔案
    filename: 'index_bundle.js',
    // publicPath: '/',
  },
  mode: 'development',
  node: {
    fs: 'empty',
    net: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(js)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node-modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=1024&name=[sha512:hash:base64:7].[ext]',
      },
    ],
  },
  devtool: 'eval',
  // webpack-dev-server 設定
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), HTMLWebpackPluginConfig],
};
