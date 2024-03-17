import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AllProjectTable = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userRole, setUserRole] = useState(null);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ projectName: '', startDate: '', status: 'Pending', projectManager: '', members: 0 });

  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      // Fetch user role based on user email
      const fetchUserRole = async () => {
        try {
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
          setUserRole(role);
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      };

      fetchUserRole();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  const handleInputChange = (key, value, projectId) => {
    if (projectId) {
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project._id === projectId ? { ...project, [key]: value } : project
        )
      );
    } else {
      setNewProject(prevNewProject => ({ ...prevNewProject, [key]: value }));
    }
  };

  const handleAddProject = async () => {
    try {
      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      const addedProject = await response.json();
      console.log('Project added successfully:', addedProject);
      setProjects([...projects, addedProject]);
      setNewProject({ projectName: '', startDate: '', status: 'Pending', projectManager: '', members: 0 });
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleUpdateProject = async (id) => {
    try {
      const updatedProject = projects.find(project => project._id === id);
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      const updatedResult = await response.json();
      console.log('Project updated successfully:', updatedResult);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
      });

      const deletedResult = await response.json();
      console.log('Project deleted successfully:', deletedResult);
      const updatedProjects = projects.filter(project => project._id !== id);
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h1>All Projects</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Status</th>
            <th>Project Manager</th>
            <th>Members</th>
            {userRole === 'admin' || userRole === 'auditor' ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id}>
              <td>{project.projectName}</td>
              <td>{project.startDate}</td>
              <td>{project.status}</td>
              <td>{project.projectManager}</td>
              <td>{project.members}</td>
              {(userRole === 'admin' || userRole === 'auditor') && (
                <td>
                  <button className="button" onClick={() => handleUpdateProject(project._id)}>Update</button>
                  <button className="button" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
          {userRole === 'admin' || userRole === 'auditor' ? (
            <tr>
              <td>
                <input className="input" type="text" value={newProject.projectName} onChange={(e) => handleInputChange('projectName', e.target.value)} />
              </td>
              <td>
                <input className="input" type="date" value={newProject.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} />
              </td>
              <td>
                <select className="select" value={newProject.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="InProgress">InProgress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <input className="input" type="text" value={newProject.projectManager} onChange={(e) => handleInputChange('projectManager', e.target.value)} />
              </td>
              <td>
                <input className="input" type="number" value={newProject.members} onChange={(e) => handleInputChange('members', parseInt(e.target.value))} />
              </td>
              <td>
                <button className="add-button" onClick={handleAddProject}>Add Project</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default AllProjectTable;
