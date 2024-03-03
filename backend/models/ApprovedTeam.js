// Collection: ApprovedTeams

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the resource schema within an approved team
const resourceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  availability: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

// Define the approved team schema with phases
const approvedTeamSchema = new Schema({
  phase: {
    type: String,
    required: true
  },
  resources: [resourceSchema]
});

// Create the ApprovedTeam model
const ApprovedTeam = mongoose.model('ApprovedTeam', approvedTeamSchema);

module.exports = ApprovedTeam;
