// deps
import DB from '../helpers/db';

export function all(req, res) {
  const items = DB.items.getAll();

  res.json(items);
}

export function getById(req, res) {
  // find pokemon
  const itemId = req.params.id;
  const findItem = DB.items.getById(itemId);

  res.json(findItem);
}

export default { all, getById };
