// LogoutButton.js
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "monday-ui-react-core";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="logout-button">
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
    </div>
  );
};

export default LogoutButton;
