// ApprovedTeamTable.js
import React, { useEffect, useState } from 'react';
import './ApprovedTeamTable.css'
import { Button } from 'monday-ui-react-core';

const ApprovedTeamTable = () => {
  const [approvedTeams, setApprovedTeams] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchApprovedTeams();
  }, []);

  const fetchApprovedTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/approvedTeam');
      const data = await response.json();
      setApprovedTeams(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (index, columnId, value) => {
    // Update the state with the modified value
    const updatedTeams = [...approvedTeams];
    updatedTeams[index][columnId] = value;
    setApprovedTeams(updatedTeams);
  };

  const handleAddRow = () => {
    setApprovedTeams([...approvedTeams, { phase: '', name: '', role: '', availability: '', duration: '' }]);
  };

  const handleUpdate = async (id) => {
    try {
      // Check if the id is valid before proceeding with the update
      if (!id) {
        console.error('Invalid id for update');
        return;
      }
  
      const updatedData = approvedTeams.find((team) => team._id === id);
  
      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const updatedResult = await response.json();
      console.log('Data updated successfully:', updatedResult);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/approvedTeam/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Data deleted successfully:', deletedResult);

      // Update the state after deletion
      const updatedTeams = approvedTeams.filter((team) => team._id !== id);
      setApprovedTeams(updatedTeams);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Add the "phase" field to each row before sending to the server
      const dataToSend = approvedTeams.map((item) => ({
        phase: item.phase,
        name: item.name,
        role: item.role,
        availability: item.availability,
        duration: item.duration,
      }));

      console.log('Data to be saved:', dataToSend);

      const response = await fetch('http://localhost:3000/approvedTeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log('Data saved successfully:', data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Approved Team</h1>
      <table>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Name</th>
            <th>Role</th>
            <th>Availability</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedTeams.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.phase}
                  onChange={(e) => handleInputChange(index, 'phase', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.role}
                  onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.availability}
                  onChange={(e) => handleInputChange(index, 'availability', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.duration}
                  onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                />
              </td>
              <td>
                <Button onClick={() => handleUpdate(item._id)}>Update</Button>
                <Button onClick={() => handleDelete(item._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={handleAddRow}>Add Row</Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ApprovedTeamTable;
