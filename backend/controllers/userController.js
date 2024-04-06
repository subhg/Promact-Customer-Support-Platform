const User = require('../models/userModel.js');

// Create
const createUser = async (data) => {
  try {
    const user = new User(data);
    // Save the new instance to the database
    const result = await user.save();
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllUser = async () => {
    try {
      const result = await User.find();
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  const getUserRoleById = async (userId) => {
    try {
      const user = await User.findById(userId);
  
      if (user) {
        return user.role;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };
  module.exports={
    createUser,
    getAllUser,
    getUserRoleById,
  };