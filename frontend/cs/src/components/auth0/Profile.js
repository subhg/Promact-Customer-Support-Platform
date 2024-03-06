// Profile.js
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './Profile.css'; // Import the CSS file
import { Avatar } from "monday-ui-react-core";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile-container">
        <Avatar
        ariaLabel={user.name}
        size="large"
        src={user.picture}
        type="img"
    />
     
        <div className="profile-info">
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;
