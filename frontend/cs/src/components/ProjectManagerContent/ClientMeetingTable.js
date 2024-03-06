import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';

const ClientMeetingTable = () => {
  const [clientMeetings, setClientMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({ date: '', duration: '', momLink: '', comments: '', project: '' });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    // Fetch client meeting data when the component mounts
    fetchClientMeetings();
  }, []);

  const fetchClientMeetings = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientMeetings');
      const data = await response.json();
      setClientMeetings(data);
    } catch (error) {
      console.error('Error fetching client meeting data:', error);
    }
  };

  const handleInputChange = (key, value, meetingId) => {
    // Update the newMeeting state with the modified value
    if (meetingId) {
      setClientMeetings((prevMeetings) =>
        prevMeetings.map((meeting) =>
          meeting._id === meetingId ? { ...meeting, [key]: value } : meeting
        )
      );
    } else {
      setNewMeeting((prevNewMeeting) => ({ ...prevNewMeeting, [key]: value }));
    }
  };

  const handleAddMeeting = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientMeeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMeeting),
      });

      const addedMeeting = await response.json();
      console.log('Client meeting added successfully:', addedMeeting);

      // Update the state after adding
      setClientMeetings([...clientMeetings, addedMeeting]);

      // Clear input fields
      setNewMeeting({ date: '', duration: '', momLink: '', comments: '', project: '' });
    } catch (error) {
      console.error('Error adding client meeting:', error);
    }
  };

  const handleUpdateMeeting = async (id) => {
    try {
      const updatedMeeting = clientMeetings.find((meeting) => meeting._id === id);

      const response = await fetch(`http://localhost:3000/clientMeeting/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMeeting),
      });

      const updatedResult = await response.json();
      console.log('Client meeting updated successfully:', updatedResult);

      // Disable editing after saving
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating client meeting:', error);
    }
  };

  const handleDeleteMeeting = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/clientMeeting/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Client meeting deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedMeetings = clientMeetings.filter((meeting) => meeting._id !== id);
      setClientMeetings(updatedMeetings);
    } catch (error) {
      console.error('Error deleting client meeting:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Client Meeting Management</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>MOM Link</th>
            <th>Comments</th>
            <th>Project</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clientMeetings.map((meeting) => (
            <tr key={meeting._id}>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    type="text"
                    value={meeting.date}
                    onChange={(e) => handleInputChange('date', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.date
                )}
              </td>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    type="text"
                    value={meeting.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.duration
                )}
              </td>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    type="text"
                    value={meeting.momLink}
                    onChange={(e) => handleInputChange('momLink', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.momLink
                )}
              </td>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    type="text"
                    value={meeting.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.comments
                )}
              </td>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    type="text"
                    value={meeting.project}
                    onChange={(e) => handleInputChange('project', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.project
                )}
              </td>
              <td>
                {editingRows[meeting._id] ? (
                  <Button onClick={() => handleUpdateMeeting(meeting._id)}>Update</Button>
                ) : (
                  <Button onClick={() => toggleEditing(meeting._id)}>Update</Button>
                )}
                <Button onClick={() => handleDeleteMeeting(meeting._id)}>Delete</Button>
              </td>
            </tr>
          ))}
          {/* New Meeting Row */}
          <tr>
            <td>
              <input
                type="text"
                value={newMeeting.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newMeeting.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newMeeting.momLink}
                onChange={(e) => handleInputChange('momLink', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newMeeting.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={newMeeting.project}
                onChange={(e) => handleInputChange('project', e.target.value)}
              />
            </td>
            <td>
              <Button onClick={handleAddMeeting}>Add Meeting</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientMeetingTable;
