const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const validateJWT = require('./validateJWT');

// Apply middleware to all routes
router.use(validateJWT);

// Get all skills or skills by characterId
router.get('/', async (req, res) => {
  try {
    const { characterId } = req.query;
    const skills = characterId
      ? await Skill.find({ characterId }).populate('characterId')
      : await Skill.find().populate('characterId');
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get skill by ID
router.get('/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findById(skillId).populate('characterId');
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    console.error('Error fetching skill:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new skill
router.post('/new', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    console.error('Error creating skill:', error);
    res.status(500).json({ message: error.message });
  }
});
// Update skill by ID
router.put('/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findByIdAndUpdate(skillId, req.body, { new: true });
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete skill by ID
router.delete('/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = await Skill.findByIdAndDelete(skillId);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;