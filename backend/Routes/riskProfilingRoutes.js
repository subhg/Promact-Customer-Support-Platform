const express = require('express');
const router = express.Router();

const {
  createRiskProfiling,
  getRiskProfilingById,
  getAllRiskProfiling,
  updateRiskProfiling,
  deleteRiskProfiling,
} = require('../crudOperations/RiskProfilingCrud');

// Create a new risk profiling entry
router.post('/', async (req, res) => {
  try {
    const result = await createRiskProfiling(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all risk profilings
router.get('/', async (req, res) => {
  try {
    const result = await getAllRiskProfiling();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific risk profiling by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await getRiskProfilingById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a risk profiling by ID
router.put('/:id', async (req, res) => {
  try {
    const result = await updateRiskProfiling(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a risk profiling by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteRiskProfiling(req.params.id);
    res.json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
