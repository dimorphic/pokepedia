export function isValidItem(searchQuery, item, sanitize = false) {
  // sanitize
  const keyword = sanitize ? searchQuery.replace(/\\/g, '') : searchQuery;
  const keywordRegexp = new RegExp(keyword, 'ig');

  const itemMainKey = item.text;
  const itemExtraKeys = item.extra || null;

  let itemIsValid = false;

  //
  // Validation for words
  //
  if (keyword.length > 1) {
    // check 'text' key first
    if (keywordRegexp.test(itemMainKey) === true) {
      itemIsValid = true;
    } else {
      if (itemExtraKeys) {
        Object.keys(itemExtraKeys).forEach((key) => {
          if (keywordRegexp.test(itemExtraKeys[key]) === true) {
            itemIsValid = true;
          }
        });
      }
    }
  } else if (keyword.length === 1) {
    // check first letter of text node
    itemIsValid = (itemMainKey.slice(0, 1).toLowerCase() === keyword.toLowerCase());

    // check all body of text node
    // itemIsValid = (keyword !== '' && itemMainKey.indexOf(keyword) !== -1);
  } else {
    // if we don't provide any keywords, we return the valid item
    itemIsValid = true;
  }

  return itemIsValid;
}

export function filterList(searchTerm = null, list = [], sortResults = true) {
  //
  // if widget has no data, don't show anything
  //
  if (!list.length || !searchTerm) {
    return null;
  }

  // sanitize
  const keyword = searchTerm.replace(/\\/g, '');

  // filter list
  let filteredArray = [];

  filteredArray = list.filter((item) => {
    return isValidItem(keyword, item);
  });

  // perform sorting
  if (sortResults) {
    filteredArray = filteredArray.sort();
  }

  return filteredArray;
}
