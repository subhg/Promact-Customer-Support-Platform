// Import the AuditHistory model
const AuditHistory = require('../models/AuditHistory.js');

// Create
const createAuditHistory = async (data) => {
  try {
    // Create a new instance of AuditHistory using the provided data
    const auditHistory = new AuditHistory(data);
    // Save the new instance to the database
    const result = await auditHistory.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllAuditHistory = async () => {
  try {
    // Retrieve all audit history entries from the database
    const result = await AuditHistory.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getAuditHistoryById = async (auditHistoryId) => {
  try {
    // Retrieve a specific audit history entry by its ID from the database
    const result = await AuditHistory.findById(auditHistoryEntryId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateAuditHistory = async (auditHistoryId, newData) => {
  try {
    // Find and update the audit history entry by its ID with the new data
    const result = await AuditHistory.findByIdAndUpdate(
      auditHistoryEntryId,
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
const deleteAuditHistory = async (auditHistoryId) => {
  try {
    // Find and delete the audit history entry by its ID
    const result = await AuditHistory.findByIdAndDelete(auditHistoryEntryId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createAuditHistory,
  getAllAuditHistory,
  getAuditHistoryById,
  updateAuditHistory,
  deleteAuditHistory,
};
