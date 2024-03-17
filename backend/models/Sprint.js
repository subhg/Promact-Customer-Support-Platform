const mongoose = require('mongoose');

// Define Sprint Schema
const sprintSchema = new mongoose.Schema({
  sprint: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Delayed', 'On-time', 'Sign-off Pending', 'Signed-off'],
    required: true
  },
  comments: String
});

// Create Sprint model
const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
