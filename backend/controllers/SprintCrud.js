// Import the Sprint model
const Sprint = require('../models/Sprint');

// Create
const createSprint = async (data) => {
  try {
    const sprint = new Sprint(data);
    const result = await sprint.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all
const getAllSprints = async () => {
  try {
    const result = await Sprint.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read by ID
const getSprintById = async (sprintId) => {
  try {
    const result = await Sprint.findById(sprintId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateSprint = async (sprintId, newData) => {
  try {
    const result = await Sprint.findByIdAndUpdate(
      sprintId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteSprint = async (sprintId) => {
  try {
    const result = await Sprint.findByIdAndDelete(sprintId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createSprint,
  getAllSprints,
  getSprintById,
  updateSprint,
  deleteSprint,
};
