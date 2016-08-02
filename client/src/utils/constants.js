//
//  Constants definer
//  @param  {Array} values
//  @return {Object} keys of values
//
export default function createConstants(...constants) {
  return constants.reduce((acc, constant) => {
    if (typeof constant !== 'string') {
      throw new TypeError('Constant value is not a string');
    }

    // always uppercase
    const value = constant.toUpperCase();
    acc[value] = value;

    return acc;
  }, {});
}
