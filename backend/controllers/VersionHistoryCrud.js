// Import the VersionHistory model
const VersionHistory = require('../models/VersionHistory.js');

// Create
const createVersionHistory = async (data) => {
  try {
    const versionHistory = new VersionHistory(data);
    const result = await versionHistory.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllVersionHistory = async () => {
  try {
    const result = await VersionHistory.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const getVersionHistoryById = async (versionHistoryId) => {
  try {
    const result = await VersionHistory.findById(versionHistoryId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateVersionHistory = async (versionHistoryId, newData) => {
  try {
    const result = await VersionHistory.findByIdAndUpdate(
      versionHistoryId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteVersionHistory = async (versionHistoryId) => {
  try {
    const result = await VersionHistory.findByIdAndDelete(versionHistoryId);
    return result;
  } catch (error) {
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
