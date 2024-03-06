// ProjectUpdateTable.js

import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css';

/**
 * ProjectUpdateTable component manages the display and management of project updates.
 */
const ProjectUpdateTable = () => {
  // State to manage project update data
  const [projectUpdates, setProjectUpdates] = useState([]);
  // State to manage the data for a new project update
  const [newUpdate, setNewUpdate] = useState({ date: '', generalUpdates: '', project: '' });
  // State to manage the editing state of each row
  const [editingRows, setEditingRows] = useState({});

  // Fetch project update data when the component mounts
  useEffect(() => {
    fetchProjectUpdates();
  }, []);

  // Fetch project update data from the server
  const fetchProjectUpdates = async () => {
    try {
      const response = await fetch('http://localhost:3000/projectUpdate');
      const data = await response.json();
      setProjectUpdates(data);
    } catch (error) {
      console.error('Error fetching project update data:', error);
    }
  };

  // Handle input change for each cell in the table
  const handleInputChange = (key, value, updateId) => {
    // Update the newUpdate state with the modified value
    if (updateId) {
      setProjectUpdates((prevUpdates) =>
        prevUpdates.map((update) =>
          update._id === updateId ? { ...update, [key]: value } : update
        )
      );
    } else {
      setNewUpdate((prevNewUpdate) => ({ ...prevNewUpdate, [key]: value }));
    }
  };

  // Handle adding a new project update
  const handleAddUpdate = async () => {
    try {
      // Convert the date string to a Date object
      const dateObject = new Date(newUpdate.date);
  
      // Check if the date is valid
      if (isNaN(dateObject.getTime())) {
        console.error('Invalid date format');
        return;
      }
  
      // Update the newUpdate state with the valid date object
      setNewUpdate((prevNewUpdate) => ({ ...prevNewUpdate, date: dateObject }));
  
      const response = await fetch('http://localhost:3000/projectUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUpdate),
      });
  
      const addedUpdate = await response.json();
      console.log('Project update added successfully:', addedUpdate);
  
      // Update the state after adding
      setProjectUpdates([...projectUpdates, addedUpdate]);
  
      // Clear input fields
      setNewUpdate({ date: '', generalUpdates: '', project: '' });
    } catch (error) {
      console.error('Error adding project update:', error);
    }
  };
  
  // Handle updating an existing project update
  const handleUpdateUpdate = async (id) => {
    try {
      const updatedUpdate = projectUpdates.find((update) => update._id === id);

      const response = await fetch(`http://localhost:3000/projectUpdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUpdate),
      });

      const updatedResult = await response.json();
      console.log('Project update updated successfully:', updatedResult);

      // Disable editing after saving
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating project update:', error);
    }
  };

  // Handle deleting an existing project update
  const handleDeleteUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projectUpdate/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Project update deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedUpdates = projectUpdates.filter((update) => update._id !== id);
      setProjectUpdates(updatedUpdates);
    } catch (error) {
      console.error('Error deleting project update:', error);
    }
  };

  // Toggle editing state for a row
  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Project Updates</h1>
      {/* Table for displaying project updates */}
      <table className='table'>
        {/* Table header */}
        <thead className='header'>
          <tr>
            <th>Date</th>
            <th>General Updates</th>
            <th>Project</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map through project updates to generate rows */}
          {projectUpdates.map((update) => (
            <tr key={update._id}>
              {/* Display cells with input fields when editing */}
              <td>
                {editingRows[update._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={update.date}
                    onChange={(e) => handleInputChange('date', e.target.value, update._id)}
                  />
                ) : (
                  update.date
                )}
              </td>
              <td>
                {editingRows[update._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={update.generalUpdates}
                    onChange={(e) => handleInputChange('generalUpdates', e.target.value, update._id)}
                  />
                ) : (
                  update.generalUpdates
                )}
              </td>
              <td>
                {editingRows[update._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={update.project}
                    onChange={(e) => handleInputChange('project', e.target.value, update._id)}
                  />
                ) : (
                  update.project
                )}
              </td>
              {/* Display action buttons for each row */}
              <td>
                {editingRows[update._id] ? (
                  <Button className="button" onClick={() => handleUpdateUpdate(update._id)}>Update</Button>
                ) : (
                  <Button className="button" onClick={() => toggleEditing(update._id)}>Edit</Button>
                )}
                <Button className="button" onClick={() => handleDeleteUpdate(update._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Project Update Row */}
          <tr>
            {/* Display input fields for each cell in the new project update row */}
            <td>
              <input
                className='input'
                type="text"
                value={newUpdate.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newUpdate.generalUpdates}
                onChange={(e) => handleInputChange('generalUpdates', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newUpdate.project}
                onChange={(e) => handleInputChange('project', e.target.value)}
              />
            </td>
            {/* Display button for adding a new project update */}
            <td>
              <Button className="add-button" onClick={handleAddUpdate}>Add Update</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectUpdateTable;
