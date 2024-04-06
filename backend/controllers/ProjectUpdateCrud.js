// Import the ProjectUpdate model
const ProjectUpdate = require('../models/ProjectUpdate');

// Create a new project update entry
const createProjectUpdate = async (data) => {
  try {
    const projectUpdate = new ProjectUpdate(data);
    const result = await projectUpdate.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getProjectUpdateById = async (projectUpdateId) => {
  try {
    const result = await ProjectUpdate.findById(projectUpdateId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all project updates
const getAllProjectUpdate = async () => {
  try {
    const result = await ProjectUpdate.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update project update by ID with new data
const updateProjectUpdate = async (projectUpdateId, newData) => {
  try {
    const result = await ProjectUpdate.findByIdAndUpdate(
      projectUpdateId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete project update by ID
const deleteProjectUpdate = async (projectUpdateId) => {
  try {
    const result = await ProjectUpdate.findByIdAndDelete(projectUpdateId);
    return result;
  } catch (error) {
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
