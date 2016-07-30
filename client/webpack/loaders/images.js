export const imagesLoader = (query) => {
  const defaultQuery = {
    limit: 8192,
    name: '[path][name].[ext]'
  };

  return {
    test: /\.(png|jpg|svg)$/,
    loader: 'file',
    query: Object.assign(defaultQuery, query),
    exclude: /node_modules/
  };
};
