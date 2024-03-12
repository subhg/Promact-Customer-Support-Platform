import React, { useEffect, useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './Table.css';

const AuditHistoryTable = () => {
  const [auditHistoryEntries, setAuditHistoryEntries] = useState([]);
  const [newAuditHistoryEntry, setNewAuditHistoryEntry] = useState({ /* Define your fields here */ });
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    fetchAuditHistoryEntries();
  }, []);

  const fetchAuditHistoryEntries = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditHistory');
      const data = await response.json();
      setAuditHistoryEntries(data);
    } catch (error) {
      console.error('Error fetching audit history data:', error);
    }
  };

  const handleInputChange = (key, value, entryId) => {
    if (entryId) {
      setAuditHistoryEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry._id === entryId ? { ...entry, [key]: value } : entry
        )
      );
    } else {
      setNewAuditHistoryEntry((prevNewEntry) => ({ ...prevNewEntry, [key]: value }));
    }
  };

  const handleAddEntry = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAuditHistoryEntry),
      });

      const addedEntry = await response.json();
      console.log('Audit history entry added successfully:', addedEntry);

      setAuditHistoryEntries([...auditHistoryEntries, addedEntry]);

      setNewAuditHistoryEntry({ /* Reset fields to initial state */ });
    } catch (error) {
      console.error('Error adding audit history entry:', error);
    }
  };

  const handleUpdateEntry = async (id) => {
    try {
      const updatedEntry = auditHistoryEntries.find((entry) => entry._id === id);

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

      const updatedEntries = auditHistoryEntries.filter((entry) => entry._id !== id);
      setAuditHistoryEntries(updatedEntries);
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
          {/* Define your table headers here */}
        </thead>
        <tbody>
          {auditHistoryEntries.map((entry) => (
            {/* Define your table rows here */}
          ))}
          <tr>
            {/* Define your input fields for the new entry row */}
            <td>
              <input
                className="input"
                type="text"
                value={newAuditHistoryEntry.fieldName}
                onChange={(e) => handleInputChange('fieldName', e.target.value)}
              />
            </td>
            {/* Add more cells for other fields */}
            <td>
              <Button className="add-button" onClick={handleAddEntry}>Add Entry</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AuditHistoryTable;
