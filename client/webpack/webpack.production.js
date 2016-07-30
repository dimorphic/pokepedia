// deps
const common = require('./common');

//
//  PRODUCTION config
//
module.exports = {
  entry: common.entry,
  output: common.createOutput({
    filename: '[name].bundle-[hash].js',
    publicPath: '/'
  }),

  module: {
    loaders: [
      common.LOADERS.jsLoader({ include: common.PATHS.src }),
      common.LOADERS.sassLoader({ extract: true }),
      common.LOADERS.imagesLoader({ name: '[path][name]-[hash].[ext]' }),
      common.LOADERS.htmlLoader()
    ]
  },
  plugins: [
    common.PLUGINS.definePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    common.PLUGINS.noErrorPlugin, // don't build on errors
    common.PLUGINS.occurenceOrderPlugin,
    common.PLUGINS.dedupePlugin,
    common.PLUGINS.uglifyPlugin,

    common.PLUGINS.commonsChunkPlugin({
      name: 'vendor',
      filename: '[name].bundle-[hash].js'
    }),

    common.PLUGINS.cssExtractPlugin('[name].bundle-[hash].css'),
    common.PLUGINS.assetsPlugin(),
    common.PLUGINS.htmlPlugin()
  ],
  postcss: common.PLUGINS.postcss,

  resolve: common.resolve
};
