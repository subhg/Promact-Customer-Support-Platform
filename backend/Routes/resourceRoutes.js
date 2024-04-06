const express = require('express');
const router = express.Router();

// Import CRUD operations for Resource
const {
    createResource,
    getResourceById,
    getAllResource,
    updateResource,
    deleteResource,
} = require('../controllers/ResourceCrud');

// Route to create a new resource
router.post('/', async (req, res) => {
    try {
        const result = await createResource(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all resources
router.get('/', async (req, res) => {
    try {
        const result = await getAllResource();
        res.json(result);
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
});

// Route to get a resource by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getResourceById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a resource by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateResource(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a resource by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteResource(req.params.id);
        res.json({ status: "Success" });
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
