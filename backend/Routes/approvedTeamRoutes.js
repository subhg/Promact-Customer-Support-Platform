const express = require('express');
const router = express.Router();

// Import CRUD operations for ApprovedTeam
const {
    createApprovedTeam,
    getApprovedTeamById,
    getAllApprovedTeams,
    updateApprovedTeam,
    deleteApprovedTeam,
} = require('../controllers/ApprovedTeamCrud');

// Route to create a new approved team
router.post('/', async (req, res) => {
    try {
        const result = await createApprovedTeam(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get an approved team by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getApprovedTeamById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all approved teams
router.get('/', async (req, res) => {
    try {
        const result = await getAllApprovedTeams();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update an approved team by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateApprovedTeam(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete an approved team by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteApprovedTeam(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
