const express = require('express');
const router = express.Router();

const {
    createStakeholder,
    getStakeholderById,
    getAllStakeholders,
    updateStakeholder,
    deleteStakeholder,
} = require('../controllers/StakeholderCrud');

router.post('/', async (req, res) => {
    try {
        console.log('hey')
        const result = await createStakeholder(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        console.log('hey')
        const result = await getStakeholderById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await getAllStakeholders();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await updateStakeholder(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteStakeholder(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
