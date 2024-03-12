const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const versionHistorySchema = new Schema({
  version: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  change: {
    type: String,
    required: true
  },
  changeReason: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  revisionDate: {
    type: Date,
    required: true
  },
  approvalDate: {
    type: Date,
    required: true
  },
  approvedBy: {
    type: String,
    required: true
  }
});

const VersionHistory = mongoose.model('VersionHistory', versionHistorySchema);
module.exports = VersionHistory;
