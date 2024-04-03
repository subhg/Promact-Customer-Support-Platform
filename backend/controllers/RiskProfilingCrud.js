const RiskProfiling = require('../models/RiskProfiling');

// Create a new risk profiling entry
const createRiskProfiling = async (data) => {
  try {
    const riskProfiling = new RiskProfiling(data);
    const result = await riskProfiling.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getRiskProfilingById = async (riskProfilingId) => {
  try {
    const result = await RiskProfiling.findById(riskProfilingId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all risk profilings
const getAllRiskProfiling = async () => {
  try {
    const result = await RiskProfiling.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update risk profiling by ID with new data
const updateRiskProfiling = async (riskProfilingId, newData) => {
  try {
    const result = await RiskProfiling.findByIdAndUpdate(
      riskProfilingId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete risk profiling by ID
const deleteRiskProfiling = async (riskProfilingId) => {
  try {
    const result = await RiskProfiling.findByIdAndDelete(riskProfilingId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createRiskProfiling,
  getRiskProfilingById,
  getAllRiskProfiling,
  updateRiskProfiling,
  deleteRiskProfiling,
};
