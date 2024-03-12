const express = require('express');
const router = express.Router();

const{
    createUser,
    getAllUser,
  }= require('../crudOperations/userController');

  router.post('/', async (req, res) => {
    try {
      const result = await createUser(req.body);  
      res.json(result);
     // console.log('Received Data:', req.body);
    } 
  
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.get('/', async (req, res) => {
    try {
      const result = await getAllUser();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports=router