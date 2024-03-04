const ClientMeeting = require('../models/ClientMeeting');

// Create
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

// Update
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

// Delete
const deleteClientMeeting = async (clientMeetingId) => {
  try {
    const result = await ClientMeeting.findByIdAndDelete(clientMeetingId);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createClientMeeting,
  getClientMeetingById,
  updateClientMeeting,
  deleteClientMeeting,
};
