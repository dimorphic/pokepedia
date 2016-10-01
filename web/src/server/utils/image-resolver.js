const { BROWSER, NODE_ENV } = process.env;

// @TODO ?
export default (imagePath) => {
  if (BROWSER) {
    console.warn('`image-resolver` should not be used in browser, something went wrong');
    throw new Error('image-resolver called on browser');
  } else {
    // Load images compiled from `webpack-stats`
    // don't cache the `webpack-stats.json` on dev
    // so we gonna read the file on each request
    // let assets;
    let images;

    if (NODE_ENV === 'development') {
      const fs = require('fs');
      const path = require('path');

      const assets = fs.readFileSync(path.resolve(__dirname, '../../client/webpack-stats.json'));
      images = JSON.parse(assets).app.images;

      // assets = require('client/webpack-stats.json');
      // images = assets.app.images;

      // no cache
      // delete require.cache[require.resolve('client/webpack-stats.json')];
    } else {
      // in PRODUCTION, use simple `require` to cache the file
      images = require('client/webpack-stats.json').app.images;
    }

    console.log('IMAGE RESOLVER ASSETS @ ', images);
    console.log('\n\n');
    // process.exit(0);

    // Find the correct image
    const regex = new RegExp(`${imagePath}$`);
    const image = images.find(img => regex.test(img.original));

    // Serve image.
    if (image) return image.compiled;

    // Serve a not-found asset maybe?
    return '';
  }
};
