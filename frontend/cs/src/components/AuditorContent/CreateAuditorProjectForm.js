import React, { useState, useEffect } from 'react';
//import { Button } from 'monday-ui-react-core';
import './CreateAuditorProjectForm.css';
//import AuditorProjectFormTable from './AuditorProjectFormTable'; // Import the AuditorProjectTable component

const CreateAuditorProjectForm = ({ onFormSubmit }) => {
  const [project, setProject] = useState({ projectName: '', projectManager: '', clients: [] });
  const [successMessage, setSuccessMessage] = useState('');
  const [formKey, setFormKey] = useState(0);
  const [auditorProjects, setAuditorProjects] = useState([]); // State to store fetched auditor projects

  useEffect(() => {
    fetchAuditorProjects();
  }, []); // Fetch auditor projects on component mount

  const fetchAuditorProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditorProjectForm');
      const data = await response.json();
      setAuditorProjects(data);
    } catch (error) {
      console.error('Error fetching auditor projects:', error);
    }
  };

  const handleInputChange = (key, value) => {
    setProject((prevProject) => ({ ...prevProject, [key]: value }));
  };
  
  const handleClientInputChange = (index, key, value) => {
    const updatedClients = [...project.clients];
    updatedClients[index][key] = value;
    setProject((prevProject) => ({ ...prevProject, clients: updatedClients }));
  };

  const handleAddClient = () => {
    setProject((prevProject) => ({
      ...prevProject,
      clients: [...prevProject.clients, { clientName: '', clientMail: '' }],
    }));
  };

  const handleRemoveClient = (index) => {
    const updatedClients = [...project.clients];
    updatedClients.splice(index, 1);
    setProject((prevProject) => ({ ...prevProject, clients: updatedClients }));
  };

  const handleSaveForm = async () => {
    try {
      const response = await fetch('http://localhost:3000/auditorProjectForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });

      const addedProject = await response.json();
      console.log('Auditor Project added successfully:', addedProject);

      // Trigger the parent component's callback to update the project list
      if (typeof onFormSubmit === 'function') {
        onFormSubmit(addedProject);
      }

      // Set success message and reset after 3 seconds
      setSuccessMessage('Auditor Project added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Clear input fields after submission
      setProject({ projectName: '', projectManager: '', clients: [] });

      // Trigger the form reset by incrementing the form key
      setFormKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error adding Auditor Project:', error);
    }
  };

  return (
    <div>
      <div className="auditor-project-form-container">
        <h2>Create Project </h2>

        {successMessage && <div className="success-message">{successMessage}</div>}

        <form key={formKey}>
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={project.projectName}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectManager">Project Manager:</label>
            <input
              type="text"
              id="projectManager"
              name="projectManager"
              value={project.projectManager}
              onChange={(e) => handleInputChange('projectManager', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Client Details:</label>
            {project.clients.map((client, index) => (
              <div key={index} className="client-details">
                <input
                  type="text"
                  placeholder="Name"
                  value={client.clientName}
                  onChange={(e) => handleClientInputChange(index, 'clientName', e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={client.clientMail}
                  onChange={(e) => handleClientInputChange(index, 'clientMail', e.target.value)}
                />
                <button  className='button' type="button" onClick={() => handleRemoveClient(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button className='button' type="button" onClick={handleAddClient}>
              Add Client
            </button>
          </div>

          <button  className='button' type="button" onClick={handleSaveForm}>
            Save
          </button>
        </form>
      </div>

    </div>
  );
};

export default CreateAuditorProjectForm;
