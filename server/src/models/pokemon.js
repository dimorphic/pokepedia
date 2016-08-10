import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  name: { type: String, default: '', trim: true },
  height: { type: String, default: '', trim: true },
  weight: { type: String, default: '', trim: true },
  candy: { type: String, default: '', trim: true },
  egg: { type: String, default: '', trim: true },
  multipliers: { type: [Number] },
  type: { type: [String] },
  weaknesses: { type: [String] },
  next_evolution: { type: [] },
  prev_evolution: { type: [] },
  pokemonId: { type: String },
});

export default mongoose.model('Pokemon', PokemonSchema);