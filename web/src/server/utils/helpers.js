import util from 'util';

//
//  object representation / stringify
//
export function inspect(obj, depth = null) {
  return util.inspect(obj, {
    showHidden: true,
    colors: true,
    depth // go deep!
  });
}
