// Import the Sprint model
const Sprint = require('../models/Sprint');

// Create
const createSprint = async (data) => {
  try {
    // Create a new instance of Sprint using the provided data
    const sprint = new Sprint(data);
    // Save the new instance to the database
    const result = await sprint.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read all
const getAllSprints = async () => {
  try {
    // Retrieve all sprints from the database
    const result = await Sprint.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read by ID
const getSprintById = async (sprintId) => {
  try {
    // Retrieve a specific sprint by its ID from the database
    const result = await Sprint.findById(sprintId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateSprint = async (sprintId, newData) => {
  try {
    // Find and update the sprint by its ID with the new data
    const result = await Sprint.findByIdAndUpdate(
      sprintId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete
const deleteSprint = async (sprintId) => {
  try {
    // Find and delete the sprint by its ID
    const result = await Sprint.findByIdAndDelete(sprintId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
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
