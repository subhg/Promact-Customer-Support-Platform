// Collection: Resources

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the resource schema
const resourceSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  role: {
    type: String,
    required: true 
  },
  startDate: {
    type: Date,
    required: true 
  },
  endDate: {
    type: Date,
    required: true 
  },
  comment: {
    type: String 
  },
  
});

// Create the Resource model
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
