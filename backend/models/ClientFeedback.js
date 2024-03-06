// Collection: ClientFeedback

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the client feedback schema
const clientFeedbackSchema = new Schema({
  feedbackType: {
    type: String,
    required: true
  },
  dateReceived: {
    type: Date,
    required: true
  },
  detailedFeedback: {
    type: String,
    required: true
  },
  actionTaken: {
    type: String
  },
  closureDate: {
    type: Date
  },
  project: {
    type: String,
    required: true
    // Assuming you have a Project model and you want to associate the feedback with a specific project
  }
});

// Create the ClientFeedback model
const ClientFeedback = mongoose.model('ClientFeedback', clientFeedbackSchema);

module.exports = ClientFeedback;
