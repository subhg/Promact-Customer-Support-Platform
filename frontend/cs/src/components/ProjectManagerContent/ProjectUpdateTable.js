import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProjectUpdateTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [projectUpdates, setProjectUpdates] = useState([]);
  const [newUpdate, setNewUpdate] = useState({ date: '', generalUpdates: '', project: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // Fetch user role based on user email
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
    if (updateId) {
      setProjectUpdates(prevUpdates =>
        prevUpdates.map(update =>
          update._id === updateId ? { ...update, [key]: value } : update
        )
      );
    } else {
      setNewUpdate(prevNewUpdate => ({ ...prevNewUpdate, [key]: value }));
    }
  };

  const handleAddUpdate = async () => {
    try {
      const dateObject = new Date(newUpdate.date);

      if (isNaN(dateObject.getTime())) {
        console.error('Invalid date format');
        return;
      }

      setNewUpdate(prevNewUpdate => ({ ...prevNewUpdate, date: dateObject }));

      const response = await fetch('http://localhost:3000/projectUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUpdate),
      });

      const addedUpdate = await response.json();
      console.log('Project update added successfully:', addedUpdate);

      setProjectUpdates([...projectUpdates, addedUpdate]);
      setNewUpdate({ date: '', generalUpdates: '', project: '' });
    } catch (error) {
      console.error('Error adding project update:', error);
    }
  };

  const handleUpdateUpdate = async (id) => {
    try {
      const updatedUpdate = projectUpdates.find(update => update._id === id);

      const response = await fetch(`http://localhost:3000/projectUpdate/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUpdate),
      });

      const updatedResult = await response.json();
      console.log('Project update updated successfully:', updatedResult);

      setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: false }));
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

      const updatedUpdates = projectUpdates.filter(update => update._id !== id);
      setProjectUpdates(updatedUpdates);
    } catch (error) {
      console.error('Error deleting project update:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
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
            {userRole === 'admin' || userRole === 'project manager' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {projectUpdates.map(update => (
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
              {userRole === 'admin' || userRole === 'project manager' ? (
                <td>
                  {editingRows[update._id] ? (
                    <button className="button" onClick={() => handleUpdateUpdate(update._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(update._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteUpdate(update._id)}>Delete</button>
                </td>
              ) : null}
            </tr>
          ))}
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
            {userRole === 'admin' || userRole === 'project manager' ? (
              <td>
                <button className="button" onClick={handleAddUpdate}>Add Update</button>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectUpdateTable;
