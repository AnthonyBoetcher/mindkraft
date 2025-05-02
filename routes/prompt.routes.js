const express = require('express');
const router = express.Router();
const Prompt = require('../models/prompt.model');

// GET all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.json(prompts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single prompt by ID
router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' });
    res.json(prompt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new prompt
router.post('/', async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body);
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE prompt
router.put('/:id', async (req, res) => {
  try {
    const updatedPrompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPrompt) return res.status(404).json({ error: 'Prompt not found' });
    res.json(updatedPrompt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE prompt
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Prompt.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Prompt not found' });
    res.json({ message: 'Prompt deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
