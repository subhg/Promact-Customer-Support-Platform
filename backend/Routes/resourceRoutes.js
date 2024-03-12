const express = require('express');
const router = express.Router();

const {
    createResource,
    getResourceById,
    getAllResource,
    updateResource,
    deleteResource,
  } = require('../crudOperations/ResourceCrud');

  router.post('/', async (req, res) => {
    try {
      const result = await createResource(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllResource();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getResourceById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateResource(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteResource(req.params.id);
      res.json({status: "Success"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;