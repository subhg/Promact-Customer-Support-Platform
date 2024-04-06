// Import the ProjectBudget model
const ProjectBudget = require('../models/ProjectBudget');

// Create a new project budget entry
const createProjectBudget = async (data) => {
  try {
    const projectBudget = new ProjectBudget(data);
    const result = await projectBudget.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getProjectBudgetById = async (projectBudgetId) => {
  try {
    const result = await ProjectBudget.findById(projectBudgetId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Read all project budgets
const getAllProjectBudgets = async () => {
  try {
    const result = await ProjectBudget.find();
    return result;
  } catch (error) {
    throw error;
  }
};

// Update project budget by ID with new data
const updateProjectBudget = async (projectBudgetId, newData) => {
  try {
    const result = await ProjectBudget.findByIdAndUpdate(
      projectBudgetId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete project budget by ID
const deleteProjectBudget = async (projectBudgetId) => {
  try {
    const result = await ProjectBudget.findByIdAndDelete(projectBudgetId);
    return result;
  } catch (error) {
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
