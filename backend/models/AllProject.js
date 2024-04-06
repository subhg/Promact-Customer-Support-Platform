const mongoose = require('mongoose');

const allProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending'
  },
  projectManager: {
    type: String,
    required: true
  },
  members: {
    type: Number, 
    required: true
  }
});

const AllProject = mongoose.model('AllProject', allProjectSchema);

module.exports = AllProject;
