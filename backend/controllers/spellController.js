const express = require('express');
const router = express.Router();
const Spell = require('../models/Spell');
const validateJWT = require('./validateJWT');

// Apply middleware to all routes
router.use(validateJWT);

// Get all spells or spells by characterId
router.get('/', async (req, res) => {
  try {
    const { characterId } = req.query;
    const spells = characterId
      ? await Spell.find({ characterId }).populate('characterId')
      : await Spell.find().populate('characterId');
    res.json(spells);
  } catch (error) {
    console.error('Error fetching spells:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get spell by ID
router.get('/:spellId', async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findById(spellId).populate('characterId');
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json(spell);
  } catch (error) {
    console.error('Error fetching spell:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new spell
router.post('/new', async (req, res) => {
  try {
    const spell = new Spell(req.body);
    await spell.save();
    res.status(201).json(spell);
  } catch (error) {
    console.error('Error creating spell:', error);
    res.status(500).json({ message: error.message });
  }
});


// Update spell by ID
router.put('/:spellId', async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findByIdAndUpdate(spellId, req.body, { new: true });
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json(spell);
  } catch (error) {
    console.error('Error updating spell:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete spell by ID
router.delete('/:spellId', async (req, res) => {
  try {
    const { spellId } = req.params;
    const spell = await Spell.findByIdAndDelete(spellId);
    if (!spell) {
      return res.status(404).json({ message: 'Spell not found' });
    }
    res.json({ message: 'Spell deleted successfully' });
  } catch (error) {
    console.error('Error deleting spell:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;