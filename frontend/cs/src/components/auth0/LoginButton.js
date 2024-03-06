// LoginButton.js

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "monday-ui-react-core";

/**
 * LoginButton component renders a button that triggers Auth0 login with redirect
 * when clicked.
 */
const LoginButton = () => {
  // Retrieve the loginWithRedirect function from the Auth0 hook
  const { loginWithRedirect } = useAuth0();

  return (
    // Render a button that triggers loginWithRedirect on click
    <Button onClick={() => loginWithRedirect()}>Login</Button>
  );
};

export default LoginButton;
