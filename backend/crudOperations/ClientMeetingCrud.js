// Import the ClientMeeting model
const ClientMeeting = require('../models/ClientMeeting');

// Create a new client meeting entry
const createClientMeeting = async (data) => {
  try {
    // Create a new instance of ClientMeeting using the provided data
    const clientMeeting = new ClientMeeting(data);
    // Save the new instance to the database
    const result = await clientMeeting.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getClientMeetingById = async (clientMeetingId) => {
  try {
    // Retrieve a specific client meeting by its ID from the database
    const result = await ClientMeeting.findById(clientMeetingId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all client meetings
const getAllClientMeeting = async () => {
  try {
    // Retrieve all client meetings from the database
    const result = await ClientMeeting.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update client meeting by ID with new data
const updateClientMeeting = async (clientMeetingId, newData) => {
  try {
    // Find and update the client meeting by its ID with the new data
    const result = await ClientMeeting.findByIdAndUpdate(
      clientMeetingId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete client meeting by ID
const deleteClientMeeting = async (clientMeetingId) => {
  try {
    // Find and delete the client meeting by its ID
    const result = await ClientMeeting.findByIdAndDelete(clientMeetingId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
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
