// Collection: ClientMeetings

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the client meeting schema
const clientMeetingSchema = new Schema({
  date: {
    type: Date,
    required: true // Date of the meeting is a required field
  },
  duration: {
    type: String,
    required: true // Duration of the meeting is a required field
  },
  momLink: {
    type: String
    // Optional: Field for the link to the Meeting Minutes (MOM)
  },
  comments: {
    type: String
    // Optional: Field for additional comments or notes about the meeting
  },
  project: {
    type: String,
    required: true
    
  }
});

// Create the ClientMeeting model
const ClientMeeting = mongoose.model('ClientMeeting', clientMeetingSchema);

module.exports = ClientMeeting;
