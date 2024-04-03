const express = require('express');
const router = express.Router();

const {
    createVersionHistory,
    getVersionHistoryById,
    getAllVersionHistory,
    updateVersionHistory,
    deleteVersionHistory,
  } = require('../controllers/VersionHistoryCrud');

router.post('/', async (req, res) => {
  try {
    const result = await createVersionHistory(req.body);  
    res.json(result);
   // console.log('Received Data:', req.body);
  } 

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getVersionHistoryById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getAllVersionHistory();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateVersionHistory(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteVersionHistory(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
