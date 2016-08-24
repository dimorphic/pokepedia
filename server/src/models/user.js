import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  inventories: [{ type: Schema.Types.ObjectId, ref: 'Inventory' }],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  provider: String,
  meta: {
    age: Number,
  },
  created_at: Date,
  updated_at: Date
});

UserSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;

  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

export default mongoose.model('User', UserSchema);