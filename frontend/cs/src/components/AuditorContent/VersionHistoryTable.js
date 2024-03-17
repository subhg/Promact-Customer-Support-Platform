import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const VersionHistoryTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);
  const [newVersionEntry, setNewVersionEntry] = useState({
    version: '',
    type: '',
    change: '',
    changeReason: '',
    createdBy: '',
    revisionDate: '',
    approvalDate: '',
    approvedBy: '',
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
    fetchVersionHistory();
  }, []);

  const fetchVersionHistory = async () => {
    try {
      const response = await fetch('http://localhost:3000/versionHistory');
      const data = await response.json();
      setVersionHistory(data);
    } catch (error) {
      console.error('Error fetching version history:', error);
    }
  };

  const handleInputChange = (key, value, entryId) => {
    if (entryId) {
      setVersionHistory((prevHistory) =>
        prevHistory.map((entry) =>
          entry._id === entryId ? { ...entry, [key]: value } : entry
        )
      );
    } else {
      setNewVersionEntry((prevEntry) => ({ ...prevEntry, [key]: value }));
    }
  };

  const handleAddEntry = async () => {
    try {
      const response = await fetch('http://localhost:3000/versionHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVersionEntry),
      });

      const addedEntry = await response.json();
      console.log('Version history entry added successfully:', addedEntry);

      setVersionHistory([...versionHistory, addedEntry]);
      setNewVersionEntry({
        version: '',
        type: '',
        change: '',
        changeReason: '',
        createdBy: '',
        revisionDate: '',
        approvalDate: '',
        approvedBy: '',
      });
    } catch (error) {
      console.error('Error adding version history entry:', error);
    }
  };

  const handleUpdateEntry = async (id) => {
    try {
      const updatedEntry = versionHistory.find((entry) => entry._id === id);

      const response = await fetch(`http://localhost:3000/versionHistory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      const updatedResult = await response.json();
      console.log('Version history entry updated successfully:', updatedResult);

      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating version history entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/versionHistory/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Version history entry deleted successfully:', deletedResult);

      const updatedHistory = versionHistory.filter((entry) => entry._id !== id);
      setVersionHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting version history entry:', error);
    }
  };

  const toggleEditing = (id) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Version History Management</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Version</th>
            <th>Type</th>
            <th>Change</th>
            <th>Change Reason</th>
            <th>Created By</th>
            <th>Revision Date</th>
            <th>Approval Date</th>
            <th>Approved By</th>
            {userRole === 'admin' || userRole === 'auditor' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {versionHistory.map((entry) => (
            <tr key={entry._id}>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.version}
                    onChange={(e) => handleInputChange('version', e.target.value, entry._id)}
                  />
                ) : (
                  entry.version
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.type}
                    onChange={(e) => handleInputChange('type', e.target.value, entry._id)}
                  />
                ) : (
                  entry.type
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.change}
                    onChange={(e) => handleInputChange('change', e.target.value, entry._id)}
                  />
                ) : (
                  entry.change
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.changeReason}
                    onChange={(e) => handleInputChange('changeReason', e.target.value, entry._id)}
                  />
                ) : (
                  entry.changeReason
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.createdBy}
                    onChange={(e) => handleInputChange('createdBy', e.target.value, entry._id)}
                  />
                ) : (
                  entry.createdBy
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.revisionDate}
                    onChange={(e) => handleInputChange('revisionDate', e.target.value, entry._id)}
                  />
                ) : (
                  entry.revisionDate
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.approvalDate}
                    onChange={(e) => handleInputChange('approvalDate', e.target.value, entry._id)}
                  />
                ) : (
                  entry.approvalDate
                )}
              </td>
              <td>
                {editingRows[entry._id] ? (
                  <input
                    className="input"
                    type="text"
                    value={entry.approvedBy}
                    onChange={(e) => handleInputChange('approvedBy', e.target.value, entry._id)}
                  />
                ) : (
                  entry.approvedBy
                )}
              </td>
              {userRole === 'admin' || userRole === 'auditor' ? (
                <td>
                  {editingRows[entry._id] ? (
                    <button className="button" onClick={() => handleUpdateEntry(entry._id)}>Update</button>
                  ) : (
                    <button className="button" onClick={() => toggleEditing(entry._id)}>Edit</button>
                  )}
                  <button className="button" onClick={() => handleDeleteEntry(entry._id)}>Delete</button>
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
                  value={newVersionEntry.version}
                  onChange={(e) => handleInputChange('version', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.change}
                  onChange={(e) => handleInputChange('change', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.changeReason}
                  onChange={(e) => handleInputChange('changeReason', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.createdBy}
                  onChange={(e) => handleInputChange('createdBy', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.revisionDate}
                  onChange={(e) => handleInputChange('revisionDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.approvalDate}
                  onChange={(e) => handleInputChange('approvalDate', e.target.value)}
                />
              </td>
              <td>
                <input
                  className="input"
                  type="text"
                  value={newVersionEntry.approvedBy}
                  onChange={(e) => handleInputChange('approvedBy', e.target.value)}
                />
              </td>
              <td>
                <button className="button" onClick={handleAddEntry}>Add Entry</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default VersionHistoryTable;
