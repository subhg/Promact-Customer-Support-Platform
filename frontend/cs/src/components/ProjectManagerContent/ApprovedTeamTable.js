// ApprovedTeamTable.js

import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css';

/**
 * ApprovedTeamTable component manages the display and management of approved teams.
 */
const ApprovedTeamTable = () => {
  // State to manage approved teams data
  const [approvedTeams, setApprovedTeams] = useState([]);
  // State to manage the data for a new team
  const [newTeam, setNewTeam] = useState({ phase: '', name: '', role: '', availability: '', duration: '' });
  // State to manage the editing state of each row
  const [editingRows, setEditingRows] = useState({});

  // Fetch approved team data when the component mounts
  useEffect(() => {
    fetchApprovedTeams();
  }, []);

  // Fetch approved team data from the server
  const fetchApprovedTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/approvedTeam');
      const data = await response.json();
      setApprovedTeams(data);
    } catch (error) {
      console.error('Error fetching approved team data:', error);
    }
  };

  // Handle input change for each cell in the table
  const handleInputChange = (key, value, teamId) => {
    // Update the newTeam state with the modified value
    if (teamId) {
      setApprovedTeams((prevTeams) =>
        prevTeams.map((team) =>
          team._id === teamId ? { ...team, [key]: value } : team
        )
      );
    } else {
      setNewTeam((prevNewTeam) => ({ ...prevNewTeam, [key]: value }));
    }
  };

  // Handle adding a new team
  const handleAddTeam = async () => {
    try {
      const response = await fetch('http://localhost:3000/approvedTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
      });

      const addedTeam = await response.json();
      console.log('Approved team added successfully:', addedTeam);

      // Update the state after adding
      setApprovedTeams([...approvedTeams, addedTeam]);

      // Clear input fields
      setNewTeam({ phase: '', name: '', role: '', availability: '', duration: '' });
    } catch (error) {
      console.error('Error adding approved team:', error);
    }
  };

  // Handle updating an existing team
  const handleUpdateTeam = async (id) => {
    try {
      const updatedTeam = approvedTeams.find((team) => team._id === id);

      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeam),
      });

      const updatedResult = await response.json();
      console.log('Approved team updated successfully:', updatedResult);

      // Disable editing after saving
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating approved team:', error);
    }
  };

  // Handle deleting an existing team
  const handleDeleteTeam = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Approved team deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedTeams = approvedTeams.filter((team) => team._id !== id);
      setApprovedTeams(updatedTeams);
    } catch (error) {
      console.error('Error deleting approved team:', error);
    }
  };

  // Toggle editing state for a row
  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Approved Team Management</h1>
      {/* Table for displaying approved teams */}
      <table className="table">
        {/* Table header */}
        <thead className="header">
          <tr>
            <th>Phase</th>
            <th>Name</th>
            <th>Role</th>
            <th>Availability</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map through approved teams to generate rows */}
          {approvedTeams.map((team) => (
            <tr key={team._id}>
              {/* Display cells with input fields when editing */}
              <td>
                {editingRows[team._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={team.phase}
                    onChange={(e) => handleInputChange('phase', e.target.value, team._id)}
                  />
                ) : (
                  team.phase
                )}
              </td>
              <td>
                {editingRows[team._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={team.name}
                    onChange={(e) => handleInputChange('name', e.target.value, team._id)}
                  />
                ) : (
                  team.name
                )}
              </td>
              <td>
                {editingRows[team._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={team.role}
                    onChange={(e) => handleInputChange('role', e.target.value, team._id)}
                  />
                ) : (
                  team.role
                )}
              </td>
              <td>
                {editingRows[team._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={team.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value, team._id)}
                  />
                ) : (
                  team.availability
                )}
              </td>
              <td>
                {editingRows[team._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={team.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value, team._id)}
                  />
                ) : (
                  team.duration
                )}
              </td>
              {/* Display action buttons for each row */}
              <td>
                {editingRows[team._id] ? (
                  <Button className="button" onClick={() => handleUpdateTeam(team._id)}>Update</Button>
                ) : (
                  <Button className="button" onClick={() => toggleEditing(team._id)}>Edit</Button>
                )}
                <Button className="button" onClick={() => handleDeleteTeam(team._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Team Row */}
          <tr>
            {/* Display input fields for each cell in the new team row */}
            <td>
              <input
                className="input"
                type="text"
                value={newTeam.phase}
                onChange={(e) => handleInputChange('phase', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newTeam.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newTeam.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newTeam.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={newTeam.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </td>
            {/* Display button for adding a new team */}
            <td>
              <Button className="add-button" onClick={handleAddTeam}>Add Team</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedTeamTable;
