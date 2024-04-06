const express = require('express');
const router = express.Router();

// Import CRUD operations for Phases
const {
    createPhases,
    getPhasesById,
    getAllPhases,
    updatePhases,
    deletePhases,
} = require('../controllers/PhasesCrud');

// Route to create a new phase
router.post('/', async (req, res) => {
    try {
        const result = await createPhases(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a phase by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getPhasesById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all phases
router.get('/', async (req, res) => {
    try {
        const result = await getAllPhases();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a phase by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updatePhases(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a phase by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deletePhases(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
