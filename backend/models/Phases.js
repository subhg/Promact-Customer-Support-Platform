const mongoose = require('mongoose');

// Define schema for individual phase/milestone
const phaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  completionDate: {
    type: Date,
    required: true
  },
  approvalDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Delayed', 'On-time', 'Sign-off Pending', 'Signed-off'],
    default: 'On-time'
  },
  revisedCompletionDate: {
    type: Date
  },
  comments: {
    type: String
  }
});

// Define schema for Phases/Milestones
const phasesSchema = new mongoose.Schema({
  phases: [phaseSchema] // Array of phase documents
});

// Create model for Phases/Milestones
const Phases = mongoose.model('Phases', phaseSchema);

module.exports = Phases;
