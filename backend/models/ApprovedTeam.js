// Collection: ApprovedTeams

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the resource schema within an approved team
/*const resourceSchema = new Schema({});*/  // Optional: Define a schema for resources if needed

// Ensure that the phase field is optional
const approvedTeamSchema = new Schema({
  phase: {
    type: String,
    required: true, // Phase is a required field
  },
  name: {
    type: String,
    required: true, // Team name is a required field
  },
  role: {
    type: String,
    required: true, // Role is a required field
  },
  availability: {
    type: String, // Change this to String
    required: true, // Availability is a required field
  },
  duration: {
    type: String,
    required: true, // Duration is a required field
  },
  //resources: [resourceSchema],  // Optional: Include a reference to resource schema if resources are associated with the approved team
});

// Create the ApprovedTeam model
const ApprovedTeam = mongoose.model('ApprovedTeam', approvedTeamSchema);
module.exports = ApprovedTeam;
