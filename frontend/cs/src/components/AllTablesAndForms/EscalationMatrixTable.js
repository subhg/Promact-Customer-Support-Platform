import React, { useEffect, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const EscalationMatrixTable = ({ type }) => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [escalationMatrix, setEscalationMatrix] = useState([]);
  const [editingRows, setEditingRows] = useState({});
  const [newLevel, setNewLevel] = useState({ escalationLevel: '', name: '' });

  const fetchUserRole = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      fetchUserRole();
    }
  }, [isAuthenticated, user, fetchUserRole]);

  const fetchEscalationMatrix = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/escalationMatrix/${type}`);
      const data = await response.json();
      setEscalationMatrix(data);
    } catch (error) {
      console.error('Error fetching escalation matrix:', error);
    }
  }, [type]);

  useEffect(() => {
    fetchEscalationMatrix();
  }, [type, fetchEscalationMatrix]);

  const handleAddLevel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/escalationMatrix/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLevel),
      });
      const data = await response.json();
      setEscalationMatrix([...escalationMatrix, data]);
      setNewLevel({ escalationLevel: '', name: '' });
    } catch (error) {
      console.error('Error adding escalation level:', error);
    }
  };

  const handleDeleteLevel = async (levelId) => {
    try {
      await fetch(`http://localhost:3000/escalationMatrix/${type}/${levelId}`, {
        method: 'DELETE',
      });
      const updatedMatrix = escalationMatrix.filter(level => level._id !== levelId);
      setEscalationMatrix(updatedMatrix);
    } catch (error) {
      console.error('Error deleting escalation level:', error);
    }
  };

  const handleUpdateLevel = async (levelId, updatedLevel) => {
    try {
      await fetch(`http://localhost:3000/escalationMatrix/${type}/${levelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedLevel),
      });
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [levelId]: false }));
    } catch (error) {
      console.error('Error updating escalation level:', error);
    }
  };

  const toggleEditing = (levelId) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [levelId]: !prevEditingRows[levelId] }));
  };

  const handleInputChange = (levelId, key, value) => {
    setEscalationMatrix((prevMatrix) =>
      prevMatrix.map((level) =>
        level._id === levelId ? { ...level, [key]: value } : level
      )
    );
  };

  return (
    <div>
      <h1>{type} </h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Escalation Level</th>
            <th>Name</th>
            {userRole === 'admin' || userRole === 'auditor' ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {escalationMatrix.map((level) => (
            <tr key={level._id}>
              <td>
                {editingRows[level._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={level.escalationLevel}
                    onChange={(e) => handleInputChange(level._id, 'escalationLevel', e.target.value)}
                  />
                ) : (
                  level.escalationLevel
                )}
              </td>
              <td>
                {editingRows[level._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={level.name}
                    onChange={(e) => handleInputChange(level._id, 'name', e.target.value)}
                  />
                ) : (
                  level.name
                )}
              </td>
              <td>
                {userRole === 'admin' || userRole === 'auditor' ? (
                  editingRows[level._id] ? (
                    <>
                      <button className="button" onClick={() => handleUpdateLevel(level._id, level)}>Update</button>
                      <button className="button" onClick={() => toggleEditing(level._id)}>Cancel</button>
                    </>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(level._id)}>Edit</button>
                  )
                ) : null}
                {userRole === 'admin' || userRole === 'auditor' ? (
                  <button className="button" onClick={() => handleDeleteLevel(level._id)}>Delete</button>
                ) : null}
              </td>
            </tr>
          ))}
          {userRole === 'admin' || userRole === 'auditor' ? (
            <tr>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newLevel.escalationLevel}
                  onChange={(e) => setNewLevel({ ...newLevel, escalationLevel: e.target.value })}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newLevel.name}
                  onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                />
              </td>
              <td>
                <button className="button" onClick={handleAddLevel}>Add</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default EscalationMatrixTable;
