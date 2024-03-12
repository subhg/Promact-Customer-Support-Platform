// Auth.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Auth = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  if (isAuthenticated) {
    // If authenticated, send the email to your backend for verification
    fetch('http://localhost:3000/verify-email', {
        
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: user.email }),
    
    })

      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
            
          // Match the role and perform login logic here
          switch (data.role) {
            case 'admin':
                navigate('/Admin');
                break;
            case 'auditor':
              // Logic for auditor login
              break;
            case 'project manager':
              // Logic for project manager login
              break;
            case 'client':
              // Logic for client login
              break;
            default:
              // Handle other roles or unexpected scenarios
              break;
          }
        } else {
           //Email not found in the database, handle accordingly
        }
      })
      .catch((error) => {
        console.error('Error verifying email:', error);
      });
  }

  return <>{children}</>;
};

export default Auth;
