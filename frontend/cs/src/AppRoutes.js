// routes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectManager from './pages/ProjectManagerDashboard';
import Admin from './pages/AdminDashboard';
import Auditor from './pages/AuditorDashboard';
import Client from './pages/ClientDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/ProjectManager" element={<ProjectManager />} />
      <Route path="/Client" element={<Client />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Auditor" element={<Auditor />} />

    </Routes>
  );
};

export default AppRoutes;
