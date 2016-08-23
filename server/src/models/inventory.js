import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  pokemon_id: { type: Number },
  cp: { type: Number },
  stamina: { type: Number },
  stamina_max: { type: Number },
  move_1: { type: Number },
  move_2: { type: Number },
  egg_km_walked_target: { type: Number },
  egg_km_walked_start: { type: Number },
  origin: { type: Number },
  height_m: { type: Number },
  weight_kg: { type: Number },
  individual_attack: { type: Number },
  individual_defense: { type: Number },
  individual_stamina: { type: Number },
  cp_multiplier: { type: Number },
  pokeball: { type: Number },
  battles_attacked: { type: Number },
  battles_defended: { type: Number },
  num_upgrades: { type: Number },
  additional_cp_multiplier: { type: Number },
  from_fort: { type: Number },
  favorite: { type: Number },
  deployed_fort_id: { type: String, default: '', trim: true },
  owner_name: { type: String, default: '', trim: true },
  nickname: { type: String, default: '', trim: true },
  is_egg: { type: Boolean },
});

export default mongoose.model('Inventory', InventorySchema);