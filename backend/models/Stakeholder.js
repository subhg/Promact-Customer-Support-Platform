const mongoose = require('mongoose');

// Define the schema for the Stakeholder
const stakeholderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

// Create the Stakeholder model
const Stakeholder = mongoose.model('Stakeholder', stakeholderSchema);

module.exports = Stakeholder;
