// base config
const common = require('./common');

// web / dev server settings
const HOST = '0.0.0.0'; // bind on all interfaces (use 'localhost' for privacy)
const PORT = 8080;

// Add HMR
common.entry.unshift(
  'webpack/hot/dev-server',
	`webpack-dev-server/client?http://${HOST}:${PORT}`
);

//
//  DEVELOPMENT config
//
module.exports = {
  // context: common.PATHS.src,

  entry: common.entry,
  output: common.createOutput(),
  devtool: 'cheap-module-source-map',

  devServer: {
    host: HOST,
    port: PORT,

    contentBase: common.PATHS.build,
    historyApIFallback: true,

    hot: true,
    inline: true,
    progress: true,

    stats: {
      colors: true,
      version: false,
      timings: true
    }
  },

  module: {
    loaders: [
      common.LOADERS.jsLoader({ include: common.PATHS.src }),
      common.LOADERS.sassLoader(),
      common.LOADERS.imagesLoader(),
      common.LOADERS.htmlLoader()
    ]
  },

  plugins: [
    common.PLUGINS.definePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

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
