// webpack common config
import * as common from './common.config';
import writeStats from './utils/write-stats';

// app global config
import ENV_CONFIG from '../config';

// web / dev server settings
const HOST = ENV_CONFIG.get('HOST'); // bind on all interfaces (use 'localhost' for privacy)
const PORT = ENV_CONFIG.get('PORT');
const PUBLIC_PATH = `http://${HOST}:${PORT}/`;

// Add HMR to entry points
const HMR = `webpack-hot-middleware/client?path=//${HOST}:${PORT}/__webpack_hmr`;
common.entry.app.unshift(HMR);
common.entry.vendor.unshift(HMR);

// function getExternals() {
//   const nodeModules = {};
//
//   fs.readdirSync('node_modules')
//   .filter((x) => {
//     return ['.bin'].indexOf(x) === -1;
//   })
//   .forEach((mod) => {
//     nodeModules[mod] = `commonjs ${mod}`;
//   });
//
//   return nodeModules;
// }

// console.log('EXTERNALS @ ', getExternals());

//
//  DEVELOPMENT config
//
const WEBPACK_CONFIG = {
  // cache: true,

  target: 'web',
  devtool: 'cheap-module-source-map', // 'eval-source-map'

  context: common.PATHS.src,

  entry: common.entry,
  output: common.createOutput({
    publicPath: PUBLIC_PATH,
    libraryTarget: 'var'
  }),

  // externals: getExternals(),

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
      common.LOADERS.jsonLoader({ include: common.PATHS.src }),
      common.LOADERS.sassLoader({ extract: true }),
      common.LOADERS.imagesLoader()
      // common.LOADERS.htmlLoader()
    ]
  },

  plugins: [
    common.PLUGINS.occurenceOrderPlugin,
    common.PLUGINS.hotModulePlugin,
    common.PLUGINS.definePlugin(ENV_CONFIG.get('globals')),
    common.PLUGINS.commonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle.js',
      minChunks: Infinity
    }),
    common.PLUGINS.cssExtractPlugin('[name].bundle.css'),
    // common.PLUGINS.htmlPlugin()

    // write webpack stats
    function () { this.plugin('done', writeStats); }
  ],

  resolve: common.resolve,
  postcss: common.PLUGINS.postcss
};

export default WEBPACK_CONFIG;
