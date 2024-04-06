const express = require('express');
const router = express.Router();

// Import CRUD operations for Project Budget
const {
    createProjectBudget,
    getProjectBudgetById,
    getAllProjectBudgets,
    updateProjectBudget,
    deleteProjectBudget,
} = require('../controllers/ProjectBudgetCrud');

// Route to create a new project budget
router.post('/', async (req, res) => {
    try {
        const result = await createProjectBudget(req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get a project budget by its ID
router.get('/:id', async (req, res) => {
    try {
        const result = await getProjectBudgetById(req.params.id);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to get all project budgets
router.get('/', async (req, res) => {
    try {
        const result = await getAllProjectBudgets();
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to update a project budget by its ID
router.put('/:id', async (req, res) => {
    try {
        const result = await updateProjectBudget(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a project budget by its ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await deleteProjectBudget(req.params.id);
        res.json(result);
    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
