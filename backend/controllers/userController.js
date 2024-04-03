const User = require('../models/userModel.js');

// Create
const createUser = async (data) => {
  try {
    // Create a new instance of User using the provided data
    const user = new User(data);
    // Save the new instance to the database
    const result = await user.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

const getAllUser = async () => {
    try {
      // Retrieve all approved teams from the database
      const result = await User.find();
      return result;
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      throw error;
    }
  };
  
  const getUserRoleById = async (userId) => {
    try {
      // Find the user by their ID in the database
      const user = await User.findById(userId);
  
      // If user is found, return their role
      if (user) {
        return user.role;
      } else {
        // If user is not found, return null or throw an error, depending on your preference
        return null;
      }
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      throw error;
    }
  };
  module.exports={
    createUser,
    getAllUser,
    getUserRoleById,
  };