// Import mongoose
const mongoose = require('mongoose');

// Define the schema for the Timeline model
const timelineSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  }
});

// Create the Timeline model
const Timeline = mongoose.model('Timeline', timelineSchema);

// Export the model
module.exports = Timeline;
