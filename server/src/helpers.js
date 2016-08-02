// deps
import fs from 'fs';
import util from 'util';

//
//
//
function loadData(path) {
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

//
//  object representation / stringify
//
const inspect = (obj, depth = null) => {
  return util.inspect(obj, {
    showHidden: true,
    colors: true,
    depth // go deep!
  });
};

//
//  fill array helper (till Array.fill)
//
const fillArray = (size, item) => {
  return Array.apply(null, Array(size)).map(() => { return item; });
};

// exports
module.exports = {
  inspect,
  fillArray,
  loadData
};
