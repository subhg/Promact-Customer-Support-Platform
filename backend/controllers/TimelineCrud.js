// Import the Timeline model
const Timeline = require('../models/Timeline');

// Create
const createTimeline = async (data) => {
  try {
    // Create a new instance of Timeline using the provided data
    const timeline = new Timeline(data);
    // Save the new instance to the database
    const result = await timeline.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getAllTimelines = async () => {
  try {
    // Retrieve all timelines from the database
    const result = await Timeline.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const getTimelineById = async (timelineId) => {
  try {
    // Retrieve a specific timeline by its ID from the database
    const result = await Timeline.findById(timelineId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update
const updateTimeline = async (timelineId, newData) => {
  try {
    // Find and update the timeline by its ID with the new data
    const result = await Timeline.findByIdAndUpdate(
      timelineId,
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
const deleteTimeline = async (timelineId) => {
  try {
    // Find and delete the timeline by its ID
    const result = await Timeline.findByIdAndDelete(timelineId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createTimeline,
  getAllTimelines,
  getTimelineById,
  updateTimeline,
  deleteTimeline,
};
