// Import the AuditHistory model
const AuditHistory = require('../models/AuditHistory.js');
const { sendEmail } = require('./EmailController.js');
const Stakeholder = require('../models/Stakeholder'); // Import the Stakeholder model


// Create
const createAuditHistory = async (data) => {
  try {
    const auditHistory = new AuditHistory(data);
    const result = await auditHistory.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllAuditHistory = async () => {
  try {
    const result = await AuditHistory.find();
    return result;
  } catch (error) {
    throw error;
  }
};

const getAuditHistoryById = async (auditHistoryId) => {
  try {
    const result = await AuditHistory.findById(auditHistoryId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateAuditHistory = async (auditHistoryId, newData,  stakeholderId) => {
  try {
    console.log(newData)
    const result = await AuditHistory.findByIdAndUpdate(
      auditHistoryId,
      { $set: newData },
      { new: true }
    );

    // Get the updated audit history
    const updatedAuditHistory = await AuditHistory.findById(auditHistoryId);

    // Fetch the stakeholders associated with the updated audit history
    const stakeholders = await Stakeholder.find();
    const contacts = stakeholders.map(stakeholder => stakeholder.contact);
    const names = stakeholders.map(stakeholder => stakeholder.name);

    // Send email to each stakeholder
    const subject = "Audit Update Notification";

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      const name = names[i];

      const message = `Hello ${name},\n\nPlease note that the audit has been completed, and here is the audit summary:\n\n${result}}\n\nLocation: http://localhost:3001/\n\nThanks and Regards,\nPromact Infotech Pvt Ltd`;

      await sendEmail(contact, subject, message);
    }

    console.log('Emails sent successfully');

    return result;
  } catch (error) {
    console.error('Error updating audit history:', error);
    throw error;
  }
};


// Delete
const deleteAuditHistory = async (auditHistoryId) => {
  try {
    const result = await AuditHistory.findByIdAndDelete(auditHistoryId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Export all functions for external use
module.exports = {
  createAuditHistory,
  getAllAuditHistory,
  getAuditHistoryById,
  updateAuditHistory,
  deleteAuditHistory,
};
