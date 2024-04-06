// Import the Timeline model
const Timeline = require('../models/Timeline');

// Create
const createTimeline = async (data) => {
  try {
    const timeline = new Timeline(data);
    const result = await timeline.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllTimelines = async () => {
  try {
    const result = await Timeline.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const getTimelineById = async (timelineId) => {
  try {
    const result = await Timeline.findById(timelineId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateTimeline = async (timelineId, newData) => {
  try {
    const result = await Timeline.findByIdAndUpdate(
      timelineId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteTimeline = async (timelineId) => {
  try {
    const result = await Timeline.findByIdAndDelete(timelineId);
    return result;
  } catch (error) {
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
