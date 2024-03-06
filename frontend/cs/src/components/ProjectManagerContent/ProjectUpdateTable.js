import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css'

const ProjectUpdateTable = () => {
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ date: '', generalUpdates: '', project: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    // Fetch project update data when the component mounts
    fetchProjectUpdates();
  }, []);

  const fetchProjectUpdates = async () => {
    try {
      const response = await fetch('http://localhost:3000/projectUpdate');
      const data = await response.json();
      setProjectUpdates(data);
    } catch (error) {
      console.error('Error fetching project update data:', error);
    }
  };

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

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Project Updates</h1>
      <table className='table'>
        <thead className='header'>
          <tr>
            <th>Date</th>
            <th>General Updates</th>
            <th>Project</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projectUpdates.map((update) => (
            <tr key={update._id}>
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
              <td>
                {editingRows[update._id] ? (
                  <Button className="button"  onClick={() => handleUpdateUpdate(update._id)}>Update</Button>
                ) : (
                  <Button className="button" onClick={() => toggleEditing(update._id)}>Edit</Button>
                )}
                <Button className="button"  onClick={() => handleDeleteUpdate(update._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Project Update Row */}
          <tr>
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
