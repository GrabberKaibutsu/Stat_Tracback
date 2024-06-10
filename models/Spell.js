const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpellSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  school: { type: String, required: true },
  description: { type: String, required: true },
  characterId: { type: Schema.Types.ObjectId, ref: 'Character' },
});

module.exports = mongoose.model('Spell', SpellSchema);