const ProjectUpdate = require('../models/ProjectUpdate');

// Create
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

const getAllProjectUpdate = async () => {
  try {
    const result = await ProjectUpdate.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
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

// Delete
const deleteProjectUpdate = async (projectUpdateId) => {
  try {
    const result = await ProjectUpdate.findByIdAndDelete(projectUpdateId);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProjectUpdate,
  getProjectUpdateById,
  getAllProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
};
