const mongoose = require('mongoose');

const projectDescriptionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});

const ProjectDescription = mongoose.model('ProjectDescription', projectDescriptionSchema);

module.exports = ProjectDescription;
