const ApprovedTeam = require('../models/ApprovedTeam.js');

// Create
const createApprovedTeam = async (data) => {
  try {
    const arr=[]
    for (const item of data){
      const approvedTeam= new ApprovedTeam(item);
      console.log (approvedTeam)
      const result= await approvedTeam.save();
      arr.push(result)
    }
    //const approvedTeam = new ApprovedTeam(data);
    //console.log(approvedTeam)
    
    return arr;
  } catch (error) {
    throw error;
  }
};

// Read
const getAllApprovedTeams = async () => {
  try {
    const result = await ApprovedTeam.find();
    return result;
  } catch (error) {
    throw error;
  }
};




const getApprovedTeamById = async (approvedTeamId) => {
  try {
    const result = await ApprovedTeam.findById(approvedTeamId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateApprovedTeam = async (approvedTeamId, newData) => {
  try {
    const result = await ApprovedTeam.findByIdAndUpdate(
      approvedTeamId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteApprovedTeam = async (approvedTeamId) => {
  try {
    const result = await ApprovedTeam.findByIdAndDelete(approvedTeamId);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createApprovedTeam,
  getAllApprovedTeams,
  getApprovedTeamById,
  updateApprovedTeam,
  deleteApprovedTeam,
};
