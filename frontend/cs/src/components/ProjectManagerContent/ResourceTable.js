// ResourceTable.js

import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css';

/**
 * ResourceTable component manages the display and management of resources.
 */
const ResourceTable = () => {
  // State to manage resource data
  const [resources, setResources] = useState([]);
  // State to manage the data for a new resource
  const [newResource, setNewResource] = useState({ name: '', role: '', startDate: '', endDate: '', comment: '' });
  // State to manage the editing state of each row
  const [editingRows, setEditingRows] = useState({});

  // Fetch resource data when the component mounts
  useEffect(() => {
    fetchResources();
  }, []);

  // Fetch resource data from the server
  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:3000/resource');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resource data:', error);
    }
  };

  // Handle input change for each cell in the table
  const handleInputChange = (key, value, resourceId) => {
    // Update the newResource state with the modified value
    if (resourceId) {
      setResources((prevResources) =>
        prevResources.map((resource) =>
          resource._id === resourceId ? { ...resource, [key]: value } : resource
        )
      );
    } else {
      setNewResource((prevNewResource) => ({ ...prevNewResource, [key]: value }));
    }
  };

  // Handle adding a new resource
  const handleAddResource = async () => {
    try {
      const response = await fetch('http://localhost:3000/resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      const addedResource = await response.json();
      console.log('Resource added successfully:', addedResource);

      // Update the state after adding
      setResources([...resources, addedResource]);

      // Clear input fields
      setNewResource({ name: '', role: '', startDate: '', endDate: '', comment: '' });
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  // Handle updating an existing resource
  const handleUpdateResource = async (id) => {
    try {
      const updatedResource = resources.find((resource) => resource._id === id);

      const response = await fetch(`http://localhost:3000/resource/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedResource),
      });

      const updatedResult = await response.json();
      console.log('Resource updated successfully:', updatedResult);

      // Disable editing after saving
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  // Handle deleting an existing resource
  const handleDeleteResource = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/resource/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Resource deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedResources = resources.filter((resource) => resource._id !== id);
      setResources(updatedResources);
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  // Toggle editing state for a row
  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Resource Management</h1>
      {/* Table for displaying resources */}
      <table className="table">
        {/* Table header */}
        <thead className="header">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map through resources to generate rows */}
          {resources.map((resource) => (
            <tr key={resource._id}>
              {/* Display cells with input fields when editing */}
              <td>
                {editingRows[resource._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={resource.name}
                    onChange={(e) => handleInputChange('name', e.target.value, resource._id)}
                  />
                ) : (
                  resource.name
                )}
              </td>
              <td>
                {editingRows[resource._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={resource.role}
                    onChange={(e) => handleInputChange('role', e.target.value, resource._id)}
                  />
                ) : (
                  resource.role
                )}
              </td>
              <td>
                {editingRows[resource._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={resource.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value, resource._id)}
                  />
                ) : (
                  resource.startDate
                )}
              </td>
              <td>
                {editingRows[resource._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={resource.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value, resource._id)}
                  />
                ) : (
                  resource.endDate
                )}
              </td>
              <td>
                {editingRows[resource._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={resource.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value, resource._id)}
                  />
                ) : (
                  resource.comment
                )}
              </td>
              {/* Display action buttons for each row */}
              <td>
                {editingRows[resource._id] ? (
                  <Button className="button" onClick={() => handleUpdateResource(resource._id)}>Update</Button>
                ) : (
                  <Button className="button" onClick={() => toggleEditing(resource._id)}>Edit</Button>
                )}
                <Button className="button" onClick={() => handleDeleteResource(resource._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Resource Row */}
          <tr>
            {/* Display input fields for each cell in the new resource row */}
            <td>
              <input
                className="input"
                type="text"
                value={newResource.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newResource.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newResource.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newResource.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newResource.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
              />
            </td>
            {/* Display button for adding a new resource */}
            <td>
              <Button className="add-button" onClick={handleAddResource}>Add Resource</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
