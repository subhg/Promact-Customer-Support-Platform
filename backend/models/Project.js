// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the approved team schema with phases
const approvedTeamSchema = new Schema({
  phase: {
    type: String,
    required: true
  },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ]
});

// Define the client feedback schema
const clientFeedbackSchema = new Schema({
  feedbackType: {
    type: String,
    required: true
  },
  dateReceived: {
    type: Date,
    required: true
  },
  detailedFeedback: {
    type: String,
    required: true
  },
  actionTaken: {
    type: String
  },
  closureDate: {
    type: Date
  }
});

// Define the project update schema
const projectUpdateSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  generalUpdates: {
    type: String,
    required: true
  }
});

// Define the client meeting schema
const clientMeetingSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  momLink: {
    type: String
  },
  comments: {
    type: String
  }
});

// Define the project schema
const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  approvedTeam: [approvedTeamSchema],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ],
  clientFeedback: [clientFeedbackSchema],
  projectUpdates: [projectUpdateSchema],
  clientMeetings: [clientMeetingSchema],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;