// routes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectManager from './components/ProjectManager';
import Admin from './components/Admin';
import Auditor from './components/Auditor';
import Client from './components/Client';

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
