import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ResourceTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ name: '', role: '', startDate: '', endDate: '', comment: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      const fetchUserRole = async () => {
        try {
          const response = await fetch('http://localhost:3000/verify-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email }),
          });

          if (!response.ok) {
            throw new Error('Failed to verify email');
          }

          const data = await response.json();
          const { role } = data;
          setUserRole(role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };

      fetchUserRole();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:3000/resource');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resource data:', error);
    }
  };

  const handleInputChange = (key, value, resourceId) => {
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

      setResources([...resources, addedResource]);
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
      <table className="table">
        <thead className="header">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Comment</th>
            {userRole === 'admin' || userRole === 'project manager' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource) => (
            <tr key={resource._id}>
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
                    type="date"
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
                    type="date"
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
              {userRole === 'admin' || userRole === 'project manager' ? (
                <td>
                  {editingRows[resource._id] ? (
                    <button className="button" onClick={() => handleUpdateResource(resource._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(resource._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteResource(resource._id)}>Delete</button>
                </td>
              ) : null}
            </tr>
          ))}
          <tr>
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
                type="date"
                value={newResource.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="date"
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
            {userRole === 'admin' || userRole === 'project manager' ? (
              <td>
                <button className="button" onClick={handleAddResource}>Add Resource</button>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
