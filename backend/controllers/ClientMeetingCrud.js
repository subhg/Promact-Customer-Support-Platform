// Import the ClientMeeting model
const ClientMeeting = require('../models/ClientMeeting');

// Create a new client meeting entry
const createClientMeeting = async (data) => {
  try {
    const clientMeeting = new ClientMeeting(data);
    const result = await clientMeeting.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getClientMeetingById = async (clientMeetingId) => {
  try {
    const result = await ClientMeeting.findById(clientMeetingId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all client meetings
const getAllClientMeeting = async () => {
  try {
    const result = await ClientMeeting.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update client meeting by ID with new data
const updateClientMeeting = async (clientMeetingId, newData) => {
  try {
    const result = await ClientMeeting.findByIdAndUpdate(
      clientMeetingId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete client meeting by ID
const deleteClientMeeting = async (clientMeetingId) => {
  try {
    const result = await ClientMeeting.findByIdAndDelete(clientMeetingId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createClientMeeting,
  getClientMeetingById,
  getAllClientMeeting,
  updateClientMeeting,
  deleteClientMeeting,
};
