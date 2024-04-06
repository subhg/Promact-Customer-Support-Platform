// Import the ProjectDescription model
const ProjectDescription = require('../models/ProjectDescription.js');

// Create
const createProjectDescription = async (data) => {
  try {
    const projectDescription = new ProjectDescription(data);
    const result = await projectDescription.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllProjectDescriptions = async () => {
  try {
    const result = await ProjectDescription.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const getProjectDescriptionById = async (descriptionId) => {
  try {
    const result = await ProjectDescription.findById(descriptionId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateProjectDescription = async (descriptionId, newData) => {
  try {
    const result = await ProjectDescription.findByIdAndUpdate(
      descriptionId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteProjectDescription = async (descriptionId) => {
  try {
    const result = await ProjectDescription.findByIdAndDelete(descriptionId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createProjectDescription,
  getAllProjectDescriptions,
  getProjectDescriptionById,
  updateProjectDescription,
  deleteProjectDescription,
};
