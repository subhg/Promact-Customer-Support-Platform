// Collection: ApprovedTeams

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// Ensure that the phase field is optional
const approvedTeamSchema = new Schema({
  phase: {
    type: String,
    required: true, 
  },
  name: {
    type: String,
    required: true, 
  },
  role: {
    type: String,
    required: true, 
  },
  availability: {
    type: String, 
    required: true, 
  },
  duration: {
    type: String,
    required: true, 
  },
  //resources: [resourceSchema],
});

// Create the ApprovedTeam model
const ApprovedTeam = mongoose.model('ApprovedTeam', approvedTeamSchema);
module.exports = ApprovedTeam;
