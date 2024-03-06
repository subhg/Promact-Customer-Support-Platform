// Import the required modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the approved team schema with phases
const approvedTeamSchema = new Schema({
  phase: {
    type: String,
    required: true // Phase of the approved team is a required field
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
    required: true // Type of feedback is a required field
  },
  dateReceived: {
    type: Date,
    required: true // Date of feedback receipt is a required field
  },
  detailedFeedback: {
    type: String,
    required: true // Detailed feedback is a required field
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
    required: true // Date of the update is a required field
  },
  generalUpdates: {
    type: String,
    required: true // General updates is a required field
  }
});

// Define the client meeting schema
const clientMeetingSchema = new Schema({
  date: {
    type: Date,
    required: true // Date of the meeting is a required field
  },
  duration: {
    type: String,
    required: true // Duration of the meeting is a required field
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
    required: true // Project name is a required field
  },
  description: {
    type: String // Description of the project (optional field)
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
    required: true // Creator of the project is a required field
  },
  createdAt: {
    type: Date,
    default: Date.now // Default value for the creation date
  },
  updatedAt: {
    type: Date // Date when the project was last updated (optional field)
  }
});

// Create the Project model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
