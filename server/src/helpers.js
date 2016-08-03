// deps
import fs from 'fs';
import util from 'util';

// rename object properties
function renameProp(obj = {}, oldName = null, newName = null) {
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
  loadData,
  renameProp
};
