const EscalationMatrix = require('../models/EscalationMatrix');

// Create
const createEscalationMatrix = async (data) => {
  try {
    // Create a new instance of EscalationMatrix using the provided data
    const escalationMatrix = new EscalationMatrix(data);
    // Save the new instance to the database
    const result = await escalationMatrix.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getEscalationMatrixById = async (escalationMatrixId) => {
  try {
    // Retrieve a specific escalation matrix by its ID from the database
    const result = await EscalationMatrix.findById(escalationMatrixId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all escalation matrices
const getAllEscalationMatrices = async () => {
  try {
    // Retrieve all escalation matrices from the database
    const result = await EscalationMatrix.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update escalation matrix by ID with new data
const updateEscalationMatrix = async (escalationMatrixId, newData) => {
  try {
    // Find and update the escalation matrix by its ID with the new data
    const result = await EscalationMatrix.findByIdAndUpdate(
      escalationMatrixId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete escalation matrix by ID
const deleteEscalationMatrix = async (escalationMatrixId) => {
  try {
    // Find and delete the escalation matrix by its ID
    const result = await EscalationMatrix.findByIdAndDelete(escalationMatrixId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createEscalationMatrix,
  getEscalationMatrixById,
  getAllEscalationMatrices,
  updateEscalationMatrix,
  deleteEscalationMatrix,
};
