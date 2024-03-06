const Resource = require('../models/Resource');

// Create
const createResource = async (data) => {
  try {
    const resource = new Resource(data);
    const result = await resource.save();
    return result;
  } catch (error) {
    throw error;
  }
};

// Read
const getResourceById = async (resourceId) => {
  try {
    const result = await Resource.findById(resourceId);
    return result;
  } catch (error) {
    throw error;
  }
};

// Update
const updateResource = async (resourceId, newData) => {
  try {
    const result = await Resource.findByIdAndUpdate(
      resourceId,
      { $set: newData },
      { new: true }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Delete
const deleteResource = async (resourceId) => {
  try {
    const result = await Resource.findByIdAndDelete(resourceId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllResource = async () => {
  try {
    const result = await Resource.find();
    return result;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createResource,
  getResourceById,
  getAllResource,
  updateResource,
  deleteResource,
};
