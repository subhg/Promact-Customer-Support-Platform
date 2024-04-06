const express = require('express');
const router = express.Router();

// Import CRUD operations for Scope
const {
    createScope,
    getScopeById,
    getAllScopes,
    updateScope,
    deleteScope,
} = require('../controllers/ScopeCrud');

// Route to create a new scope
router.post('/', async (req, res) => {
    try {
        const result = await createScope(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all scopes
router.get('/', async (req, res) => {
    try {
        const result = await getAllScopes();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a scope by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getScopeById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a scope by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateScope(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a scope by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteScope(req.params.id);
        res.json({ status: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
