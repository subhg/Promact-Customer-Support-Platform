const mongoose = require('mongoose');

const projectStackSchema = new mongoose.Schema({
  tech: {
    type: [String], // Assuming tech can be multiple technologies
    required: true
  }
});

const ProjectStack = mongoose.model('ProjectStack', projectStackSchema);

module.exports = ProjectStack;
