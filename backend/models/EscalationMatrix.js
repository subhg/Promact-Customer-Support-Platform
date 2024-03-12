const mongoose = require('mongoose');

// Define sub-schema for each escalation level
const escalationLevelSchema = new mongoose.Schema({
  escalationLevel: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Define main schema for the escalation matrix
const escalationMatrixSchema = new mongoose.Schema({
  operational: [escalationLevelSchema],
  financial: [escalationLevelSchema],
  technical: [escalationLevelSchema],
});

// Create and export the model
const EscalationMatrix = mongoose.model('EscalationMatrix', escalationMatrixSchema);

module.exports = EscalationMatrix;
