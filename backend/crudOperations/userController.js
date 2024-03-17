// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');

// /* ADD USER */
// const addUser = async (req, res) => {
//   try {
//     const { name, role, email, password } = req.body;

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     // Hash the password before saving it to the database
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const userDoc = await User.create({
//       name,
//       role,
//       email,
//       password: hashedPassword,  // Save the hashed password
//     });

//     return res.status(200).json(userDoc);
//   } catch (error) {
//     console.log(error);
//     return res.json({ message: `Error occurred ${error}` });
//   }
// };

// /* GET ALL USERS */
// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users) {
//       return res.status(200).json(users);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({ message: `Error occurred ${error}` });
//   }
// };
// module.exports = {
//     addUser,
//     getUsers,
// }

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