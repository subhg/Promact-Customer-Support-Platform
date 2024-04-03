import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ApprovedTeamTable = () => {
  // Authentication related states
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);

  // State for storing approved teams and new team details
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({ phase: '', name: '', role: '', availability: '', duration: '' });

  // State to manage editing rows
  const [editingRows, setEditingRows] = useState({});

  // Effect to fetch user role based on authentication status and user email
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

  // Effect to fetch approved teams
  useEffect(() => {
    fetchApprovedTeams();
  }, []);

  // Function to fetch approved teams
  const fetchApprovedTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/approvedTeam');
      const data = await response.json();
      setApprovedTeams(data);
    } catch (error) {
      console.error('Error fetching approved team data:', error);
    }
  };

  // Function to handle input change for editing approved team or adding new team
  const handleInputChange = (key, value, teamId) => {
    if (teamId) {
      setApprovedTeams(prevTeams =>
        prevTeams.map(team =>
          team._id === teamId ? { ...team, [key]: value } : team
        )
      );
    } else {
      setNewTeam(prevNewTeam => ({ ...prevNewTeam, [key]: value }));
    }
  };

  // Function to add new team
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

      setApprovedTeams([...approvedTeams, addedTeam]);
      setNewTeam({ phase: '', name: '', role: '', availability: '', duration: '' });
    } catch (error) {
      console.error('Error adding approved team:', error);
    }
  };

  // Function to update approved team
  const handleUpdateTeam = async (id) => {
    try {
      const updatedTeam = approvedTeams.find(team => team._id === id);

      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTeam),
      });

      const updatedResult = await response.json();
      console.log('Approved team updated successfully:', updatedResult);

      setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating approved team:', error);
    }
  };

  // Function to delete approved team
  const handleDeleteTeam = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Approved team deleted successfully:', deletedResult);

      const updatedTeams = approvedTeams.filter(team => team._id !== id);
      setApprovedTeams(updatedTeams);
    } catch (error) {
      console.error('Error deleting approved team:', error);
    }
  };

  // Function to toggle editing mode for a row
  const toggleEditing = (id) => {
    setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
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
            {(userRole === 'admin' || userRole === 'project manager') && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {approvedTeams.map(team => (
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
              {(userRole === 'admin' || userRole === 'project manager') && (
                <td>
                  {editingRows[team._id] ? (
                    <button className="button" onClick={() => handleUpdateTeam(team._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(team._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteTeam(team._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
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
            {(userRole === 'admin' || userRole === 'project manager') && (
              <td>
                <button className="button" onClick={handleAddTeam}>Add Team</button>
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedTeamTable;
