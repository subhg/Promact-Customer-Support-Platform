// Import the ProjectBudget model
const ProjectBudget = require('../models/ProjectBudget');

// Create a new project budget entry
const createProjectBudget = async (data) => {
  try {
    // Create a new instance of ProjectBudget using the provided data
    const projectBudget = new ProjectBudget(data);
    // Save the new instance to the database
    const result = await projectBudget.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getProjectBudgetById = async (projectBudgetId) => {
  try {
    // Retrieve a specific project budget by its ID from the database
    const result = await ProjectBudget.findById(projectBudgetId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all project budgets
const getAllProjectBudgets = async () => {
  try {
    // Retrieve all project budgets from the database
    const result = await ProjectBudget.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update project budget by ID with new data
const updateProjectBudget = async (projectBudgetId, newData) => {
  try {
    // Find and update the project budget by its ID with the new data
    const result = await ProjectBudget.findByIdAndUpdate(
      projectBudgetId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete project budget by ID
const deleteProjectBudget = async (projectBudgetId) => {
  try {
    // Find and delete the project budget by its ID
    const result = await ProjectBudget.findByIdAndDelete(projectBudgetId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createProjectBudget,
  getProjectBudgetById,
  getAllProjectBudgets,
  updateProjectBudget,
  deleteProjectBudget,
};
