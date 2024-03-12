// CreateUserForm.js

import React, { useState } from 'react';
import { Button } from 'monday-ui-react-core';
import './CreateUserForm.css';

const CreateUserForm = ({ onUserSubmit }) => {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [formKey, setFormKey] = useState(0); // Introduce a state variable for form key

  const handleInputChange = (key, value) => {
    setUser((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const addedUser = await response.json();
      console.log('User added successfully:', addedUser);

      // Trigger the parent component's callback to update the user list
      onUserSubmit(addedUser);

      // Set success message and reset after 3 seconds
      setSuccessMessage('User added successfully');
      setTimeout(() => setSuccessMessage(''), 1000);

      // Clear input fields after submission
      setUser({ name: '', email: '', password: '', role: '' });

      // Trigger the form reset by incrementing the form key
      setFormKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>User Registration Form</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Add a key to the form for easy reset */}
      <form key={formKey}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          {/* Dropdown menu for selecting roles */}
          <select
            id="role"
            name="role"
            value={user.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="auditor">Auditor</option>
            <option value="project manager">Project Manager</option>
            <option value="client">Client</option>
          </select>
        </div>

        <Button type="button" onClick={handleAddUser}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateUserForm;
