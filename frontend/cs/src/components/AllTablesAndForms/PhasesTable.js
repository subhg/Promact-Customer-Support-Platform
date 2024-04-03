import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PhasesTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [phases, setPhases] = useState([]);
  const [phase, setPhase] = useState({
    title: '',
    startDate: '',
    completionDate: '',
    approvalDate: '',
    status: '',
    revisedCompletionDate: '',
    comments: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

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
    if (userRole !== 'auditor' && userRole !== 'client') {
      fetchPhases();
    }
  }, [userRole]);

  const fetchPhases = async () => {
    try {
      const response = await fetch('http://localhost:3000/phases');
      const data = await response.json();
      setPhases(data);
    } catch (error) {
      console.error('Error fetching phase data:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setPhase((prevPhase) => ({ ...prevPhase, [key]: value }));
  };

  const handleSaveForm = async () => {
    try {
      let response;
      if (isEditing) {
        // Update phase
        response = await fetch(`http://localhost:3000/phases/${phase._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(phase),
        });
      } else {
        // Add new phase
        response = await fetch('http://localhost:3000/phases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(phase),
        });
      }

      if (response.ok) {
        console.log(`${isEditing ? 'Phase updated' : 'Phase added'} successfully`);
        fetchPhases();
        handleAdd();
        setSuccessMessage(`${isEditing ? 'Phase updated' : 'Phase added'} successfully`);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error(`Failed to ${isEditing ? 'update' : 'add'} phase:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} phase:`, error);
    }
  };

  const handleEdit = async (id) => {
    const editedPhase = phases.find((phase) => phase._id === id);
    if (editedPhase) {
      setPhase(editedPhase);
      setIsEditing(true); // Set editing mode to true
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/phases/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Phase deleted successfully:', id);
        fetchPhases();
        setSuccessMessage('Phase deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error('Error deleting phase:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting phase:', error);
    }
  };

  const handleAdd = () => {
    setPhase({
      title: '',
      startDate: '',
      completionDate: '',
      approvalDate: '',
      status: '',
      revisedCompletionDate: '',
      comments: ''
    });
    setIsEditing(false); // Set editing mode to false
  };

  return (
    <div>
      {(userRole === 'admin' || userRole === 'project manager') && (
        <div className="phase-form-container">
          <h2>{isEditing ? 'Update Phase' : 'Create Phase'}</h2>

          {successMessage && <div className="success-message">{successMessage}</div>}

          <form key={formKey}>
            {/* Form Inputs */}
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={phase.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={phase.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="completionDate">Completion Date:</label>
              <input
                type="date"
                id="completionDate"
                name="completionDate"
                value={phase.completionDate}
                onChange={(e) => handleInputChange('completionDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="approvalDate">Approval Date:</label>
              <input
                type="date"
                id="approvalDate"
                name="approvalDate"
                value={phase.approvalDate}
                onChange={(e) => handleInputChange('approvalDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={phase.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="Delayed">Delayed</option>
                <option value="On-time">On-time</option>
                <option value="Sign-off Pending">Sign-off Pending</option>
                <option value="Signed-off">Signed-off</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="revisedCompletionDate">Revised Completion Date:</label>
              <input
                type="date"
                id="revisedCompletionDate"
                name="revisedCompletionDate"
                value={phase.revisedCompletionDate}
                onChange={(e) => handleInputChange('revisedCompletionDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <input
                type="text"
                id="comments"
                name="comments"
                value={phase.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
              />
            </div>

            <button  className='button' type="button" onClick={handleSaveForm}>
              {isEditing ? 'Update' : 'Save Phase'}
            </button>
            {isEditing && (
              <button  className='button' type="button" onClick={handleAdd}>
                Cancel
              </button>
            )}
          </form>
        </div>
      )}

      <div>
        <h2>Phases Table</h2>
        <table className="phases-table">
          {/* Table Header */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>Completion Date</th>
              <th>Approval Date</th>
              <th>Status</th>
              <th>Revised Completion Date</th>
              <th>Comments</th>
              {(userRole === 'admin' || userRole === 'project manager') && <th>Actions</th>}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {phases.map((phase) => (
              <tr key={phase._id}>
                <td>{phase.title}</td>
                <td>{phase.startDate}</td>
                <td>{phase.completionDate}</td>
                <td>{phase.approvalDate}</td>
                <td>{phase.status}</td>
                <td>{phase.revisedCompletionDate}</td>
                <td>{phase.comments}</td>
                {(userRole === 'admin' || userRole === 'project_manager') && (
                  <td>
                    <button  className='button' onClick={() => handleEdit(phase._id)}>Edit</button>
                    <button className='button' onClick={() => handleDelete(phase._id)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhasesTable;
