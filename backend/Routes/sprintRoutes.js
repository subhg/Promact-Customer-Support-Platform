const express = require('express');
const router = express.Router();

const {
    createSprint,
    getSprintById,
    getAllSprints,
    updateSprint,
    deleteSprint,
  } = require('../controllers/SprintCrud');

router.post('/', async (req, res) => {
  try {
    const result = await createSprint(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getAllSprints();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getSprintById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateSprint(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteSprint(req.params.id);
    res.json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
