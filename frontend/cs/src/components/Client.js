// React Component: ClientFeedbackTable.js

import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
//import './Table.css';

const ClientFeedbackTable = () => {
  // State variables
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
    // Fetch client feedback data when the component mounts
    fetchClientFeedback();
  }, []);

  // Fetch client feedback data from the server
  const fetchClientFeedback = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientFeedback');
      const data = await response.json();
      setClientFeedback(data);
    } catch (error) {
      console.error('Error fetching client feedback data:', error);
    }
  };

  // Handle input change in the form
  const handleInputChange = (key, value, feedbackId) => {
    // Update the newFeedback state with the modified value
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

  // Handle adding new feedback
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

      // Update the state after adding
      setClientFeedback([...clientFeedback, addedFeedback]);

      // Clear input fields
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

  // Handle updating existing feedback
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

      // Disable editing after saving
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating client feedback:', error);
    }
  };

  // Handle deleting existing feedback
  const handleDeleteFeedback = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientFeedback/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Client feedback deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedFeedback = clientFeedback.filter((feedback) => feedback._id !== id);
      setClientFeedback(updatedFeedback);
    } catch (error) {
      console.error('Error deleting client feedback:', error);
    }
  };

  // Toggle editing mode for a specific row
  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  // Render the component
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clientFeedback.map((feedback) => (
            <tr key={feedback._id}>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.feedbackType}
                    onChange={(e) => handleInputChange('feedbackType', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.feedbackType
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.dateReceived}
                    onChange={(e) => handleInputChange('dateReceived', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.dateReceived
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.detailedFeedback}
                    onChange={(e) => handleInputChange('detailedFeedback', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.detailedFeedback
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.actionTaken}
                    onChange={(e) => handleInputChange('actionTaken', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.actionTaken
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.closureDate}
                    onChange={(e) => handleInputChange('closureDate', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.closureDate
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={feedback.project}
                    onChange={(e) => handleInputChange('project', e.target.value, feedback._id)}
                  />
                ) : (
                  feedback.project
                )}
              </td>
              <td>
                {editingRows[feedback._id] ? (
                  <Button className="button" onClick={() => handleUpdateFeedback(feedback._id)}>Update</Button>
                ) : (
                  <Button className="button" onClick={() => toggleEditing(feedback._id)}>Edit</Button>
                )}
                <Button className="button" onClick={() => handleDeleteFeedback(feedback._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Feedback Row */}
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
                type="text"
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
              <Button className="add-button" onClick={handleAddFeedback}>Add Feedback</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientFeedbackTable;
