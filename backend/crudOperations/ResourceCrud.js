// Import the Resource model
const Resource = require('../models/Resource');

// Create a new resource entry
const createResource = async (data) => {
  try {
    // Create a new instance of Resource using the provided data
    const resource = new Resource(data);
    // Save the new instance to the database
    const result = await resource.save();
    return result;
  } catch (error) {
    // Handle any errors that occur during the creation process
    throw error;
  }
};

// Read
const getResourceById = async (resourceId) => {
  try {
    // Retrieve a specific resource by its ID from the database
    const result = await Resource.findById(resourceId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Read all resources
const getAllResource = async () => {
  try {
    // Retrieve all resources from the database
    const result = await Resource.find();
    return result;
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    throw error;
  }
};

// Update resource by ID with new data
const updateResource = async (resourceId, newData) => {
  try {
    // Find and update the resource by its ID with the new data
    const result = await Resource.findByIdAndUpdate(
      resourceId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    // Handle any errors that occur during the update process
    throw error;
  }
};

// Delete resource by ID
const deleteResource = async (resourceId) => {
  try {
    // Find and delete the resource by its ID
    const result = await Resource.findByIdAndDelete(resourceId);
    return result;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    throw error;
  }
};

// Export functions for external use
module.exports = {
  createResource,
  getResourceById,
  getAllResource,
  updateResource,
  deleteResource,
};
