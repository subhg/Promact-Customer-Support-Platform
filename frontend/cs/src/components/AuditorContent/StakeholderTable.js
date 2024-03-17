import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const StakeholderTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [stakeholders, setStakeholders] = useState([]);
  const [newStakeholder, setNewStakeholder] = useState({ title: '', name: '', contact: '' });
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
    fetchStakeholders();
  }, []);

  const fetchStakeholders = async () => {
    try {
      const response = await fetch('http://localhost:3000/stakeholders');
      const data = await response.json();
      setStakeholders(data);
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
    }
  };

  const handleInputChange = (key, value, stakeholderId) => {
    if (stakeholderId) {
      setStakeholders((prevStakeholders) =>
        prevStakeholders.map((stakeholder) =>
          stakeholder._id === stakeholderId ? { ...stakeholder, [key]: value } : stakeholder
        )
      );
    } else {
      setNewStakeholder((prevNewStakeholder) => ({ ...prevNewStakeholder, [key]: value }));
    }
  };

  const handleAddStakeholder = async () => {
    try {
      const response = await fetch('http://localhost:3000/stakeholders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStakeholder),
      });

      const addedStakeholder = await response.json();
      console.log('Stakeholder added successfully:', addedStakeholder);

      setStakeholders([...stakeholders, addedStakeholder]);
      setNewStakeholder({ title: '', name: '', contact: '' });
    } catch (error) {
      console.error('Error adding stakeholder:', error);
    }
  };

  const handleUpdateStakeholder = async (id) => {
    try {
      const updatedStakeholder = stakeholders.find((stakeholder) => stakeholder._id === id);

      const response = await fetch(`http://localhost:3000/stakeholders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStakeholder),
      });

      const updatedResult = await response.json();
      console.log('Stakeholder updated successfully:', updatedResult);

      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating stakeholder:', error);
    }
  };

  const handleDeleteStakeholder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/stakeholders/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Stakeholder deleted successfully:', deletedResult);

      const updatedStakeholders = stakeholders.filter((stakeholder) => stakeholder._id !== id);
      setStakeholders(updatedStakeholders);
    } catch (error) {
      console.error('Error deleting stakeholder:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>All Stakeholders</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Contact</th>
            {userRole === 'admin' || userRole === 'auditor' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((stakeholder) => (
            <tr key={stakeholder._id}>
              <td>
                {editingRows[stakeholder._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={stakeholder.title}
                    onChange={(e) => handleInputChange('title', e.target.value, stakeholder._id)}
                  />
                ) : (
                  stakeholder.title
                )}
              </td>
              <td>
                {editingRows[stakeholder._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={stakeholder.name}
                    onChange={(e) => handleInputChange('name', e.target.value, stakeholder._id)}
                  />
                ) : (
                  stakeholder.name
                )}
              </td>
              <td>
                {editingRows[stakeholder._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={stakeholder.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value, stakeholder._id)}
                  />
                ) : (
                  stakeholder.contact
                )}
              </td>
              {userRole === 'admin' || userRole === 'auditor' ? (
                <td>
                  {editingRows[stakeholder._id] ? (
                    <button className="button" onClick={() => handleUpdateStakeholder(stakeholder._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(stakeholder._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteStakeholder(stakeholder._id)}>Delete</button>
                </td>
              ) : null}
            </tr>
          ))}
          {userRole === 'admin' || userRole === 'auditor' ? (
            <tr>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newStakeholder.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newStakeholder.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newStakeholder.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                />
              </td>
              <td>
                <button className="button" onClick={handleAddStakeholder}>Add Stakeholder</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default StakeholderTable;
