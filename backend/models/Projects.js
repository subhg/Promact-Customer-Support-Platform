const mongoose = require('mongoose');

// Define Schema for Projects
const projectsSchema = new mongoose.Schema({
    // Fields specific to Projects
    // ...

    // Reference to AllProject model
    allProject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AllProject'
    },

    // Reference to ApprovedTeam model
    approvedTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApprovedTeam'
    },

    // Reference to AuditHistory model
    auditHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuditHistory'
    },

    // Reference to AuditorProjectForm model
    auditorProjectForm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuditorProjectForm'
    },

    // Reference to ClientFeedback model
    clientFeedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientFeedback'
    },

    // Reference to ClientMeeting model
    clientMeeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClientMeeting'
    },

    // Reference to EscalationMatrix model
    escalationMatrix: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EscalationMatrix'
    },

    // Reference to Phases model
    phases: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Phases'
    },

    // Reference to ProjectBudget model
    projectBudget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectBudget'
    },

    // Reference to ProjectDescription model
    projectDescription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectDescription'
    },

    // Reference to ProjectStack model
    projectStack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectStack'
    },

    // Reference to ProjectUpdate model
    projectUpdate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectUpdate'
    },

    // Reference to Resource model
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
    },

    // Reference to RiskProfiling model
    riskProfiling: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RiskProfiling'
    },

    // Reference to Scope model
    scope: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scope'
    },

    // Reference to Sprint model
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint'
    },

    // Reference to Stakeholder model
    stakeholder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stakeholder'
    },

    // Reference to Timeline model
    timeline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Timeline'
    },

    // Reference to VersionHistory model
    versionHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VersionHistory'
    }
});

// Create and export Projects model
const Projects = mongoose.model('Projects', projectsSchema);
module.exports = Projects;
