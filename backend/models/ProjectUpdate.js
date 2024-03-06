// Collection: ProjectUpdates

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the project update schema
const projectUpdateSchema = new Schema({
  date: {
    type: Date,
    required: true // Date of the update is a required field
  },
  generalUpdates: {
    type: String,
    required: true // General updates is a required field
  },
  project: {
    type: String,
    required: true
    
  }
});

// Create the ProjectUpdate model
const ProjectUpdate = mongoose.model('ProjectUpdate', projectUpdateSchema);

module.exports = ProjectUpdate;
