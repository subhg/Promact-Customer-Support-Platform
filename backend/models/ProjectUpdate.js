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
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
    // Assuming you have a Project model and you want to associate the update with a specific project
  }
});

// Create the ProjectUpdate model
const ProjectUpdate = mongoose.model('ProjectUpdate', projectUpdateSchema);

module.exports = ProjectUpdate;
