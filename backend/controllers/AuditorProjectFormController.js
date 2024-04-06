const AuditorProjectForm = require('../models/AuditorProjectForm.js');

// Create
const createAuditorProjectForm = async (data) => {
  try {
    const auditorProjectForm = new AuditorProjectForm(data);
    const result = await auditorProjectForm.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all
const getAllAuditorProjectForm = async () => {
  try {
    const result = await AuditorProjectForm.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateAuditorProjectForm = async (auditorProjectFormId, newData) => {
  try {
    const result = await AuditorProjectForm.findByIdAndUpdate(
      auditorProjectFormId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteAuditorProjectForm = async (auditorProjectFormId) => {
  try {
    const result = await AuditorProjectForm.findByIdAndDelete(auditorProjectFormId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createAuditorProjectForm,
  getAllAuditorProjectForm,
  updateAuditorProjectForm,
  deleteAuditorProjectForm
};