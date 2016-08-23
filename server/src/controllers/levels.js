// deps
import DB from '../helpers/db';

export function all(req, res) {
  const rewards = DB.levels.getAll();

  res.json(rewards);
}

export function getByLevel(req, res) {
  // find level
  const level = req.params.id;
  const findRewards = DB.levels.getById(level);

  res.json(findRewards);
}

export default {
  all,
  getByLevel
};
