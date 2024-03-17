// Import the Scope model
const Scope = require('../models/Scope');

// Create
const createScope = async (data) => {
  try {
    // Create a new instance of Scope using the provided data
    console.log('mein data hu',data)
    const scope = new Scope(data);
    console.log(data)
    
    // Save the new instance to the database
    const result = await scope.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getScopeById = async (scopeId) => {
  try {
    // Retrieve a specific scope by its ID from the database
    const result = await Scope.findById(scopeId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all scopes
const getAllScopes = async () => {
  try {
    // Retrieve all scopes from the database
    const result = await Scope.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update scope by ID with new data
const updateScope = async (scopeId, newData) => {
  try {
    // Find and update the scope by its ID with the new data
    const result = await Scope.findByIdAndUpdate(
      scopeId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete scope by ID
const deleteScope = async (scopeId) => {
  try {
    // Find and delete the scope by its ID
    const result = await Scope.findByIdAndDelete(scopeId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createScope,
  getScopeById,
  getAllScopes,
  updateScope,
  deleteScope,
};
