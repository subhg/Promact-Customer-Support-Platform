// Profile.js

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './Profile.css'; // Import the CSS file
import { Avatar } from "monday-ui-react-core";

/**
 * Profile component displays user information including name and email
 * with an avatar image.
 */
const Profile = () => {
  // Retrieve user information, authentication status, and loading state using Auth0 hook
  const { user, isAuthenticated, isLoading } = useAuth0();

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
        {/* Display user name and email */}
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
