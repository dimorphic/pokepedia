// deps
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// paths
const PATHS = require('./common').PATHS;

//
//  DEFINE plugin
//
export const definePlugin = (options) => {
  return new webpack.DefinePlugin(Object.assign({
    // default values
  }, options));
};

//
//  ASSETS JSON plugin
//
export const assetsPlugin = (options) => (
  new AssetsPlugin(Object.assign({
    path: PATHS.build,
    filename: 'assets.json'
  }, options))
);

//
//  HTML plugin
//
export const htmlPlugin = (options) => (
  new HtmlWebpackPlugin(Object.assign({
    // title: 'Katalyst',
    template: `${PATHS.src}/index.html`
  }, options))
);

//
//  CSS plugins
//
export const postcss = [
  autoprefixer({ browsers: ['last 2 versions'] })
];

export const cssExtractPlugin = (options) =>
  new ExtractTextPlugin(options);

//
//  JS related plugins
//
export const noErrorPlugin = new webpack.NoErrorsPlugin();
export const hotModulePlugin = new webpack.HotModuleReplacementPlugin();
export const occurenceOrderPlugin = new webpack.optimize.OccurenceOrderPlugin();
export const dedupePlugin = new webpack.optimize.DedupePlugin();
export const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    drop_console: true,
    warnings: false
  }
});

export const commonsChunkPlugin = (options) =>
  new webpack.optimize.CommonsChunkPlugin(options);
