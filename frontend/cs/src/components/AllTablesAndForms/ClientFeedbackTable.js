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

  // Effect hook to fetch user role based on authentication status and user email
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

  // Effect hook to fetch client feedback data
  useEffect(() => {
    fetchClientFeedback();
  }, []);

  // Function to fetch client feedback data from the API
  const fetchClientFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientFeedbacks');
      const data = await response.json();
      setClientFeedback(data);
    } catch (error) {
      console.error('Error fetching client feedback:', error);
    }
  };

  // Function to handle input change for client feedback
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

  // Function to add new client feedback
  const handleAddFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientFeedbacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      });

      const addedFeedback = await response.json();
      setClientFeedback([...clientFeedback, addedFeedback]);

      // Reset new feedback state after adding
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

  // Function to update client feedback
  const handleUpdateFeedback = async (id) => {
    try {
      const updatedFeedback = clientFeedback.find((feedback) => feedback._id === id);

      const response = await fetch(`http://localhost:3000/clientFeedbacks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFeedback),
      });

      await response.json();
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating client feedback:', error);
    }
  };

  // Function to delete client feedback
  const handleDeleteFeedback = async (id) => {
    try {
      await fetch(`http://localhost:3000/clientFeedbacks/${id}`, {
        method: 'DELETE',
      });

      const updatedFeedback = clientFeedback.filter((feedback) => feedback._id !== id);
      setClientFeedback(updatedFeedback);
    } catch (error) {
      console.error('Error deleting client feedback:', error);
    }
  };

  // Function to toggle editing mode for client feedback
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
                  type="date" 
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
                  type="date" 
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
