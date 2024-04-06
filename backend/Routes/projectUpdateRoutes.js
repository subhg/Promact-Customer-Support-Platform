const express = require('express');
const router = express.Router();

// Import CRUD operations for Project Update
const {
    createProjectUpdate,
    getProjectUpdateById,
    getAllProjectUpdate,
    updateProjectUpdate,
    deleteProjectUpdate,
} = require('../controllers/ProjectUpdateCrud');

// Route to create a new project update
router.post('/', async (req, res) => {
    try {
        const result = await createProjectUpdate(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a project update by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getProjectUpdateById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all project updates
router.get('/', async (req, res) => {
    try {
        const result = await getAllProjectUpdate();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a project update by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateProjectUpdate(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a project update by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteProjectUpdate(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
