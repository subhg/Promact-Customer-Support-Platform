import React, { useEffect, useState } from 'react';
import './AuditorProjectFormTable.css';

const AuditorProjectFormTable = () => {
  const [auditorProjects, setAuditorProjects] = useState([]);
  const [editingRows, setEditingRows] = useState({});

  // Fetch auditor projects on component mount
  useEffect(() => {
    fetchAuditorProjects();
  }, []);

  // Fetch auditor projects data from the API
  const fetchAuditorProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditorProjectForms');
      const data = await response.json();
      setAuditorProjects(data);
    } catch (error) {
      console.error('Error fetching auditor project forms:', error);
    }
  };

  // Delete auditor project by ID
  const handleDeleteProject = async (projectId) => {
    try {
      await fetch(`http://localhost:3000/auditorProjectForms/${projectId}`, {
        method: 'DELETE',
      });
      const updatedProjects = auditorProjects.filter(project => project._id !== projectId);
      setAuditorProjects(updatedProjects);
    } catch (error) {
      console.error('Error deleting auditor project:', error);
    }
  };

  // Update auditor project by ID
  const handleUpdateProject = async (projectId, updatedProject) => {
    try {
      await fetch(`http://localhost:3000/auditorProjectForms/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
      setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [projectId]: false }));
    } catch (error) {
      console.error('Error updating auditor project:', error);
    }
  };

  // Toggle editing mode for auditor project
  const toggleEditing = (projectId) => {
    setEditingRows((prevEditingRows) => ({ ...prevEditingRows, [projectId]: !prevEditingRows[projectId] }));
  };

  // Handle input change for auditor project details
  const handleInputChange = (projectId, key, value, clientIndex) => {
    setAuditorProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              clients: project.clients.map((client, index) =>
                index === clientIndex ? { ...client, [key]: value } : client
              ),
            }
          : project
      )
    );
  };

  return (
    <div>
      <h1>Auditor Project Forms</h1>
      <table className="table">
        <thead className="header">
          <tr>
            <th>Project Name</th>
            <th>Project Manager</th>
            <th>Client Name</th>
            <th>Client Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auditorProjects.map((project) => (
            <React.Fragment key={project._id}>
              <tr>
                <td rowSpan={project.clients.length + 1}>
                  {editingRows[project._id] ? (
                    <input
                      className="input"
                      type="text"
                      value={project.projectName}
                      onChange={(e) => handleInputChange(project._id, 'projectName', e.target.value)}
                    />
                  ) : (
                    project.projectName
                  )}
                </td>
                <td rowSpan={project.clients.length + 1}>
                  {editingRows[project._id] ? (
                    <input
                      className="input"
                      type="text"
                      value={project.projectManager}
                      onChange={(e) => handleInputChange(project._id, 'projectManager', e.target.value)}
                    />
                  ) : (
                    project.projectManager
                  )}
                </td>
              </tr>
              {project.clients.map((client, index) => (
                <tr key={index}>
                  <td>
                    {editingRows[project._id] ? (
                      <input
                        className="input"
                        type="text"
                        value={client.clientName}
                        onChange={(e) => handleInputChange(project._id, 'clientName', e.target.value, index)}
                      />
                    ) : (
                      client.clientName
                    )}
                  </td>
                  <td>
                    {editingRows[project._id] ? (
                      <input
                        className="input"
                        type="text"
                        value={client.clientMail}
                        onChange={(e) => handleInputChange(project._id, 'clientMail', e.target.value, index)}
                      />
                    ) : (
                      client.clientMail
                    )}
                  </td>
                  {index === 0 && (
                    <td rowSpan={project.clients.length} style={{ textAlign: 'center' }}>
                      {editingRows[project._id] ? (
                        <>
                          <button className="button" onClick={() => handleUpdateProject(project._id, project)}>Update</button>
                          <button className="button" onClick={() => toggleEditing(project._id)}>Cancel</button>
                        </>
                      ) : (
                        <button className="button" onClick={() => toggleEditing(project._id)}>Edit</button>
                      )}
                      <button className="button" onClick={() => handleDeleteProject(project._id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditorProjectFormTable;
