// Import the Stakeholder model
const Stakeholder = require('../models/Stakeholder');

// Create a new stakeholder entry
const createStakeholder = async (data) => {
  try {
    const stakeholder = new Stakeholder(data);
    const result = await stakeholder.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getStakeholderById = async (stakeholderId) => {
  try {
    const result = await Stakeholder.findById(stakeholderId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all stakeholders
const getAllStakeholders = async () => {
  try {
    const result = await Stakeholder.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update stakeholder by ID with new data
const updateStakeholder = async (stakeholderId, newData) => {
  try {
    const result = await Stakeholder.findByIdAndUpdate(
      stakeholderId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete stakeholder by ID
const deleteStakeholder = async (stakeholderId) => {
  try {
    const result = await Stakeholder.findByIdAndDelete(stakeholderId);
    return result;
  } catch (error) {
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
