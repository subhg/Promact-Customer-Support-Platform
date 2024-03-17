const express = require('express');
const router = express.Router();

const {
    createTimeline,
    getTimelineById,
    getAllTimelines,
    updateTimeline,
    deleteTimeline,
} = require('../crudOperations/TimelineCrud');

router.post('/', async (req, res) => {
    try {
        const result = await createTimeline(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await getAllTimelines();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await getTimelineById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const result = await updateTimeline(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteTimeline(req.params.id);
        res.json({ status: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
