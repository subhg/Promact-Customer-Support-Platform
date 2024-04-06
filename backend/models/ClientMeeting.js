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
    type: String,
  },
  comments: {
    type: String,
  },
  project: {
    type: String,
    required: true
    
  }
});

// Create the ClientMeeting model
const ClientMeeting = mongoose.model('ClientMeeting', clientMeetingSchema);

module.exports = ClientMeeting;
