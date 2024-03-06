// Collection: Resources

// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the resource schema
const resourceSchema = new Schema({
  name: {
    type: String,
    required: true // Name of the resource is a required field
  },
  role: {
    type: String,
    required: true // Role of the resource is a required field
  },
  startDate: {
    type: Date,
    required: true // Start date of the resource is a required field
  },
  endDate: {
    type: Date,
    required: true // End date of the resource is a required field
  },
  comment: {
    type: String // Optional: Additional comments about the resource
  },
  //project: {
  //  type: String,
  //  ref: 'Project',
  //  required: true
  //}
});

// Create the Resource model
const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
