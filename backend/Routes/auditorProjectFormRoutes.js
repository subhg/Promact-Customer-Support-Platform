// auditorProjectFormRoutes.js

const express = require('express');
const router = express.Router();
const {
  createAuditorProjectForm,
  getAllAuditorProjectForm,
  updateAuditorProjectForm,
  deleteAuditorProjectForm
} = require('../controllers/auditorProjectFormController');

// Route to create a new auditor project form
router.post('/', async (req, res) => {
  try {
    const result = await createAuditorProjectForm(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all auditor project forms
router.get('/', async (req, res) => {
  try {
    const result = await getAllAuditorProjectForm();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an auditor project form by ID
router.put('/:id', async (req, res) => {
  try {
    const result = await updateAuditorProjectForm(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete an auditor project form by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteAuditorProjectForm(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
