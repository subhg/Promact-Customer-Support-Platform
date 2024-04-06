const express = require('express');
const router = express.Router();

// Import the route handler function
const { sendEmail } = require('../controllers/EmailController');

// Define the POST route and use the sendEmail function as the callback
router.post('/', sendEmail);

module.exports = router;
