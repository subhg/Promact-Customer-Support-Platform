const express = require('express');
const router = express.Router();

const {
    createApprovedTeam,
    getApprovedTeamById,
    getAllApprovedTeams,
    updateApprovedTeam,
    deleteApprovedTeam,
  } = require('../crudOperations/ApprovedTeamCrud');

  router.post('/', async (req, res) => {
    try {
      const result = await createApprovedTeam(req.body);  
      res.json(result);
     // console.log('Received Data:', req.body);
    } 
  
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const result = await getApprovedTeamById(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllApprovedTeams();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const result = await updateApprovedTeam(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const result = await deleteApprovedTeam(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;
