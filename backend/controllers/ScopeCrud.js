// Import the Scope model
const Scope = require('../models/Scope');

// Create
const createScope = async (data) => {
  try {
    const scope = new Scope(data);
    console.log(data)
    
    const result = await scope.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getScopeById = async (scopeId) => {
  try {
    const result = await Scope.findById(scopeId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all scopes
const getAllScopes = async () => {
  try {
    const result = await Scope.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update scope by ID with new data
const updateScope = async (scopeId, newData) => {
  try {
    const result = await Scope.findByIdAndUpdate(
      scopeId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete scope by ID
const deleteScope = async (scopeId) => {
  try {
    const result = await Scope.findByIdAndDelete(scopeId);
    return result;
  } catch (error) {
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
