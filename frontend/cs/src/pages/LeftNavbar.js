import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuditorLeftNavbar from '../components/RolewiseLeftNavbar/AuditorLeftNavbar';
import AdminLeftNavbar from '../components/RolewiseLeftNavbar/AdminLeftNavbar';
import ProjectManagerLeftNavbar from '../components/RolewiseLeftNavbar/ProjectManagerLeftNavbar'
import ClientLeftNavbar from '../components/RolewiseLeftNavbar/ClientleftNavbar';
// Import other role-specific left navbar components if needed

const LeftNavbar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null); // State to store user role

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

          setUserRole(role); // Set user role in state
        } catch (error) {
          console.error('Error verifying email:', error);
        }
      }
    };

    fetchUserRole();
  }, [isAuthenticated, user]);

  return (
    <>
      {isAuthenticated && userRole && (
        <>
          {/* Render role-specific left navbar based on user role */}
          {userRole === 'auditor' && <AuditorLeftNavbar />}
          {userRole === 'admin' && <AdminLeftNavbar />}
          {userRole==='project manager'&& <ProjectManagerLeftNavbar/>}
          {userRole==='client'&& <ClientLeftNavbar/>}

          {/* Add other role-specific left navbar components here */}
        </>
      )}
    </>
  );
};

export default LeftNavbar;
