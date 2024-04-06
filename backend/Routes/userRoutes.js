const express = require('express');
const router = express.Router();

// Import user controller functions
const {
    createUser,
    getAllUser,
    getUserRoleById,
} = require('../controllers/userController');

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        const result = await createUser(req.body);  
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const result = await getAllUser();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get user role by ID
router.get('/users/:id/role', async (req, res) => {
    try {
        const userId = req.params.id;
        const userRole = await getUserRoleById(userId);
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

module.exports = router;
