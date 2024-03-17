// Profile.js

import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import './Profile.css'; // Import the CSS file
import { Avatar } from "monday-ui-react-core";

/**
 * Profile component displays user information including name and role
 * with an avatar image.
 */
const Profile = () => {
  // Retrieve user information, authentication status, and loading state using Auth0 hook
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userRole, setUserRole] = useState(null);

  // Fetch user role based on user email
  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && user && user.email) {
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
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  // Display loading message while authentication information is being retrieved
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    // Display user profile if authenticated
    isAuthenticated && (
      <div className="profile-container">
        {/* Display user avatar */}
        <Avatar
          ariaLabel={user.name}
          size="large"
          src={user.picture}
          type="img"
        />
        {/* Display user name and role */}
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-role">{userRole}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
