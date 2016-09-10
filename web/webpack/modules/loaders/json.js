export const jsonLoader = ({ sources }) => ({
  test: /\.json$/,
  loader: 'json',
  include: sources
});
