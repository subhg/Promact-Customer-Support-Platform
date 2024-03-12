const express = require('express');
const router = express.Router();
const {
  createEscalationMatrix,
  getAllEscalationMatrices,
  getEscalationMatrixById,
  updateEscalationMatrix,
  deleteEscalationMatrix,
} = require('../crudOperations/EscalationMatrixCrud');

// Routes for Escalation Matrix entity
router.post('/', async (req, res) => {
  try {
    const result = await createEscalationMatrix(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getEscalationMatrixById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getAllEscalationMatrices();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateEscalationMatrix(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteEscalationMatrix(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
