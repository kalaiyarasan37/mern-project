// routes/placementRoutes.js
import express from 'express';
import Placement from '../models/Placement.js';

const router = express.Router();

// Create a new placement
router.post('/', async (req, res) => {
  try {
    const newPlacement = new Placement(req.body);
    await newPlacement.save();
    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all placements
router.get('/', async (req, res) => {
  try {
    const placements = await Placement.find();
    res.json(placements);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a placement by ID
router.get('/:id', async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ error: 'Placement not found' });
    }
    res.json(placement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a placement by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPlacement = await Placement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlacement) {
      return res.status(404).json({ error: 'Placement not found' });
    }
    res.json(updatedPlacement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a placement by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlacement = await Placement.findByIdAndDelete(req.params.id);
    if (!deletedPlacement) {
      return res.status(404).json({ error: 'Placement not found' });
    }
    res.json({ message: 'Placement deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
