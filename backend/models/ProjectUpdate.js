// Collection: ProjectUpdates

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the project update schema
const projectUpdateSchema = new Schema({
  date: {
    type: Date,
    required: true 
  },
  generalUpdates: {
    type: String,
    required: true 
  },
  project: {
    type: String,
    required: true
    
  }
});

// Create the ProjectUpdate model
const ProjectUpdate = mongoose.model('ProjectUpdate', projectUpdateSchema);

module.exports = ProjectUpdate;
