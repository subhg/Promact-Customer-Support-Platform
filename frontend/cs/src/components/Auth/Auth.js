// Auth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isAuthenticated && user && user.email) {
        try {
          // Fetch user role based on user email
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

          // Redirect based on user role
          switch (role) {
            case 'admin':
              navigate('/Admin');
              break;
            case 'auditor':
              navigate('/Auditor');
              break;
            case 'project manager':
              navigate('/ProjectManager');
              break;
              case 'client':
                navigate('/Client');
                break;
            // Add cases for other roles as needed
            default:
              // Handle other roles or unexpected scenarios
              navigate('/Unauthorized');
              break;
          }
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user, navigate]);

  return <>{children}</>;
};

export default Auth;
