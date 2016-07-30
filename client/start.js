// deps
require('babel-core/register');
const path = require('path');

// environments
const ENVS = ['development', 'production'];
const ENV = process.env.NODE_ENV; // get env

// webpack config
const webpackConfig = ~ENVS.indexOf(ENV) ? ENV : ENVS[0];
module.exports = require(path.join(__dirname, 'webpack', `webpack.${webpackConfig}`));
