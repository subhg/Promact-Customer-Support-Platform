// Import the ProjectStack model
const ProjectStack = require('../models/ProjectStack');

// Create
const createProjectStack = async (data) => {
  try {
    const projectStack = new ProjectStack(data);
    const result = await projectStack.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getProjectStackById = async (projectStackId) => {
  try {
    const result = await ProjectStack.findById(projectStackId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all project stacks
const getAllProjectStacks = async () => {
  try {
    const result = await ProjectStack.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update project stack by ID with new data
const updateProjectStack = async (projectStackId, newData) => {
  try {
    const result = await ProjectStack.findByIdAndUpdate(
      projectStackId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete project stack by ID
const deleteProjectStack = async (projectStackId) => {
  try {
    const result = await ProjectStack.findByIdAndDelete(projectStackId);
    return result;
  } catch (error) {
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
