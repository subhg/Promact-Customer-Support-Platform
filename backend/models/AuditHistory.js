const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the audit history
const auditHistorySchema = new Schema({
  dateOfAudit: {
    type: Date,
    required: true,
  },
  reviewedBy: {
    type: String,
    required: true,
  },
  statusReviewed: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  commentQueries: {
    type: String,
  },
  actionItem: {
    type: String,
  },
});

// Create the AuditHistory model
const AuditHistory = mongoose.model('AuditHistory', auditHistorySchema);

module.exports = AuditHistory;
