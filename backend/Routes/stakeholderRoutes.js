const express = require('express');
const router = express.Router();

// Import CRUD operations for Stakeholder
const {
    createStakeholder,
    getStakeholderById,
    getAllStakeholders,
    updateStakeholder,
    deleteStakeholder,
} = require('../controllers/StakeholderCrud');

// Route to create a new stakeholder
router.post('/', async (req, res) => {
    try {
        const result = await createStakeholder(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a stakeholder by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getStakeholderById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all stakeholders
router.get('/', async (req, res) => {
    try {
        const result = await getAllStakeholders();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a stakeholder by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateStakeholder(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a stakeholder by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteStakeholder(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
