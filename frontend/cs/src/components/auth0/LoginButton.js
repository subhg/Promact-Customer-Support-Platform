// LoginButton.js
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "monday-ui-react-core";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect()}>Login</Button>
  );
};

export default LoginButton;
