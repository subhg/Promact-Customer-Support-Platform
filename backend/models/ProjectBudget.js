const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectBudgetSchema = new Schema({
  projectType: {
    type: String,
    required: true,
  },
  durationMonths: {
    type: Number,
    required: true,
  },
  budgetedHours: {
    type: Number,
    required: true,
  },
});

const ProjectBudget = mongoose.model('ProjectBudget', projectBudgetSchema);

module.exports = ProjectBudget;
