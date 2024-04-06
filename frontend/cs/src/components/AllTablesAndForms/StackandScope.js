import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const StackandScope = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [projectStack, setProjectStack] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [scopes, setScopes] = useState([]);
  const [newScope, setNewScope] = useState({ description: '' });
  const [projectStacks, setProjectStacks] = useState([]);
  const [newProjectStack, setNewProjectStack] = useState('');

  // State variables for editable fields
  const [editStackIndex, setEditStackIndex] = useState(-1);
  const [editScopeIndex, setEditScopeIndex] = useState(-1);

  // Fetch scopes and project stacks on component mount
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
    fetchScopes();
    fetchProjectStacks();
  }, []);

  // Function to fetch scopes
  const fetchScopes = async () => {
    try {
      const response = await fetch('http://localhost:3000/scopes');
      const data = await response.json();
      setScopes(data);
    } catch (error) {
      console.error('Error fetching scope data:', error);
    }
  };

  // Function to fetch project stacks
  const fetchProjectStacks = async () => {
    try {
      const response = await fetch('http://localhost:3000/projectStacks');
      const data = await response.json();
      setProjectStacks(data);
    } catch (error) {
      console.error('Error fetching project stack data:', error);
    }
  };

  // Function to add a new scope
  const handleAddScope = async () => {
    try {
      const response = await fetch('http://localhost:3000/scopes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: projectScope }),
      });

      const addedScope = await response.json();
      console.log('Scope added successfully:', addedScope);

      // Update the state after adding
      setScopes([...scopes, addedScope]);

      // Clear input fields
      setNewScope({ description: '' });

      // Reset projectScope textarea
      setProjectScope('');
    } catch (error) {
      console.error('Error adding scope:', error);
    }
  };

  // Function to add a new project stack
  const handleAddProjectStack = async () => {
    try {
      const response = await fetch('http://localhost:3000/projectStacks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tech: newProjectStack }),
      });

      const addedProjectStack = await response.json();
      console.log('Project Stack added successfully:', addedProjectStack);

      // Update the state after adding
      setProjectStacks([...projectStacks, addedProjectStack]);

      // Clear input field
      setNewProjectStack('');
    } catch (error) {
      console.error('Error adding project stack:', error);
    }
  };

  // Function to update an existing project stack
  const handleUpdateProjectStack = async (id, updatedStack) => {
    try {
      const response = await fetch(`http://localhost:3000/projectStacks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStack),
      });

      const updatedResult = await response.json();
      console.log('Project Stack updated successfully:', updatedResult);

      // Update the state after updating
      const updatedStacks = projectStacks.map(stack =>
        stack._id === id ? updatedResult : stack
      );
      setProjectStacks(updatedStacks);

      // Reset edit index
      setEditStackIndex(-1);
    } catch (error) {
      console.error('Error updating project stack:', error);
    }
  };

  // Function to delete an existing project stack
  const handleDeleteProjectStack = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projectStacks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted stack from state
        const updatedStacks = projectStacks.filter(stack => stack._id !== id);
        setProjectStacks(updatedStacks);
        console.log('Project Stack deleted successfully');
      } else {
        console.error('Error deleting project stack:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting project stack:', error);
    }
  };

  // Function to update an existing scope
  const handleUpdateScope = async (id, updatedScope) => {
    try {
      const response = await fetch(`http://localhost:3000/scopes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedScope),
      });

      const updatedResult = await response.json();
      console.log('Scope updated successfully:', updatedResult);

      // Update the state after updating
      const updatedScopes = scopes.map((scope, index) =>
        index === editScopeIndex ? updatedResult : scope
      );
      setScopes(updatedScopes);

      // Reset edit index
      setEditScopeIndex(-1);
    } catch (error) {
      console.error('Error updating scope:', error);
    }
  };

  // Function to delete an existing scope
  const handleDeleteScope = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/scopes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted scope from state
        const updatedScopes = scopes.filter(scope => scope._id !== id);
        setScopes(updatedScopes);
        console.log('Scope deleted successfully');
      } else {
        console.error('Error deleting scope:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting scope:', error);
    }
  };

  return (
    <div>
      {/* Project Stack Dropdown */}
      {(userRole === 'admin' || userRole === 'project manager') && (
        <div>
          <label>Project Stack:</label>
          <select value={projectStack} onChange={(e) => setProjectStack(e.target.value)}>
            <option value="">Select Project Stack</option>
            <option value="Backend">Backend</option>
            <option value="Frontend">Frontend</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Database">Database</option>
            <option value="Infrastructure and Service">Infrastructure and Service</option>
          </select>
          <button  className='button' onClick={handleAddProjectStack}>Add Project Stack</button>
        </div>
      )}

      {/* Display Project Stack List */}
      {projectStacks.map((stack, index) => (
        <div key={stack._id}>
          {editStackIndex === index ? (
            <>
              <input
                type="text"
                value={projectStack}
                onChange={(e) => setProjectStack(e.target.value)}
              />
              <button className="button"onClick={() => handleUpdateProjectStack(stack._id, { tech: projectStack })}>Update</button>
            </>
          ) : (
            <>
              <span>{stack.tech}</span>
              {(userRole === 'admin' || userRole === 'project manager') && (
                <>
                  <button className="button" onClick={() => setEditStackIndex(index)}>Edit</button>
                  <button className="button" onClick={() => handleDeleteProjectStack(stack._id)}>Delete</button>
                </>
              )}
            </>
          )}
        </div>
      ))}

      {/* Project Scope Textarea */}
      {(userRole === 'admin' || userRole === 'project manager') && (
        <div>
          <label>Project Scope:</label>
          <textarea className='input' value={projectScope} onChange={(e) => setProjectScope(e.target.value)} />
          <button  className='button' onClick={handleAddScope}>Add Project Scope</button>
        </div>
      )}

      {/* Display Project Scope with Edit and Delete Button */}
      {scopes.map((scope, index) => (
        <div key={scope._id}>
          {editScopeIndex === index ? (
            <>
              <input
  
                
                type="text"
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
              />
              <button  className='button' onClick={() => handleUpdateScope(scope._id, { description: projectScope })}>Update</button>
            </>
          ) : (
            <>
              <span>{scope.description}</span>
              {(userRole === 'admin' || userRole === 'project manager') && (
                <>
                  <button  className='button' onClick={() => setEditScopeIndex(index)}>Edit</button>
                  <button  className='button' onClick={() => handleDeleteScope(scope._id)}>Delete</button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default StackandScope;
