// @TODO
// FUTURE MONGO DATABASE helper
//

// deps
import mongoose from 'mongoose';
import Promise from 'bluebird';

// settings
const MONGO_URI = 'mongodb://localhost:27017/pokepedia';

// use promises instead of callbacks
mongoose.Promise = Promise;

// Initialize our database
mongoose.connect(MONGO_URI);

const db = mongoose.connection;
db.on('error', (err) => { console.error(err); });
db.once('open', () => { console.log('DB online @ ', MONGO_URI); });

// Initialize our models
export default {
  connection: db
  // pokemons: db.model('Pokemon', require('../models/Pokemon')),
};
