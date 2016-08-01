//
//  Constants definer
//  @param  {Array} values
//  @return {Object} keys of values
//
export default function defineConstants(values) {
  if (!(values instanceof Array)) {
    throw new TypeError('Need array of values');
  }

  // map values
  const constants = {};

  values.forEach((key) => {
    if (typeof key !== 'string') {
      throw new TypeError('Constant value is not a string');
    }

    // uppercase string
    const value = key.toUpperCase();
    constants[value] = value;
  });

  return constants;
}
