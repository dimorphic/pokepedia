// deps
import { Router } from 'express';
import { inspect } from '../helpers';

// app router
const router = Router();

router.get('/', (req, res, next) => {
  res.end('lolzz');
});

router.get('/update', (req, res, next) => {
  // reload JSON data
  req.db.reload();

  // notify
  res.end(`<pre>${JSON.stringify(req.db.data)}</pre>`);

  console.log('\n>> NEW JSON DATA:\n');
  console.log(inspect(req.db.data));
  console.log(' ');
});

export default router;
