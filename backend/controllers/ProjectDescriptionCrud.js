// Import the ProjectDescription model
const ProjectDescription = require('../models/ProjectDescription.js');

// Create
const createProjectDescription = async (data) => {
  try {
    // Create a new instance of ProjectDescription using the provided data
    const projectDescription = new ProjectDescription(data);
    // Save the new instance to the database
    const result = await projectDescription.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllProjectDescriptions = async () => {
  try {
    // Retrieve all project descriptions from the database
    const result = await ProjectDescription.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getProjectDescriptionById = async (descriptionId) => {
  try {
    // Retrieve a specific project description by its ID from the database
    const result = await ProjectDescription.findById(descriptionId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateProjectDescription = async (descriptionId, newData) => {
  try {
    // Find and update the project description by its ID with the new data
    const result = await ProjectDescription.findByIdAndUpdate(
      descriptionId,
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
const deleteProjectDescription = async (descriptionId) => {
  try {
    // Find and delete the project description by its ID
    const result = await ProjectDescription.findByIdAndDelete(descriptionId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
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
