const express = require('express');
const router = express.Router();

const {
    createClientMeeting,
    getClientMeetingById,
    getAllClientMeeting,
    updateClientMeeting,
    deleteClientMeeting,
  } = require('../controllers/ClientMeetingCrud');

  router.post('/', async (req, res) => {
    try {
      const result = await createClientMeeting(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getClientMeetingById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllClientMeeting();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateClientMeeting(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteClientMeeting(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports= router