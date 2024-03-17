import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuditHistoryTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState('');
  const [auditHistory, setAuditHistory] = useState([]);
  const [newAuditEntry, setNewAuditEntry] = useState({
    dateOfAudit: '',
    reviewedBy: '',
    statusReviewed: '',
    section: '',
    commentQueries: '',
    actionItem: '',
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
    fetchAuditHistory();
  }, []);

  const fetchAuditHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditHistory');
      const data = await response.json();
      setAuditHistory(data);
    } catch (error) {
      console.error('Error fetching audit history:', error);
    }
  };

  const handleInputChange = (key, value, entryId) => {
    if (entryId) {
      setAuditHistory((prevHistory) =>
        prevHistory.map((entry) =>
          entry._id === entryId ? { ...entry, [key]: value } : entry
        )
      );
    } else {
      setNewAuditEntry((prevEntry) => ({ ...prevEntry, [key]: value }));
    }
  };

  const handleAddEntry = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAuditEntry),
      });

      const addedEntry = await response.json();
      console.log('Audit history entry added successfully:', addedEntry);

      setAuditHistory([...auditHistory, addedEntry]);
      setNewAuditEntry({
        dateOfAudit: '',
        reviewedBy: '',
        statusReviewed: '',
        section: '',
        commentQueries: '',
        actionItem: '',
      });
    } catch (error) {
      console.error('Error adding audit history entry:', error);
    }
  };

  const handleUpdateEntry = async (id) => {
    try {
      const updatedEntry = auditHistory.find((entry) => entry._id === id);

      const response = await fetch(`http://localhost:3000/auditHistory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      const updatedResult = await response.json();
      console.log('Audit history entry updated successfully:', updatedResult);

      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating audit history entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/auditHistory/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Audit history entry deleted successfully:', deletedResult);

      const updatedHistory = auditHistory.filter((entry) => entry._id !== id);
      setAuditHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting audit history entry:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Audit History Management</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Date of Audit</th>
            <th>Reviewed By</th>
            <th>Status Reviewed</th>
            <th>Section</th>
            <th>Comment Queries</th>
            <th>Action Item</th>
            {(userRole === 'admin' || userRole === 'auditor') && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {auditHistory.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.dateOfAudit}</td>
              <td>{entry.reviewedBy}</td>
              <td>{entry.statusReviewed}</td>
              <td>{entry.section}</td>
              <td>{entry.commentQueries}</td>
              <td>{entry.actionItem}</td>
              {(userRole === 'admin' || userRole === 'auditor') && (
                <td>
                  {editingRows[entry._id] ? (
                    <button className="button" onClick={() => handleUpdateEntry(entry._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(entry._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
          {(userRole === 'admin' || userRole === 'auditor') && (
            <tr>
              <td>
                <input
                  className="input"
                  type="date" // Change input type to date
                  value={newAuditEntry.dateOfAudit}
                  onChange={(e) => handleInputChange('dateOfAudit', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newAuditEntry.reviewedBy}
                  onChange={(e) => handleInputChange('reviewedBy', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newAuditEntry.statusReviewed}
                  onChange={(e) => handleInputChange('statusReviewed', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newAuditEntry.section}
                  onChange={(e) => handleInputChange('section', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newAuditEntry.commentQueries}
                  onChange={(e) => handleInputChange('commentQueries', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newAuditEntry.actionItem}
                  onChange={(e) => handleInputChange('actionItem', e.target.value)}
                />
              </td>
              <td>
                <button className="button" onClick={handleAddEntry}>Add Entry</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuditHistoryTable;
