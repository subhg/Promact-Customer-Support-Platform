// Login.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Profile from './Profile';

/**
 * Login component handles the rendering of either the user profile or the login button
 * based on the authentication status using Auth0.
 */
const Login = () => {
  // Retrieve authentication status using Auth0 hook
  const { isAuthenticated } = useAuth0();

  return (
    // Render the user profile component if authenticated, otherwise render the login button
    <div className="login-button">
      {isAuthenticated ? <Profile /> : <LoginButton />}
    </div>
  );
};

export default Login;
