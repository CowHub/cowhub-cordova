const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const ENV = require('./env');
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'www'),
};

process.env.BABEL_ENV = ENV;

const common = {
  entry: PATHS.src,
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.(css|scss)$/,
    loader: 'style!css!'
  },
  {
    test: /\.styl$/,
    loader: 'style!css!stylus?paths=node_modules'
  },
  {
    test: /\.js$/,
    loader: 'babel',
    query: {
      'presets': ['es2015', 'stage-2', 'react'],
      'plugins': ['react-hot-loader/babel']
    },
    exclude: path.join(__dirname, 'node_modules')
  }
]
  }
};

if (ENV === 'development') {
  module.exports = merge(common, {
    devServer: {
      contentBase: PATHS.build,

      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
} else {
  // config can be added here for minifying / etc
  module.exports = merge(common, {});
}
