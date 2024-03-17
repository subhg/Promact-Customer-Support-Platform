import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Table.css';

const ClientMeetingTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState('');
  const [clientMeetings, setClientMeetings] = useState([]);
  const [newMeeting, setNewMeeting] = useState({ date: '', duration: '', momLink: '', comments: '', project: '' });
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
    fetchClientMeetings();
  }, []);

  const fetchClientMeetings = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientMeeting');
      const data = await response.json();
      setClientMeetings(data);
    } catch (error) {
      console.error('Error fetching client meeting data:', error);
    }
  };

  const handleInputChange = (key, value, meetingId) => {
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

      setClientMeetings([...clientMeetings, addedMeeting]);
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
      <h1>Client Meeting</h1>
      <table className='table'>
        <thead className='header'>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>MOM Link</th>
            <th>Comments</th>
            <th>Project</th>
            {(userRole === 'admin' || userRole === 'project manager') && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {clientMeetings.map((meeting) => (
            <tr key={meeting._id}>
              <td>
                {editingRows[meeting._id] ? (
                  <input
                    className='input'
                    type="date"
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
                    className="input" 
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
                    className='input'
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
                    className='input'
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
                    className='input'
                    type="text"
                    value={meeting.project}
                    onChange={(e) => handleInputChange('project', e.target.value, meeting._id)}
                  />
                ) : (
                  meeting.project
                )}
              </td>
              <td>
                {(userRole === 'admin' || userRole === 'project manager') && editingRows[meeting._id] ? (
                  <button className='button' onClick={() => handleUpdateMeeting(meeting._id)}>Update</button>
                ) : (
                  (userRole === 'admin' || userRole === 'project manager') && <button className='button' onClick={() => toggleEditing(meeting._id)}>Edit</button>
                )}
                {(userRole === 'admin' || userRole === 'project manager') && <button className='button' onClick={() => handleDeleteMeeting(meeting._id)}>Delete</button>}
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                className='input'
                type="date"
                value={newMeeting.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newMeeting.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newMeeting.momLink}
                onChange={(e) => handleInputChange('momLink', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newMeeting.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
              />
            </td>
            <td>
              <input
                className='input'
                type="text"
                value={newMeeting.project}
                onChange={(e) => handleInputChange('project', e.target.value)}
              />
            </td>
            <td>
              {(userRole === 'admin' || userRole === 'project manager') && <button className='button' onClick={handleAddMeeting}>Add Meeting</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClientMeetingTable;
