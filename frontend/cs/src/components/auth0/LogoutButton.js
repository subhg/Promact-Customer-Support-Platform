// LogoutButton.js

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
//import { Button } from "monday-ui-react-core";

/**
 * LogoutButton component renders a button that triggers Auth0 logout with redirect
 * when clicked.
 */
const LogoutButton = () => {
  // Retrieve the logout function from the Auth0 hook
  const { logout } = useAuth0();

  return (
    // Render a button that triggers logout with redirect on click
    <div className="logout-button">
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;
