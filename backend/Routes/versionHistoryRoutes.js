const express = require('express');
const router = express.Router();

// Import Version History controller functions
const {
    createVersionHistory,
    getVersionHistoryById,
    getAllVersionHistory,
    updateVersionHistory,
    deleteVersionHistory,
} = require('../controllers/VersionHistoryCrud');

// Route to create a new version history entry
router.post('/', async (req, res) => {
    try {
        const result = await createVersionHistory(req.body);  
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a version history entry by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getVersionHistoryById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all version history entries
router.get('/', async (req, res) => {
    try {
        const result = await getAllVersionHistory();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a version history entry by ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateVersionHistory(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a version history entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteVersionHistory(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
