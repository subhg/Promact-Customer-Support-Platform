// Import the Phases model
const Phases = require('../models/Phases');

// Create a new phases entry
const createPhases = async (data) => {
  try {
    console.log(data);
    // Create a new instance of Phases using the provided data
    const phases = new Phases(data);
    console.log(phases);
    // Save the new instance to the database
    const result = await phases.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getPhasesById = async (phasesId) => {
  try {
    // Retrieve specific phases by its ID from the database
    const result = await Phases.findById(phasesId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all phases
const getAllPhases = async () => {
  try {
    // Retrieve all phases from the database
    const result = await Phases.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update phases by ID with new data
const updatePhases = async (phasesId, newData) => {
  try {
    // Find and update phases by its ID with the new data
    const result = await Phases.findByIdAndUpdate(
      phasesId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete phases by ID
const deletePhases = async (phasesId) => {
  try {
    // Find and delete phases by its ID
    const result = await Phases.findByIdAndDelete(phasesId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createPhases,
  getPhasesById,
  getAllPhases,
  updatePhases,
  deletePhases,
};
