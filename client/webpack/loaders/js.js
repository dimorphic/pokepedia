export const jsLoader = (config) => {
  // defaults
  const options = Object.assign({
    query: {
      cacheDirectory: true
    }
  }, config);


  return {
    test: /\.js$|.jsx$/,
    loader: 'babel',
    exclude: /node_modules/,
    ...options
  };
};
