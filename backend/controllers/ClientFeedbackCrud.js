// Import the ClientFeedback model
const ClientFeedback = require('../models/ClientFeedback');

// Create
const createClientFeedback = async (data) => {
  try {
    // Create a new instance of ClientFeedback using the provided data
    const clientFeedback = new ClientFeedback(data);
    // Save the new instance to the database
    const result = await clientFeedback.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getClientFeedbackById = async (clientFeedbackId) => {
  try {
    // Retrieve a specific client feedback by its ID from the database
    const result = await ClientFeedback.findById(clientFeedbackId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateClientFeedback = async (clientFeedbackId, newData) => {
  try {
    // Find and update the client feedback by its ID with the new data
    const result = await ClientFeedback.findByIdAndUpdate(
      clientFeedbackId,
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
const deleteClientFeedback = async (clientFeedbackId) => {
  try {
    // Find and delete the client feedback by its ID
    const result = await ClientFeedback.findByIdAndDelete(clientFeedbackId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Read all client feedback
const getAllClientFeedback = async () => {
  try {
    // Retrieve all client feedback from the database
    const result = await ClientFeedback.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createClientFeedback,
  getClientFeedbackById,
  getAllClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
};
