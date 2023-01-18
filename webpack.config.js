const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './app.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    port: 8000
  }
}

/**
 *   
 * "devDependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^11.0.0",
    "css-loader": "^6.7.3",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.11.1"
  },
 */