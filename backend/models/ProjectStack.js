const mongoose = require('mongoose');

const projectStackSchema = new mongoose.Schema({
  tech: {
    type: [String], 
    required: true
  }
});

const ProjectStack = mongoose.model('ProjectStack', projectStackSchema);

module.exports = ProjectStack;
