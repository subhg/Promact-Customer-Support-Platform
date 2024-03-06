// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());






// Import CRUD operations
const {
  createApprovedTeam,
  getApprovedTeamById,
  getAllApprovedTeams,
  updateApprovedTeam,
  deleteApprovedTeam,
} = require('./crudOperations/ApprovedTeamCrud');

const {
  createResource,
  getResourceById,
  getAllResource,
  updateResource,
  deleteResource,
} = require('./crudOperations/ResourceCrud');

const {
  createClientFeedback,
  getClientFeedbackById,
  getAllClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
} = require('./crudOperations/ClientFeedbackCrud');

const {
  createProjectUpdate,
  getProjectUpdateById,
  getAllProjectUpdate,
  updateProjectUpdate,
  deleteProjectUpdate,
} = require('./crudOperations/ProjectUpdateCrud');

const {
  createClientMeeting,
  getClientMeetingById,
  getAllClientMeeting,
  updateClientMeeting,
  deleteClientMeeting,
} = require('./crudOperations/ClientMeetingCrud');

// Set up express app

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/customersupport', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes for CRUD operations

// ApprovedTeam CRUD
app.post('/approvedTeam', async (req, res) => {
  try {
    const result = await createApprovedTeam(req.body);  
    res.json(result);
   // console.log('Received Data:', req.body);
  } 

  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/approvedTeam/:id', async (req, res) => {
  try {
    const result = await getApprovedTeamById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/approvedTeam', async (req, res) => {
  try {
    const result = await getAllApprovedTeams();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/approvedTeam/:id', async (req, res) => {
  try {
    const result = await updateApprovedTeam(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/approvedTeam/:id', async (req, res) => {
  try {
    const result = await deleteApprovedTeam(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resource CRUD
app.post('/resource', async (req, res) => {
  try {
    const result = await createResource(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/resource', async (req, res) => {
  try {
    const result = await getAllResource();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/resource/:id', async (req, res) => {
  try {
    const result = await getResourceById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/resource/:id', async (req, res) => {
  try {
    const result = await updateResource(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/resource/:id', async (req, res) => {
  try {
    const result = await deleteResource(req.params.id);
    res.json({status: "Success"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ClientFeedback CRUD
app.post('/clientFeedback', async (req, res) => {
  try {
    const result = await createClientFeedback(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clientFeedback/:id', async (req, res) => {
  try {
    const result = await getClientFeedbackById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clientFeedback', async (req, res) => {
  try {
    const result = await getAllClientFeedback();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/clientFeedback/:id', async (req, res) => {
  try {
    const result = await updateClientFeedback(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/clientFeedback/:id', async (req, res) => {
  try {
    const result = await deleteClientFeedback(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ProjectUpdate CRUD
app.post('/projectUpdate', async (req, res) => {
  try {
    const result = await createProjectUpdate(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projectUpdate/:id', async (req, res) => {
  try {
    const result = await getProjectUpdateById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projectUpdate', async (req, res) => {
  try {
    const result = await getAllProjectUpdate();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/projectUpdate/:id', async (req, res) => {
  try {
    const result = await updateProjectUpdate(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/projectUpdate/:id', async (req, res) => {
  try {
    const result = await deleteProjectUpdate(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ClientMeeting CRUD
app.post('/clientMeeting', async (req, res) => {
  try {
    const result = await createClientMeeting(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clientMeeting/:id', async (req, res) => {
  try {
    const result = await getClientMeetingById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/clientMeeting', async (req, res) => {
  try {
    const result = await getAllClientMeeting();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/clientMeeting/:id', async (req, res) => {
  try {
    const result = await updateClientMeeting(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/clientMeeting/:id', async (req, res) => {
  try {
    const result = await deleteClientMeeting(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
