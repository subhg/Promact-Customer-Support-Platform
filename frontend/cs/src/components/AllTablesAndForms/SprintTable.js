import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SprintTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [sprints, setSprints] = useState([]);
  const [newSprint, setNewSprint] = useState({ sprint: '', startDate: '', endDate: '', status: '', comments: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // Fetch user role based on user email from the phase table
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
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    try {
      const response = await fetch('http://localhost:3000/sprint');
      const data = await response.json();
      setSprints(data);
    } catch (error) {
      console.error('Error fetching sprints:', error);
    }
  };

  const handleInputChange = (key, value, sprintId) => {
    if (sprintId) {
      setSprints(prevSprints =>
        prevSprints.map(sprint =>
          sprint._id === sprintId ? { ...sprint, [key]: value } : sprint
        )
      );
    } else {
      setNewSprint(prevNewSprint => ({ ...prevNewSprint, [key]: value }));
    }
  };

  const handleAddSprint = async () => {
    try {
      const response = await fetch('http://localhost:3000/sprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSprint),
      });

      const addedSprint = await response.json();
      console.log('Sprint added successfully:', addedSprint);

      setSprints([...sprints, addedSprint]);
      setNewSprint({ sprint: '', startDate: '', endDate: '', status: '', comments: '' });
    } catch (error) {
      console.error('Error adding sprint:', error);
    }
  };

  const handleUpdateSprint = async (id) => {
    try {
      const updatedSprint = sprints.find(sprint => sprint._id === id);

      const response = await fetch(`http://localhost:3000/sprint/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSprint),
      });

      const updatedResult = await response.json();
      console.log('Sprint updated successfully:', updatedResult);

      setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating sprint:', error);
    }
  };

  const handleDeleteSprint = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/sprint/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Sprint deleted successfully:', deletedResult);

      const updatedSprints = sprints.filter(sprint => sprint._id !== id);
      setSprints(updatedSprints);
    } catch (error) {
      console.error('Error deleting sprint:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Sprints</h1>
      <table className='table'>
        <thead className='header'>
          <tr>
            <th>Sprint</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Comments</th>
            {userRole === 'admin' || userRole === 'project manager' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {/* Sprint rows */}
          {sprints.map(sprint => (
            <tr key={sprint._id}>
              <td>
                {editingRows[sprint._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={sprint.sprint}
                    onChange={(e) => handleInputChange('sprint', e.target.value, sprint._id)}
                  />
                ) : (
                  sprint.sprint
                )}
              </td>
              <td>
                {editingRows[sprint._id] ? (
                  <input
                    className='input'
                    type="date"
                    value={sprint.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value, sprint._id)}
                  />
                ) : (
                  sprint.startDate
                )}
              </td>
              <td>
                {editingRows[sprint._id] ? (
                  <input
                    className='input'
                    type="date"
                    value={sprint.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value, sprint._id)}
                  />
                ) : (
                  sprint.endDate
                )}
              </td>
              <td>
                {editingRows[sprint._id] ? (
                  <select
                    className='input'
                    value={sprint.status}
                    onChange={(e) => handleInputChange('status', e.target.value, sprint._id)}
                  >
                    <option value="Delayed">Delayed</option>
                    <option value="On-time">On-time</option>
                    <option value="Sign-off Pending">Sign-off Pending</option>
                    <option value="Signed-off">Signed-off</option>
                  </select>
                ) : (
                  sprint.status
                )}
              </td>
              <td>
                {editingRows[sprint._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={sprint.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value, sprint._id)}
                  />
                ) : (
                  sprint.comments
                )}
              </td>
              {/* Actions buttons based on user role */}
              {userRole === 'admin' || userRole === 'project manager' ? (
                <td>
                  {editingRows[sprint._id] ? (
                    <button className='button' onClick={() => handleUpdateSprint(sprint._id)}>Update</button>
                  ) : (
                    <button className='button' onClick={() => toggleEditing(sprint._id)}>Edit</button>
                  )}
                  <button className='button' onClick={() => handleDeleteSprint(sprint._id)}>Delete</button>
                </td>
              ) : null}
            </tr>
          ))}
          {/* New sprint row */}
          {userRole === 'admin' || userRole === 'project manager' ? (
            <tr>
              <td>
                <input
                  className='input'
                  type="text"
                  value={newSprint.sprint}
                  onChange={(e) => handleInputChange('sprint', e.target.value)}
                />
              </td>
              <td>
                <input
                  className='input'
                  type="date"
                  value={newSprint.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  className='input'
                  type="date"
                  value={newSprint.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </td>
              <td>
                <select
                  className='input'
                  value={newSprint.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="Delayed">Delayed</option>
                  <option value="On-time">On-time</option>
                  <option value="Sign-off Pending">Sign-off Pending</option>
                  <option value="Signed-off">Signed-off</option>
                </select>
              </td>
              <td>
                <input
                  className='input'
                  type="text"
                  value={newSprint.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                />
              </td>
              <td>
                <button className='button' onClick={handleAddSprint}>Add Sprint</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default SprintTable;
