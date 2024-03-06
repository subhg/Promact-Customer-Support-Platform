// Collection: ClientFeedback

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the client feedback schema
const clientFeedbackSchema = new Schema({
  feedbackType: {
    type: String,
    required: true // Type of feedback is a required field
  },
  dateReceived: {
    type: Date,
    required: true // Date of feedback receipt is a required field
  },
  detailedFeedback: {
    type: String,
    required: true // Detailed feedback is a required field
  },
  actionTaken: {
    type: String // Action taken based on feedback (optional field)
  },
  closureDate: {
    type: Date // Date when the feedback issue was resolved (optional field)
  },
  project: {
    type: String,
    required: true
  
  }
});

// Create the ClientFeedback model
const ClientFeedback = mongoose.model('ClientFeedback', clientFeedbackSchema);

module.exports = ClientFeedback;
