// Login.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import Profile from './Profile';

const Login = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="login-button">
      {isAuthenticated ? <Profile /> : <LoginButton />}
    </div>
  );
};

export default Login;
