const ApprovedTeam = require('../models/ApprovedTeam.js');

// Create
const createApprovedTeam = async (data) => {
  try {
    const approvedTeam = new ApprovedTeam(data);
    const result = await approvedTeam.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getApprovedTeamById = async (approvedTeamId) => {
  try {
    const result = await ApprovedTeam.findById(approvedTeamId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateApprovedTeam = async (approvedTeamId, newData) => {
  try {
    const result = await ApprovedTeam.findByIdAndUpdate(
      approvedTeamId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteApprovedTeam = async (approvedTeamId) => {
  try {
    const result = await ApprovedTeam.findByIdAndDelete(approvedTeamId);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createApprovedTeam,
  getApprovedTeamById,
  updateApprovedTeam,
  deleteApprovedTeam,
};
