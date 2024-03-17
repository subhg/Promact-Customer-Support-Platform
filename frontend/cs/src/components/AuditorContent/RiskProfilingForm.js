import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RiskProfilingForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [riskData, setRiskData] = useState([]);
  const [formData, setFormData] = useState({
    riskType: '',
    description: '',
    severity: '',
    impact: '',
    remedialSteps: '',
    status: '',
    closureDate: ''
  });
  const [editingId, setEditingId] = useState(null);

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
    fetchRiskData();
  }, []);

  const fetchRiskData = async () => {
    try {
      const response = await fetch('http://localhost:3000/riskProfiling');
      const data = await response.json();
      setRiskData(data);
    } catch (error) {
      console.error('Error fetching risk data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      riskType: '',
      description: '',
      severity: '',
      impact: '',
      remedialSteps: '',
      status: '',
      closureDate: ''
    });
  };

  const handleEdit = (id) => {
    const risk = riskData.find((risk) => risk._id === id);
    if (risk) {
      setEditingId(id);
      setFormData({
        riskType: risk.riskType,
        description: risk.description,
        severity: risk.severity,
        impact: risk.impact,
        remedialSteps: risk.remedialSteps,
        status: risk.status,
        closureDate: risk.closureDate ? risk.closureDate.substring(0, 10) : ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        response = await fetch(`http://localhost:3000/riskProfiling/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch('http://localhost:3000/riskProfiling', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (response.ok) {
        console.log('Risk data saved successfully');
        fetchRiskData();
        handleAdd(); // Clear form after submission
      } else {
        console.error('Failed to save risk data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving risk data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/riskProfiling/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Risk deleted successfully:', id);
        fetchRiskData();
        handleAdd(); // Clear form after deletion
      } else {
        console.error('Error deleting risk:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting risk:', error);
    }
  };

  return (
    <div>
      <h1>Risk Profiling</h1>
      {(userRole === 'admin' || userRole === 'project manager') && (
        <form onSubmit={handleSubmit}>
          <label>
            Risk Type:
            <select
              name="riskType"
              value={formData.riskType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              <option value="Financial">Financial</option>
              <option value="Operational">Operational</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="External">External</option>
            </select>
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Severity:
            <select name="severity" value={formData.severity} onChange={handleInputChange} required>
              <option value="">Select Severity</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label>
            Impact:
            <select name="impact" value={formData.impact} onChange={handleInputChange} required>
              <option value="">Select Impact</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label>
            Remedial Steps:
            <input
              type="text"
              name="remedialSteps"
              value={formData.remedialSteps}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Closure Date:
            <input
              type="date"
              name="closureDate"
              value={formData.closureDate}
              onChange={handleInputChange}
            />
          </label>
          <button className='button' type="submit">{editingId ? 'Update' : 'Add'}</button>
        </form>
      )}
      <h2>Risk Profiling Table</h2>
      <table>
        <thead>
          <tr>
            <th>Risk Type</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Impact</th>
            <th>Remedial Steps</th>
            <th>Status</th>
            <th>Closure Date</th>
            {(userRole === 'admin' || userRole === 'project manager') && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {riskData.map((risk) => (
            <tr key={risk._id}>
              <td>{risk.riskType}</td>
              <td>{risk.description}</td>
              <td>{risk.severity}</td>
              <td>{risk.impact}</td>
              <td>{risk.remedialSteps}</td>
              <td>{risk.status}</td>
              <td>{risk.closureDate}</td>
              {(userRole === 'admin' || userRole === 'project manager') && (
                <td>
                  <button className='button' onClick={() => handleEdit(risk._id)}>Edit</button>
                  <button className='button' onClick={() => handleDelete(risk._id)}>Delete</button>
                </td>
              )} 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiskProfilingForm;
