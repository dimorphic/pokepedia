// deps
import webpack from 'webpack';
import writeStats from './utils/write-stats';

import ENV_CONFIG from '../config';
import * as common from './common.config';

// helpers
const UTILS = ENV_CONFIG.get('utils');
const PATHS = UTILS.paths;

//
//  PRODUCTION config
//
const WEBPACK_CONFIG = {
  target: 'web',

  entry: common.entry,
  output: common.createOutput({
    filename: '[name].bundle-[hash].js',
    publicPath: '/'
  }),

  module: {
    loaders: [
      common.LOADERS.jsLoader({ include: PATHS.source() }),
      common.LOADERS.sassLoader({ extract: true }),
      common.LOADERS.imagesLoader({ name: '[path][name]-[hash].[ext]' })
      // common.LOADERS.htmlLoader()
    ]
  },
  plugins: [
    common.PLUGINS.definePlugin(ENV_CONFIG.get('globals')),

    common.PLUGINS.noErrorPlugin, // don't build on errors
    common.PLUGINS.occurenceOrderPlugin,
    common.PLUGINS.dedupePlugin,
    common.PLUGINS.uglifyPlugin,

    common.PLUGINS.commonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle-[hash].js',
      minChunks: Infinity
    }),

    common.PLUGINS.cssExtractPlugin('[name].bundle-[hash].css'),
    common.PLUGINS.copyPlugin([
      {
        from: `${PATHS.source()}/assets/`,
        to: 'assets/'
      }
    ]),

    common.PLUGINS.assetsPlugin(),
    // common.PLUGINS.htmlPlugin()

    // write webpack stats
    function () { this.plugin('done', writeStats); }
  ],

  resolve: common.resolve,
  postcss: common.PLUGINS.postcss
};

// webpack(WEBPACK_CONFIG);
module.exports = WEBPACK_CONFIG;
