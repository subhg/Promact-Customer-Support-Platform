// Import the VersionHistory model
const VersionHistory = require('../models/VersionHistory.js');

// Create
const createVersionHistory = async (data) => {
  try {
    // Create a new instance of VersionHistory using the provided data
    const versionHistory = new VersionHistory(data);
    // Save the new instance to the database
    const result = await versionHistory.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllVersionHistory = async () => {
  try {
    // Retrieve all version history entries from the database
    const result = await VersionHistory.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getVersionHistoryById = async (versionHistoryId) => {
  try {
    // Retrieve a specific version history entry by its ID from the database
    const result = await VersionHistory.findById(versionHistoryId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateVersionHistory = async (versionHistoryId, newData) => {
  try {
    // Find and update the version history entry by its ID with the new data
    const result = await VersionHistory.findByIdAndUpdate(
      versionHistoryId,
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
const deleteVersionHistory = async (versionHistoryId) => {
  try {
    // Find and delete the version history entry by its ID
    const result = await VersionHistory.findByIdAndDelete(versionHistoryId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createVersionHistory,
  getAllVersionHistory,
  getVersionHistoryById,
  updateVersionHistory,
  deleteVersionHistory,
};
