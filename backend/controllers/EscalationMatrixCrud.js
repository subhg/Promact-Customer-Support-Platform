const EscalationMatrix = require('../models/EscalationMatrix');
const { Types } = require('mongoose');


// Create
const createEscalationLevel = async (type, data) => {
  try {
    // Find the EscalationMatrix document
    let escalationMatrix = await EscalationMatrix.findOne();
    // If no document exists, create a new one
    if (!escalationMatrix) {
      escalationMatrix = new EscalationMatrix();
    }
    // Add the new escalation level to the appropriate type
    escalationMatrix[type].push(data);
    // Save the changes
    const result = await escalationMatrix.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getEscalationLevelsByType = async (type) => {
  try {
    // Find the EscalationMatrix document
    const escalationMatrix = await EscalationMatrix.findOne();
    // Return the escalation levels of the specified type
    return escalationMatrix[type];
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

const updateEscalationLevel = async (type, levelId, newData) => {
  try {
    // Find the EscalationMatrix document
    console.log(type)
    console.log(levelId)
    let escalationMatrix = await EscalationMatrix.findOne();

    // Log the escalationMatrix before updating
    console.log('Escalation Matrix before update:', escalationMatrix);

    // Find the index of the level to update
    const index = escalationMatrix[type].findIndex(level => level._id.toString() === levelId);
    // Log the index value for debugging
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
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete
const deleteEscalationLevel = async (type, levelId) => {
  try {
    // Find the EscalationMatrix document
    const escalationMatrix = await EscalationMatrix.findOne();
    // Remove the level from the specified type
    escalationMatrix[type] = escalationMatrix[type].filter(level => level._id !== levelId);
    // Save the changes
    const result = await escalationMatrix.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
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
