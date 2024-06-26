const EscalationMatrix = require('../models/EscalationMatrix');
const { Types } = require('mongoose');


// Create
const createEscalationLevel = async (type, data) => {
  try {
    let escalationMatrix = await EscalationMatrix.findOne();
    if (!escalationMatrix) {
      escalationMatrix = new EscalationMatrix();
    }
    escalationMatrix[type].push(data);
    // Save the changes
    const result = await escalationMatrix.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getEscalationLevelsByType = async (type) => {
  try {
    const escalationMatrix = await EscalationMatrix.findOne();
    return escalationMatrix[type];
  } catch (error) {
    throw error;
  }
};

const updateEscalationLevel = async (type, levelId, newData) => {
  try {
    // Find the EscalationMatrix document
    console.log(type)
    console.log(levelId)
    let escalationMatrix = await EscalationMatrix.findOne();

    console.log('Escalation Matrix before update:', escalationMatrix);

    const index = escalationMatrix[type].findIndex(level => level._id.toString() === levelId);
    console.log('Index:', index);

    if (index !== -1) {
      // Update the level with the new data
      escalationMatrix[type][index].escalationLevel = newData.escalationLevel;
      escalationMatrix[type][index].name = newData.name;

      // Save the changes
      escalationMatrix = await escalationMatrix.save();
      return escalationMatrix; // Return the updated document
    } else {
      throw new Error('Escalation level not found');
    }
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteEscalationLevel = async (type, levelId) => {
  try {
    const escalationMatrix = await EscalationMatrix.findOne();
    escalationMatrix[type] = escalationMatrix[type].filter(level => level._id !== levelId);
    const result = await escalationMatrix.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createEscalationLevel,
  getEscalationLevelsByType,
  updateEscalationLevel,
  deleteEscalationLevel,
};
