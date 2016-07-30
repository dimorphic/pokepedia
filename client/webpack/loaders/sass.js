// deps
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export const sassLoader = (config) => {
  // defaults
  const options = Object.assign({
    extract: false
  }, config);

  // default loader
  let loader = 'style!css!postcss!sass';

  // switch to Extract
  if (options.extract) {
    loader = ExtractTextPlugin.extract('style', 'css!postcss!sass');
  }

  return {
    test: /\.(scss|css)$/,
    loader,
    exclude: /node_modules/
  };
};
