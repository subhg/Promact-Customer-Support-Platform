// Import the AllProject model
const AllProject = require('../models/AllProject.js');

// Create
const createProject = async (data) => {
  try {
    // Create a new instance of AllProject using the provided data
    const project = new AllProject(data);
    // Save the new instance to the database
    const result = await project.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllProjects = async () => {
  try {
    // Retrieve all projects from the database
    const result = await AllProject.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getProjectById = async (projectId) => {
  try {
    // Retrieve a specific project by its ID from the database
    const result = await AllProject.findById(projectId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateProject = async (projectId, newData) => {
  try {
    // Find and update the project by its ID with the new data
    const result = await AllProject.findByIdAndUpdate(
      projectId,
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
const deleteProject = async (projectId) => {
  try {
    // Find and delete the project by its ID
    const result = await AllProject.findByIdAndDelete(projectId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
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
