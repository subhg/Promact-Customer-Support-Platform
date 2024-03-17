const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectBudgetSchema = new Schema({
  projectType: {
    type: String,
    required: true,
  },
  durationMonths: {
    type: String,
    required: true,
  },
  budgetedHours: {
    type: String,
    required: true,
  },
});

const ProjectBudget = mongoose.model('ProjectBudget', projectBudgetSchema);

module.exports = ProjectBudget;
