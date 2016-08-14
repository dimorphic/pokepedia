// deps
import * as common from './common';

// app global config
import CONFIG from '../config';

// web / dev server settings
const HOST = CONFIG.get('HOST'); // bind on all interfaces (use 'localhost' for privacy)
const PORT = CONFIG.get('PORT');

// Add HMR
common.entry.app.unshift(
  'webpack/hot/dev-server',
	`webpack-dev-server/client?http://${HOST}:${PORT}`
);

//
//  DEVELOPMENT config
//
module.exports = {
  context: common.PATHS.src,

  entry: common.entry,
  output: common.createOutput(),
  devtool: 'cheap-module-source-map',

  devServer: {
    host: HOST,
    port: PORT,

    contentBase: common.PATHS.src,
    historyApiFallback: true,

    hot: true,
    inline: true,
    progress: true,

    stats: {
      colors: true,
      version: false,
      timings: true
    }
  },

  eslint: {
    configFile: '.eslintrc.js',
    quiet: true
    // failOnWarning: false,
    // failOnError: false
  },

  module: {
    preLoaders: [
      {
        test: /\.js$|.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],

    loaders: [
      common.LOADERS.jsLoader({ include: common.PATHS.src }),
      common.LOADERS.sassLoader(),
      common.LOADERS.imagesLoader(),
      common.LOADERS.htmlLoader()
    ]
  },

  plugins: [
    common.PLUGINS.definePlugin(CONFIG.get('globals')),

    common.PLUGINS.hotModulePlugin,
    common.PLUGINS.commonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js'
    }),
    common.PLUGINS.htmlPlugin()
  ],

  resolve: common.resolve,
  postcss: common.PLUGINS.postcss
};
