// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for the scope collection
const scopeSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true
  },
  // Other fields of the scope collection can be added here
});

// Create the Scope model based on the schema
const Scope = mongoose.model('Scope', scopeSchema);

// Export the Scope model for external use
module.exports = Scope;
