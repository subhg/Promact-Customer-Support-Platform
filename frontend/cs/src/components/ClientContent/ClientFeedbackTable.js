import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ClientFeedbackTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState('');
  const [clientFeedback, setClientFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    feedbackType: '',
    dateReceived: '',
    detailedFeedback: '',
    actionTaken: '',
    closureDate: '',
    project: '',
  });
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
    fetchClientFeedback();
  }, []);

  const fetchClientFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientFeedback');
      const data = await response.json();
      setClientFeedback(data);
    } catch (error) {
      console.error('Error fetching client feedback:', error);
    }
  };

  const handleInputChange = (key, value, feedbackId) => {
    if (feedbackId) {
      setClientFeedback((prevFeedback) =>
        prevFeedback.map((feedback) =>
          feedback._id === feedbackId ? { ...feedback, [key]: value } : feedback
        )
      );
    } else {
      setNewFeedback((prevNewFeedback) => ({ ...prevNewFeedback, [key]: value }));
    }
  };

  const handleAddFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });

      const addedFeedback = await response.json();
      console.log('Client feedback added successfully:', addedFeedback);

      setClientFeedback([...clientFeedback, addedFeedback]);

      setNewFeedback({
        feedbackType: '',
        dateReceived: '',
        detailedFeedback: '',
        actionTaken: '',
        closureDate: '',
        project: '',
      });
    } catch (error) {
      console.error('Error adding client feedback:', error);
    }
  };

  const handleUpdateFeedback = async (id) => {
    try {
      const updatedFeedback = clientFeedback.find((feedback) => feedback._id === id);

      const response = await fetch(`http://localhost:3000/clientFeedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFeedback),
      });

      const updatedResult = await response.json();
      console.log('Client feedback updated successfully:', updatedResult);

      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating client feedback:', error);
    }
  };

  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientFeedback/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Client feedback deleted successfully:', deletedResult);

      const updatedFeedback = clientFeedback.filter((feedback) => feedback._id !== id);
      setClientFeedback(updatedFeedback);
    } catch (error) {
      console.error('Error deleting client feedback:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Client Feedback</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Feedback Type</th>
            <th>Date Received</th>
            <th>Detailed Feedback</th>
            <th>Action Taken</th>
            <th>Closure Date</th>
            <th>Project</th>
            {(userRole === 'client') && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {clientFeedback.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback.feedbackType}</td>
              <td>{feedback.dateReceived}</td>
              <td>{feedback.detailedFeedback}</td>
              <td>{feedback.actionTaken}</td>
              <td>{feedback.closureDate}</td>
              <td>{feedback.project}</td>
              {(userRole === 'client') && (
                <td>
                  {editingRows[feedback._id] ? (
                    <button className="button" onClick={() => handleUpdateFeedback(feedback._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(feedback._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteFeedback(feedback._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
          {(userRole === 'client') && (
            <tr>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newFeedback.feedbackType}
                  onChange={(e) => handleInputChange('feedbackType', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newFeedback.dateReceived}
                  onChange={(e) => handleInputChange('dateReceived', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newFeedback.detailedFeedback}
                  onChange={(e) => handleInputChange('detailedFeedback', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newFeedback.actionTaken}
                  onChange={(e) => handleInputChange('actionTaken', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="date" // Changed input type to date
                  value={newFeedback.closureDate}
                  onChange={(e) => handleInputChange('closureDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newFeedback.project}
                  onChange={(e) => handleInputChange('project', e.target.value)}
                />
              </td>
              <td>
                <button className="button" onClick={handleAddFeedback}>Add Feedback</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientFeedbackTable;
