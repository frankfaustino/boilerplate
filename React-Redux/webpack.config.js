const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production' && !process.argv.includes('-p')

// generates HTML file that includes webpack bundles in the body using script tags
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

// creates global constant (when in production)
const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
})

// minifies JS (when in production)
const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  beautify: false,
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true
  },
  comments: false
})

module.exports = {
  devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '/src/index.jsx')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/build')
  },
  mode: dev ? 'development' : 'production',
  plugins: dev
    ? [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()]
    : [HTMLWebpackPluginConfig, DefinePluginConfig, UglifyJsPluginConfig]
}
