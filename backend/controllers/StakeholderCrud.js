// Import the Stakeholder model
const Stakeholder = require('../models/Stakeholder');

// Create a new stakeholder entry
const createStakeholder = async (data) => {
  try {
    // Create a new instance of Stakeholder using the provided data
    const stakeholder = new Stakeholder(data);
    // Save the new instance to the database
    const result = await stakeholder.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getStakeholderById = async (stakeholderId) => {
  try {
    // Retrieve a specific stakeholder by its ID from the database
    const result = await Stakeholder.findById(stakeholderId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all stakeholders
const getAllStakeholders = async () => {
  try {
    // Retrieve all stakeholders from the database
    const result = await Stakeholder.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update stakeholder by ID with new data
const updateStakeholder = async (stakeholderId, newData) => {
  try {
    // Find and update the stakeholder by its ID with the new data
    const result = await Stakeholder.findByIdAndUpdate(
      stakeholderId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete stakeholder by ID
const deleteStakeholder = async (stakeholderId) => {
  try {
    // Find and delete the stakeholder by its ID
    const result = await Stakeholder.findByIdAndDelete(stakeholderId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createStakeholder,
  getStakeholderById,
  getAllStakeholders,
  updateStakeholder,
  deleteStakeholder,
};
