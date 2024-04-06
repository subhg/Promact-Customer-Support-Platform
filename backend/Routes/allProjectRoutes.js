const express = require('express');
const router = express.Router();

// Import CRUD operations for AllProject
const {
    createProject,
    getProjectById,
    getAllProjects,
    updateProject,
    deleteProject,
} = require('../controllers/ALLProjectCrud');

// Route to create a new project
router.post('/', async (req, res) => {
    try {
        const result = await createProject(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a project by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getProjectById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all projects
router.get('/', async (req, res) => {
    try {
        const result = await getAllProjects();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a project by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateProject(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a project by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteProject(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
