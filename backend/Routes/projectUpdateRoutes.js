const express = require('express');
const router = express.Router();

const {
    createProjectUpdate,
    getProjectUpdateById,
    getAllProjectUpdate,
    updateProjectUpdate,
    deleteProjectUpdate,
  } = require('../crudOperations/ProjectUpdateCrud');
  
  router.post('/', async (req, res) => {
    try {
      const result = await createProjectUpdate(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getProjectUpdateById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllProjectUpdate();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateProjectUpdate(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteProjectUpdate(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports=router