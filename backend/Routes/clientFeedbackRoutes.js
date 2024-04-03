const express = require('express');
const router = express.Router();

const {
    createClientFeedback,
    getClientFeedbackById,
    getAllClientFeedback,
    updateClientFeedback,
    deleteClientFeedback,
  } = require('../controllers/ClientFeedbackCrud');

  router.post('/', async (req, res) => {
    try {
      const result = await createClientFeedback(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getClientFeedbackById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllClientFeedback();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateClientFeedback(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteClientFeedback(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports=router;