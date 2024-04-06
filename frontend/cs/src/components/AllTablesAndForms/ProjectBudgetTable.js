import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ProjectBudgetTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null); // State to store user role
  const [projectBudgets, setProjectBudgets] = useState([]);
  const [newProjectBudget, setNewProjectBudget] = useState({ projectType: '', durationMonths: '', budgetedHours: '' });
  const [editingRows, setEditingRows] = useState({}); // State to track which rows are in editing mode

  // Effect to fetch user role once authenticated
  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && user && user.email) {
        try {
          // Fetch user role based on user email
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

          setUserRole(role); // Set user role in state
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  // Effect to fetch project budgets based on user role
  useEffect(() => {
    const fetchProjectBudgets = async () => {
      try {
        const response = await fetch('http://localhost:3000/projectBudgets');
        const data = await response.json();
        setProjectBudgets(data);
      } catch (error) {
        console.error('Error fetching project budgets:', error);
      }
    };

    if (userRole) {
      fetchProjectBudgets();
    }
  }, [userRole]);

  // Function to handle input change in table cells
  const handleInputChange = (key, value, budgetId) => {
    if (budgetId) {
      // Update project budget in editing mode
      setProjectBudgets(prevBudgets =>
        prevBudgets.map(budget =>
          budget._id === budgetId ? { ...budget, [key]: value } : budget
        )
      );
    } else {
      // Update new project budget
      setNewProjectBudget(prevNewBudget => ({ ...prevNewBudget, [key]: value }));
    }
  };

  // Function to add a new project budget
  const handleAddProjectBudget = async () => {
    try {
      const response = await fetch('http://localhost:3000/projectBudgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProjectBudget),
      });

      const addedProjectBudget = await response.json();
      console.log('Project budget added successfully:', addedProjectBudget);

      setProjectBudgets([...projectBudgets, addedProjectBudget]);
      setNewProjectBudget({ projectType: '', durationMonths: '', budgetedHours: '' });
    } catch (error) {
      console.error('Error adding project budget:', error);
    }
  };

  // Function to update a project budget
  const handleUpdateProjectBudget = async (id) => {
    try {
      const updatedProjectBudget = projectBudgets.find(budget => budget._id === id);

      const response = await fetch(`http://localhost:3000/projectBudgets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProjectBudget),
      });

      const updatedResult = await response.json();
      console.log('Project budget updated successfully:', updatedResult);

      setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: false }));
    } catch (error) {
      console.error('Error updating project budget:', error);
    }
  };

  // Function to delete a project budget
  const handleDeleteProjectBudget = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projectBudgets/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Project budget deleted successfully:', deletedResult);

      const updatedBudgets = projectBudgets.filter(budget => budget._id !== id);
      setProjectBudgets(updatedBudgets);
    } catch (error) {
      console.error('Error deleting project budget:', error);
    }
  };

  // Function to toggle editing mode for a row
  const toggleEditing = (id) => {
    setEditingRows(prevEditingRows => ({ ...prevEditingRows, [id]: !prevEditingRows[id] }));
  };

  return (
    <div>
      <h1>Project Budget</h1>
      <table className='table'>
        <thead className='header'>
          <tr>
            <th>Project Type</th>
            <th>Duration (Months)</th>
            <th>Budgeted Hours</th>
            {userRole === 'admin' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {projectBudgets.map(budget => (
            <tr key={budget._id}>
              <td>
                {editingRows[budget._id] ? (
                  <select
                    className='input'
                    value={budget.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value, budget._id)}
                  >
                    <option value="Fixed Budget">Fixed Budget</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                ) : (
                  budget.projectType
                )}
              </td>
              <td>
                {editingRows[budget._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={budget.durationMonths}
                    onChange={(e) => handleInputChange('durationMonths', e.target.value, budget._id)}
                  />
                ) : (
                  budget.durationMonths
                )}
              </td>
              <td>
                {editingRows[budget._id] ? (
                  <input
                    className='input'
                    type="text"
                    value={budget.budgetedHours}
                    onChange={(e) => handleInputChange('budgetedHours', e.target.value, budget._id)}
                  />
                ) : (
                  budget.budgetedHours
                )}
              </td>
              {userRole === 'admin' || userRole === 'auditor' ? (
                <td>
                  {editingRows[budget._id] ? (
                    <button className='button' onClick={() => handleUpdateProjectBudget(budget._id)}>Update</button>
                  ) : (
                    <button className='button' onClick={() => toggleEditing(budget._id)}>Edit</button>
                  )}
                  <button className='button' onClick={() => handleDeleteProjectBudget(budget._id)}>Delete</button>
                </td>
              ) : (
                <td></td> // For project manager, hide action buttons
              )}
            </tr>
          ))}
          {userRole === 'admin' && (
            <tr>
              <td>
                <select
                  className='input'
                  value={newProjectBudget.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                >
                  <option value="Fixed Budget">Fixed Budget</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </td>
              <td>
                <input
                  className='input'
                  type="text"
                  value={newProjectBudget.durationMonths}
                  onChange={(e) => handleInputChange('durationMonths', e.target.value)}
                />
              </td>
              <td>
                <input
                  className='input'
                  type="text"
                  value={newProjectBudget.budgetedHours}
                  onChange={(e) => handleInputChange('budgetedHours', e.target.value)}
                />
              </td>
              <td>
                <button className='button' onClick={handleAddProjectBudget}>Add Budget</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectBudgetTable;
