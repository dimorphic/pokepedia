// deps
import fs from 'fs';
import request from 'request';
import tracer from 'tracer';
import url from 'url';
import util from 'util';

//
//	BETTER CONSOLE LOG helper
//
export const logger = tracer.colorConsole({
  dateformat: '[HH:MM:ss.L]',
  format: [
    // default format
    '{{timestamp}} [{{title}}] {{message}} [{{file}}:{{line}}]',

		// error format
    { error: '{{timestamp}} <{{title}}> {{message}} [in {{file}}:{{line}}]\nCall Stack:\n{{stack}}' }
  ],

  preprocess: (data) => {
    data.title = data.title.toUpperCase();
  }
});

//
//	Get URI file name helper
//
export const getFileName = (uri) => {
    var fileName = url.parse(uri).pathname.split('/').pop().split('?').shift();
    return fileName;
};

//
//	Download helper
//
export const downloadFile = (uri, filename, callback) => {
  logger.log('DOWNLOAD @ ', uri);

  const stream = request.get(uri);

  stream
    .on('error', (downloadError) => {
      // console.log(downloadError);
      callback(downloadError, filename);
      return void 0;
    })
    .on('response', (response) => {
      // console.log('Response status: ', response.statusCode); // 200
      // console.log('Response headers:', response.headers['content-type']); // 'image/png'
    })
    .pipe(
      fs.createWriteStream(filename).on('error', (writeError) => {
        callback(writeError, filename);
        // stream.read();
      })
    )
    .on('close', () => {
      callback(null, filename);
    });
}

// rename object properties
export const renameProp = (obj = {}, oldName = null, newName = null) => {
  // console.log(`Renaming ${oldName} -> ${newName}`);

  // Do nothing if the names are the same
  if (oldName == newName) {
    // console.log('Rename abort. Same names');
    return obj;
  }

  // Check for the old property name to
  // avoid a ReferenceError in strict mode.
  const hasProp = {}.hasOwnProperty.call(obj, oldName);

  if (hasProp) {
    obj[newName] = obj[oldName];
    delete obj[oldName];
  }

  return obj;
}

//
// @TODO: ??
//
export const loadData = (path) => {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

//
//  object representation / stringify
//
export const inspect = (obj, depth = null) => {
  return util.inspect(obj, {
    showHidden: true,
    colors: true,
    depth // go deep!
  });
};

//
//  fill array helper (till Array.fill)
//
export const fillArray = (size, item) => {
  return Array.apply(null, Array(size)).map(() => { return item; });
};

// exports
// module.exports = {
//   logger,
//   inspect,
//   fillArray,
//   loadData,
//   renameProp,
//   download
// };
