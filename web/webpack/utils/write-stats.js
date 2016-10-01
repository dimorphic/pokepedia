// borrowed from https://github.com/gpbl/isomorphic500/blob/master/webpack%2Futils%2Fwrite-stats.js
import fs from 'fs';
import path from 'path';
import debug from 'debug';

// helpers
const imagesRegex = /\.(jpe?g|png|gif|svg)$/;
const STATS_PATH = path.resolve(__dirname, '../../src/client/webpack-stats.json');

//
//  Find compiled images in modules
//  it will be used to map original filename to the compiled one
//  for server side rendering
//
export default function (stats) {
  const publicPath = '/'; // this.options.output.publicPath;
  const json = stats.toJson();

  // get chunks by name and extensions
  function getChunks(name, ext = /.js$/) {
    let chunks = json.assetsByChunkName[name];

    // a chunk could be a string or an array, so make sure it is an array
    if (!(Array.isArray(chunks))) {
      chunks = [chunks];
    }

    return chunks
      .filter(chunk => ext.test(path.extname(chunk))) // filter by extension
      .map(chunk => { return `${publicPath}${chunk}`; }); // add public path to it
  }

  const scripts = {
    app: getChunks('app', /js/),
    vendor: getChunks('vendor', /js/)
  };

  const styles = {
    app: getChunks('app', /css/),
    vendor: getChunks('vendor', /css/)
  };

  // find compiled images
  const images = json.modules
    .filter(module => imagesRegex.test(module.name))
    .map(image => {
      // console.log('img @ ', image);
      return {
        original: image.name,
        compiled: `${publicPath}${image.assets[0]}`
      };
    });

  // write it!
  const content = {
    app: {
      css: styles.app,
      js: scripts.app,
      images
    },

    vendor: {
      css: styles.vendor,
      js: scripts.vendor
    }
  };

  fs.writeFileSync(STATS_PATH, JSON.stringify(content));
  debug('dev:webpack')('`webpack-stats.json` updated');
}
