// Import the AllProject model
const AllProject = require('../models/AllProject.js');

// Create
const createProject = async (data) => {
  try {
    const project = new AllProject(data);
    const result = await project.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllProjects = async () => {
  try {
    const result = await AllProject.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const getProjectById = async (projectId) => {
  try {
    const result = await AllProject.findById(projectId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateProject = async (projectId, newData) => {
  try {
    const result = await AllProject.findByIdAndUpdate(
      projectId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteProject = async (projectId) => {
  try {
    const result = await AllProject.findByIdAndDelete(projectId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
