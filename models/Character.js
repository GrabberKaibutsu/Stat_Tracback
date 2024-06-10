const mongoose = require('mongoose');
const { Schema } = mongoose;

const CharacterSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User4', required: true },
    playerName: { type: String, required: true },
    characterName: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    level: { type: Number, required: true },
    background: { type: String },
    alignment: { type: String },
    experiencePoints: { type: Number },
    description: { type: String },
    strength: { type: Number },
    dexterity: { type: Number },
    constitution: { type: Number },
    intelligence: { type: Number },
    wisdom: { type: Number },
    charisma: { type: Number },
    weaponName: { type: String },
    spellName: { type: String },
    spellLevel: { type: Number },
  });

  module.exports = mongoose.model('Character', CharacterSchema);
