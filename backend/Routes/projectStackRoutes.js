const express = require('express');
const router = express.Router();

const {
    createProjectStack,
    getProjectStackById,
    getAllProjectStacks,
    updateProjectStack,
    deleteProjectStack,
  } = require('../crudOperations/ProjectStackCrud');

// Route to create a new project stack
router.post('/', async (req, res) => {
    try {
        const result = await createProjectStack(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a project stack by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getProjectStackById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all project stacks
router.get('/', async (req, res) => {
    try {
        const result = await getAllProjectStacks();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a project stack by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateProjectStack(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a project stack by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteProjectStack(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
