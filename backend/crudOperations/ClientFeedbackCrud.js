const ClientFeedback = require('../models/ClientFeedback');

// Create
const createClientFeedback = async (data) => {
  try {
    const clientFeedback = new ClientFeedback(data);
    const result = await clientFeedback.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getClientFeedbackById = async (clientFeedbackId) => {
  try {
    const result = await ClientFeedback.findById(clientFeedbackId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateClientFeedback = async (clientFeedbackId, newData) => {
  try {
    const result = await ClientFeedback.findByIdAndUpdate(
      clientFeedbackId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteClientFeedback = async (clientFeedbackId) => {
  try {
    const result = await ClientFeedback.findByIdAndDelete(clientFeedbackId);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createClientFeedback,
  getClientFeedbackById,
  updateClientFeedback,
  deleteClientFeedback,
};
