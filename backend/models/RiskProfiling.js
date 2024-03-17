const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define RiskProfiling schema
const riskProfilingSchema = new Schema({
  riskType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  remedialSteps: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  closureDate: {
    type: Date
  }
});

// Create RiskProfiling model
const RiskProfiling = mongoose.model('RiskProfiling', riskProfilingSchema);

module.exports = RiskProfiling;
