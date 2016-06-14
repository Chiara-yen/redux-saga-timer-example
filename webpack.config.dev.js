var path = require('path');
var webpack = require('webpack');
var poststylus = require('poststylus');

const SERVER_HOST = 'localhost'
const SERVER_PORT = 3000

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: `http://${SERVER_HOST}:${SERVER_PORT}/static/`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app')
      }, {
        test: /\.styl$/,
        loaders: ['style', 'css?sourceMap', 'stylus?sourceMap'],
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|svg|gif|otf|ttf|woff|eot)$/,
        loaders: ['file'],
        exclude: /node_modules/
      }
    ]
  },
  stylus: {
    use: [ poststylus(['postcss-import', 'rucksack-css', 'autoprefixer']) ]
  },
  port: {
    server: SERVER_PORT
  }
}