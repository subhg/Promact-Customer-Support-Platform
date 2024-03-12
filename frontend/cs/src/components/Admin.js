// Admin.js
import React from 'react';
import CreateUserForm from './AdminContent/CreateUserForm';

const Admin = () => {
  const handleUserSubmit = (addedUser) => {
    // Handle the user submission logic here
    console.log('User submitted in Admin:', addedUser);
  };

  return (
    <div>
      <CreateUserForm onUserSubmit={handleUserSubmit} />
    </div>
  );
};

// Export the Admin component
export default Admin;
