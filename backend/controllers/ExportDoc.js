// Import models
const AllProject = require('../models/AllProject');
const ApprovedTeam = require('../models/ApprovedTeam');
const AuditHistory = require('../models/AuditHistory');
const AuditorProjectForm = require('../models/AuditorProjectForm');
const ClientFeedback = require('../models/ClientFeedback');
const ClientMeeting = require('../models/ClientMeeting');
const EscalationMatrix = require('../models/EscalationMatrix');
const Phases = require('../models/Phases');
const ProjectBudget = require('../models/ProjectBudget');
const ProjectDescription = require('../models/ProjectDescription');
const ProjectStack = require('../models/ProjectStack');
const ProjectUpdate = require('../models/ProjectUpdate');
const Resource = require('../models/Resource');
const RiskProfiling = require('../models/RiskProfiling');
const Scope = require('../models/Scope');
const Sprint = require('../models/Sprint');
const Stakeholder = require('../models/Stakeholder');
const VersionHistory = require('../models/VersionHistory');

// Function to generate HTML tables with data from models
const generateHtmlTables = async () => {
    try {
        // Fetch data from the models
        const allProjects = await AllProject.find();
        const approvedTeams = await ApprovedTeam.find();
        const auditHistory = await AuditHistory.find();
        const auditorProjectForms = await AuditorProjectForm.find();
        const clientFeedbacks = await ClientFeedback.find();
        const clientMeetings = await ClientMeeting.find();
        const escalationMatrix = await EscalationMatrix.find();
        const phases = await Phases.find();
        const projectBudget = await ProjectBudget.find();
        const projectDescription = await ProjectDescription.find();
        const projectStack = await ProjectStack.find();
        const projectUpdates = await ProjectUpdate.find();
        const resources = await Resource.find();
        const riskData = await RiskProfiling.find();
        const scope = await Scope.find();
        const sprints = await Sprint.find();
        const stakeholders = await Stakeholder.find();
        const versionHistory = await VersionHistory.find();

        // Render HTML tables with the fetched data
        const htmlContent = `
        <!-- Approved Teams -->
        <h2>Approved Teams</h2>
        <table>
            <thead>
                <tr>
                    <th>Phase</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Availability</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                ${approvedTeams.map(team => `
                    <tr>
                        <td>${team.phase}</td>
                        <td>${team.name}</td>
                        <td>${team.role}</td>
                        <td>${team.availability}</td>
                        <td>${team.duration}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Audit History -->
        <h2>Audit History</h2>
        <table>
            <thead>
                <tr>
                    <th>Date of Audit</th>
                    <th>Reviewed By</th>
                    <th>Status Reviewed</th>
                    <th>Section</th>
                    <th>Comment Queries</th>
                    <th>Action Item</th>
                </tr>
            </thead>
            <tbody>
                ${auditHistory.map(history => `
                    <tr>
                        <td>${history.dateOfAudit}</td>
                        <td>${history.reviewedBy}</td>
                        <td>${history.statusReviewed}</td>
                        <td>${history.section}</td>
                        <td>${history.commentQueries}</td>
                        <td>${history.actionItem}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Auditor Project Forms -->
        <h2>Auditor Project Forms</h2>
        <table>
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Project Manager</th>
                    <th>Clients</th>
                </tr>
            </thead>
            <tbody>
                ${auditorProjectForms.map(form => `
                    <tr>
                        <td>${form.projectName}</td>
                        <td>${form.projectManager}</td>
                        <td>
                            <ul>
                                ${form.clients.map(client => `<li>${client.clientName} - ${client.clientMail}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Client Feedback -->
        <h2>Client Feedback</h2>
        <table>
            <thead>
                <tr>
                    <th>Feedback Type</th>
                    <th>Date Received</th>
                    <th>Detailed Feedback</th>
                    <th>Action Taken</th>
                    <th>Closure Date</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>
                ${clientFeedbacks.map(feedback => `
                    <tr>
                        <td>${feedback.feedbackType}</td>
                        <td>${feedback.dateReceived}</td>
                        <td>${feedback.detailedFeedback}</td>
                        <td>${feedback.actionTaken}</td>
                        <td>${feedback.closureDate}</td>
                        <td>${feedback.project}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Client Meetings -->
        <h2>Client Meetings</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>MOM Link</th>
                    <th>Comments</th>
                    <th>Project</th>
                </tr>
            </thead>
            <tbody>
                ${clientMeetings.map(meeting => `
                    <tr>
                        <td>${meeting.date}</td>
                        <td>${meeting.duration}</td>
                        <td>${meeting.momLink}</td>
                        <td>${meeting.comments}</td>
                        <td>${meeting.project}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Escalation Matrix -->
        <h2>Escalation Matrix</h2>
<table>
    <thead>
        <tr>
            <th>Operational</th>
            <th>Financial</th>
            <th>Technical</th>
        </tr>
    </thead>
    <tbody>
        ${escalationMatrix.map(matrix => `
            <tr>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>Escalation Level</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${matrix.operational.escalationLevel}</td>
                                <td>${matrix.operational.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>Escalation Level</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${matrix.financial.escalationLevel}</td>
                                <td>${matrix.financial.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td>
                    <table>
                        <thead>
                            <tr>
                                <th>Escalation Level</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${matrix.technical.escalationLevel}</td>
                                <td>${matrix.technical.name}</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        `).join('')}
    </tbody>
</table>
        
        <!-- Phases -->
        <h2>Phases</h2>
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Start Date</th>
                <th>Completion Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Revised Completion Date</th>
                <th>Comments</th>
                </tr>
            </thead>
            <tbody>
                ${phases.map(phase => `
                    <tr>
                    <td>${phase.title}</td>
                    <td>${phase.startDate}</td>
                    <td>${phase.completionDate}</td>
                    <td>${phase.approvalDate}</td>
                    <td>${phase.status}</td>
                    <td>${phase.revisedCompletionDate}</td>
                    <td>${phase.comments}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Project Budget -->
        <h2>Project Budget</h2>
        <table>
            <thead>
                <tr>
                <th>Project Type</th>
                <th>Duration (Months)</th>
                <th>Budgeted Hours</th>
                </tr>
            </thead>
            <tbody>
                ${projectBudget.map(budget => `
                    <tr>
                        <td>${budget.projectType}</td>
                        <td>${budget.durationMonths}</td>
                        <td>${budget.budgetedHours}</td>
                        
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
       
        <!-- Project Stack -->
        <h2>Project Stack</h2>
        <table>
            <thead>
                <tr>
                    <th>Project stack</th>
                    
                </tr>
            </thead>
            <tbody>
                ${projectStack.map(stack => `
                    <tr>
                        <td>${stack.tech}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Project Updates -->
        <h2>Project Updates</h2>
        <table>
            <thead>
                <tr>
                <th>Date</th>
                <th>General Updates</th>
                <th>Project</th>
                </tr>
            </thead>
            <tbody>
                ${projectUpdates.map(update => `
                    <tr>
                        <td>${update.date}</td>
                        <td>${update.generalUpdates}</td>
                        <td>${update.project}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Resources -->
        <h2>Resources</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Comment</th>
                </tr>
            </thead>
            <tbody>
                ${resources.map(resource => `
                    <tr>
                        <td>${resource.name}</td>
                        <td>${resource.role}</td>
                        <td>${resource.startDate}</td>
                        <td>${resource.endDate}</td>
                        <td>${resource.comment}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Risk Profiling -->
        <h2>Risk Profiling</h2>
        <table>
            <thead>
                <tr>
                <th>Risk Type</th>
                <th>Description</th>
                <th>Severity</th>
                <th>Impact</th>
                <th>Remedial Steps</th>
                <th>Status</th>
                <th>Closure Date</th>
                </tr>
            </thead>
            <tbody>
                ${riskData.map((risk) => 
                (`
                    <tr key=${risk._id}>
                      <td>${risk.riskType}</td>
                      <td>${risk.description}</td>
                      <td>${risk.severity}</td>
                      <td>${risk.impact}</td>
                      <td>${risk.remedialSteps}</td>
                      <td>${risk.status}</td>
                      <td>${risk.closureDate}</td>
                    </tr>
                `))
                .join('')}
            </tbody>
        </table>
        
        <!-- Scope -->
        <h2>Scope</h2>
        <table>
            <thead>
                <tr>
                    <th>Project Scope</th>
                </tr>
            </thead>
            <tbody>
                ${scope.map(scopeItem => `
                    <tr>
                        <td>${scopeItem.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Sprints -->
        <h2>Sprints</h2>
        <table>
            <thead>
                <tr>
                <th>Sprint</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Comments</th>
                </tr>
            </thead>
            <tbody>
                ${sprints.map(sprint => `
                    <tr>
                        <td>${sprint.sprint}</td>
                        <td>${sprint.startDate}</td>
                        <td>${sprint.endDate}</td>
                        <td>${sprint.status}</td>
                        <td>${sprint.comments}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Stakeholders -->
        <h2>Stakeholders</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                ${stakeholders.map(stakeholder => `
                    <tr>
                        <td>${stakeholder.title}</td>
                        <td>${stakeholder.name}</td>
                        <td>${stakeholder.contact}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        
        <!-- Version History -->
        <h2>Version History</h2>
        <table>
            <thead>
                <tr>
                <th>Version</th>
                <th>Type</th>
                <th>Change</th>
                <th>Change Reason</th>
                <th>Created By</th>
                <th>Revision Date</th>
                <th>Approval Date</th>
                <th>Approved By</th>
                </tr>
            </thead>
            <tbody>
                ${versionHistory.map(version => `
                    <tr>
                        <td>${version.version}</td>
                        <td>${version.type}</td>
                        <td>${version.change}</td>
                        <td>${version.changeReason}</td>
                        <td>${version.createdBy}</td>
                        <td>${version.revisionDate}</td>
                        <td>${version.approvalDate}</td>
                        <td>${version.approvalBy}</td>
                        
                    </tr>
                `).join('')}
            </tbody>
        </table>
        `;
        return htmlContent;
    } catch (error) {
        console.error('Error generating HTML tables:', error);
        throw error;
    }
}

module.exports={generateHtmlTables};