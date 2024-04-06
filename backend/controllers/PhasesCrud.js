// Import the Phases model
const Phases = require('../models/Phases');

// Create a new phases entry
const createPhases = async (data) => {
  try {
    console.log(data);
    const phases = new Phases(data);
    console.log(phases);
    const result = await phases.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getPhasesById = async (phasesId) => {
  try {
    const result = await Phases.findById(phasesId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all phases
const getAllPhases = async () => {
  try {
    const result = await Phases.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update phases by ID with new data
const updatePhases = async (phasesId, newData) => {
  try {
    const result = await Phases.findByIdAndUpdate(
      phasesId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete phases by ID
const deletePhases = async (phasesId) => {
  try {
    const result = await Phases.findByIdAndDelete(phasesId);
    return result;
  } catch (error) {
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
