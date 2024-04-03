const express = require('express');
const router = express.Router();
const {
  createEscalationLevel,
  getEscalationLevelsByType,
  updateEscalationLevel,
  deleteEscalationLevel,
}= require('../controllers/EscalationMatrixCrud');
// const EscalationMatrix = require('../models/EscalationMatrix');


// Create an escalation level
router.post('/:type', async (req, res) => {
  
  try {
    const { type } = req.params;
    const data = req.body;
    
    const result = await createEscalationLevel(type, data);
    res.json(result);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get escalation levels by type
router.get('/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const result = await getEscalationLevelsByType(type);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an escalation level
router.put('/:type/:levelId', async (req, res) => {
  try {
    const { type, levelId } = req.params;
    const newData = req.body;
    console.log('subham',newData)
    const result = await updateEscalationLevel(type, levelId, newData);
    console.log('hey')
    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// Delete an escalation level
router.delete('/:type/:levelId', async (req, res) => {
  try {
    const { type, levelId } = req.params;
    const result = await deleteEscalationLevel(type, levelId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
