// Import the ProjectUpdate model
const ProjectUpdate = require('../models/ProjectUpdate');

// Create a new project update entry
const createProjectUpdate = async (data) => {
  try {
    // Create a new instance of ProjectUpdate using the provided data
    const projectUpdate = new ProjectUpdate(data);
    // Save the new instance to the database
    const result = await projectUpdate.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getProjectUpdateById = async (projectUpdateId) => {
  try {
    // Retrieve a specific project update by its ID from the database
    const result = await ProjectUpdate.findById(projectUpdateId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all project updates
const getAllProjectUpdate = async () => {
  try {
    // Retrieve all project updates from the database
    const result = await ProjectUpdate.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update project update by ID with new data
const updateProjectUpdate = async (projectUpdateId, newData) => {
  try {
    // Find and update the project update by its ID with the new data
    const result = await ProjectUpdate.findByIdAndUpdate(
      projectUpdateId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete project update by ID
const deleteProjectUpdate = async (projectUpdateId) => {
  try {
    // Find and delete the project update by its ID
    const result = await ProjectUpdate.findByIdAndDelete(projectUpdateId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createProjectUpdate,
  getProjectUpdateById,
  getAllProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
};
