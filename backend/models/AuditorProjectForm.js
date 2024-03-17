const mongoose = require('mongoose');

const auditorProjectFormSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectManager: {
    type: String,
    required: true
  },
  clients: [{
    clientName: {
      type: String,
      required: true
    },
    clientMail: {
      type: String,
      required: true
    }
  }]
});

const AuditorProjectForm = mongoose.model('AuditorProjectForm', auditorProjectFormSchema);

module.exports = AuditorProjectForm;
