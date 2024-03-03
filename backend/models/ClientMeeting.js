// Collection: ClientMeetings

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the client meeting schema
const clientMeetingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  momLink: {
    type: String
    // You might add validation for a valid URL here if needed
  },
  comments: {
    type: String
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
    // Assuming you have a Project model and you want to associate the meeting with a specific project
  }
});

// Create the ClientMeeting model
const ClientMeeting = mongoose.model('ClientMeeting', clientMeetingSchema);

module.exports = ClientMeeting;
