const express = require('express');
const router = express.Router();

// Import CRUD operations for Sprint
const {
    createSprint,
    getSprintById,
    getAllSprints,
    updateSprint,
    deleteSprint,
} = require('../controllers/SprintCrud');

// Route to create a new sprint
router.post('/', async (req, res) => {
    try {
        const result = await createSprint(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all sprints
router.get('/', async (req, res) => {
    try {
        const result = await getAllSprints();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a sprint by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getSprintById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a sprint by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateSprint(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a sprint by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteSprint(req.params.id);
        res.json({ status: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
