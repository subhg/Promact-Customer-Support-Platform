import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';

const ResourceTable = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ name: '', role: '', startDate: '', endDate: '', comment: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    // Fetch resource data when the component mounts
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:3000/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resource data:', error);
    }
  };

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

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Resource Management</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource._id}>
              <td>
                {editingRows[resource._id] ? (
                  <input
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
                    type="text"
                    value={resource.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value, resource._id)}
                  />
                ) : (
                  resource.comment
                )}
              </td>
              <td>
                {editingRows[resource._id] ? (
                  <Button onClick={() => handleUpdateResource(resource._id)}>Update</Button>
                ) : (
                  <Button onClick={() => toggleEditing(resource._id)}>Update</Button>
                )}
                <Button onClick={() => handleDeleteResource(resource._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Resource Row */}
          <tr>
            <td>
              <input
                type="text"
                value={newResource.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newResource.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newResource.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newResource.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newResource.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
              />
            </td>
            <td>
              <Button onClick={handleAddResource}>Add Resource</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
