const express = require('express');
const router = express.Router();

// Import CRUD operations for ClientFeedback
const {
    createClientFeedback,
    getClientFeedbackById,
    getAllClientFeedback,
    updateClientFeedback,
    deleteClientFeedback,
} = require('../controllers/ClientFeedbackCrud');

// Route to create a new client feedback entry
router.post('/', async (req, res) => {
    try {
        const result = await createClientFeedback(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a client feedback entry by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getClientFeedbackById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all client feedback entries
router.get('/', async (req, res) => {
    try {
        const result = await getAllClientFeedback();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a client feedback entry by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateClientFeedback(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a client feedback entry by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteClientFeedback(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
