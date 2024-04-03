// Import the ProjectStack model
const ProjectStack = require('../models/ProjectStack');

// Create
const createProjectStack = async (data) => {
  try {
    // Create a new instance of ProjectStack using the provided data
    const projectStack = new ProjectStack(data);
    // Save the new instance to the database
    const result = await projectStack.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getProjectStackById = async (projectStackId) => {
  try {
    // Retrieve a specific project stack by its ID from the database
    const result = await ProjectStack.findById(projectStackId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all project stacks
const getAllProjectStacks = async () => {
  try {
    // Retrieve all project stacks from the database
    const result = await ProjectStack.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update project stack by ID with new data
const updateProjectStack = async (projectStackId, newData) => {
  try {
    // Find and update the project stack by its ID with the new data
    const result = await ProjectStack.findByIdAndUpdate(
      projectStackId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete project stack by ID
const deleteProjectStack = async (projectStackId) => {
  try {
    // Find and delete the project stack by its ID
    const result = await ProjectStack.findByIdAndDelete(projectStackId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createProjectStack,
  getProjectStackById,
  getAllProjectStacks,
  updateProjectStack,
  deleteProjectStack,
};
