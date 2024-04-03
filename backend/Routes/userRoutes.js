const express = require('express');
const router = express.Router();

const{
    createUser,
    getAllUser,
    getUserRoleById,
    
  }= require('../controllers/userController');

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

  router.get('/users/:id/role', async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(req.params.id)
      const userRole = await userModel.getUserRoleById(userId);
      if (userRole !== null) {
        res.status(200).json({ role: userRole });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports=router