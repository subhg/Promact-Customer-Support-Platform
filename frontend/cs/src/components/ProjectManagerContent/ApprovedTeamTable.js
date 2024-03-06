import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css';

const ApprovedTeamTable = () => {
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ phase: '', name: '', role: '', availability: '', duration: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    // Fetch approved team data when the component mounts
    fetchApprovedTeams();
  }, []);

  const fetchApprovedTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/approvedTeam');
      const data = await response.json();
      setApprovedTeams(data);
    } catch (error) {
      console.error('Error fetching approved team data:', error);
    }
  };

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

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Approved Team Management</h1>
      <table className="table">
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
        <tbody>
          {approvedTeams.map((team) => (
            <tr key={team._id}>
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
