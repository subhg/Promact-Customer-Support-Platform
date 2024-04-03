const express = require('express');
const router = express.Router();

const {
    createScope,
    getScopeById,
    getAllScopes,
    updateScope,
    deleteScope,
  } = require('../controllers/ScopeCrud');

router.post('/', async (req, res) => {
  try {
    console.log('hey')
    console.log('req.body:',req.body)
    const result = await createScope(req.body);
    
    res.json(result);
    console.log(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await getAllScopes();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await getScopeById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const result = await updateScope(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteScope(req.params.id);
    res.json({ status: "Success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
