const express = require('express');
const router = express.Router();

const{
    createProjectBudget,
    getProjectBudgetById,
    getAllProjectBudgets,
    updateProjectBudget,
    deleteProjectBudget,
  }= require('../crudOperations/ProjectBudgetCrud')
  
  router.post('/', async (req, res) => {
    try {
      const result = await createProjectBudget(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getProjectBudgetById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllProjectBudgets();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateProjectBudget(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteProjectBudget(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports=router;