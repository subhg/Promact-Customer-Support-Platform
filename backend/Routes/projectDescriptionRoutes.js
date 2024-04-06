const express = require('express');
const router = express.Router();

// Import CRUD operations for Project Description
const {
  createProjectDescription,
  getAllProjectDescriptions,
  getProjectDescriptionById,
  updateProjectDescription,
  deleteProjectDescription,
} = require('../controllers/ProjectDescriptionCrud');

// Route to create a new project description
router.post('/', async (req, res) => {
  try {
    const result = await createProjectDescription(req.body);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to get a project description by its ID
router.get('/:id', async (req, res) => {
  try {
    const result = await getProjectDescriptionById(req.params.id);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to get all project descriptions
router.get('/', async (req, res) => {
  try {
    const result = await getAllProjectDescriptions();
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to update a project description by its ID
router.put('/:id', async (req, res) => {
  try {
    const result = await updateProjectDescription(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a project description by its ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteProjectDescription(req.params.id);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
