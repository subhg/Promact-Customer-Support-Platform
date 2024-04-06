const express = require('express');
const router = express.Router();

// Import CRUD operations for AuditHistory
const {
  createAuditHistory,
  getAllAuditHistory,
  getAuditHistoryById,
  updateAuditHistory,
  deleteAuditHistory,
} = require('../controllers/AuditHistoryCrud');

// Route to create a new audit history entry
router.post('/', async (req, res) => {
  try {
    const result = await createAuditHistory(req.body);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to get an audit history entry by its ID
router.get('/:id', async (req, res) => {
  try {
    const result = await getAuditHistoryById(req.params.id);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to get all audit history entries
router.get('/', async (req, res) => {
  try {
    const result = await getAllAuditHistory();
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to update an audit history entry by its ID
router.put('/:id', async (req, res) => {
  try {
    const result = await updateAuditHistory(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

// Route to delete an audit history entry by its ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteAuditHistory(req.params.id);
    res.json(result);
  } catch (error) {
    
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
