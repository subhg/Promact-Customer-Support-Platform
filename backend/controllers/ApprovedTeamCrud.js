// Import the ApprovedTeam model
const ApprovedTeam = require('../models/ApprovedTeam.js');

// Create
const createApprovedTeam = async (data) => {
  try {
    // Create a new instance of ApprovedTeam using the provided data
    const approvedTeam = new ApprovedTeam(data);
    // Save the new instance to the database
    const result = await approvedTeam.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllApprovedTeams = async () => {
  try {
    // Retrieve all approved teams from the database
    const result = await ApprovedTeam.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getApprovedTeamById = async (approvedTeamId) => {
  try {
    // Retrieve a specific approved team by its ID from the database
    const result = await ApprovedTeam.findById(approvedTeamId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateApprovedTeam = async (approvedTeamId, newData) => {
  try {
    // Find and update the approved team by its ID with the new data
    const result = await ApprovedTeam.findByIdAndUpdate(
      approvedTeamId,
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
const deleteApprovedTeam = async (approvedTeamId) => {
  try {
    // Find and delete the approved team by its ID
    const result = await ApprovedTeam.findByIdAndDelete(approvedTeamId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createApprovedTeam,
  getAllApprovedTeams,
  getApprovedTeamById,
  updateApprovedTeam,
  deleteApprovedTeam,
};
