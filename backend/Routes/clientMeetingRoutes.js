const express = require('express');
const router = express.Router();

// Import CRUD operations for ClientMeeting
const {
    createClientMeeting,
    getClientMeetingById,
    getAllClientMeeting,
    updateClientMeeting,
    deleteClientMeeting,
} = require('../controllers/ClientMeetingCrud');

// Route to create a new client meeting entry
router.post('/', async (req, res) => {
    try {
        const result = await createClientMeeting(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a client meeting entry by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getClientMeetingById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all client meeting entries
router.get('/', async (req, res) => {
    try {
        const result = await getAllClientMeeting();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a client meeting entry by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateClientMeeting(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a client meeting entry by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteClientMeeting(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
