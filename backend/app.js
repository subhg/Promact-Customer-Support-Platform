// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const approvedTeamRoutes = require('./Routes/approvedTeamRoutes')
const resourceRoutes = require('./Routes/resourceRoutes');
const clientFeedbackRoutes = require('./Routes/clientFeedbackRoutes');
const projectUpdateRoutes = require('./Routes/projectUpdateRoutes');
const clientMeetingRoutes= require('./Routes/clientMeetingRoutes');
const projectBudgetRoutes= require('./Routes/projectBudgetRoutes')
const auditHistoryRoutes = require('./Routes/auditHistoryRoutes');
const versionHistoryRoutes = require('./Routes/versionHistoryRoutes');
const projectDescriptionRoutes = require('./Routes/projectDescriptionRoutes');
const scopeRoutes = require('./Routes/scopeRoutes');
const projectStackRoutes = require('./Routes/projectStackRoutes');
const escalationMatrixRoutes = require('./Routes/escalationMatrixRoutes');
const stakeholderRoutes = require('./Routes/stakeholderRoutes');
const riskProfilingRoutes = require('./Routes/riskProfilingRoutes');
const phasesRoutes = require('./Routes/phasesRoutes');
const sprintRoutes = require('./Routes/sprintRoutes');
const timelineRoutes = require('./Routes/timelineRoutes');
const auditorProjectFormRoutes = require('./Routes/auditorProjectFormRoutes');
const allProjectRoutes = require('./Routes/allProjectRoutes');









const userRoutes= require('./Routes/userRoutes')
const UserModel = require('./models/userModel');
//const ClientMeeting = require('./models/ClientMeeting');





app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));



app.use('/approvedTeam', approvedTeamRoutes);
app.use('/resource', resourceRoutes);
app.use('/clientFeedback', clientFeedbackRoutes);
app.use('/projectUpdate', projectUpdateRoutes);
app.use('/auditHistory', auditHistoryRoutes);
app.use('/clientMeeting',clientMeetingRoutes);
app.use('/projectBudget',projectBudgetRoutes);
app.use('/versionHistory', versionHistoryRoutes);
app.use('/projectDescription', projectDescriptionRoutes);
app.use('/scope', scopeRoutes);
app.use('/projectStacks', projectStackRoutes);
app.use('/escalationMatrix', escalationMatrixRoutes);
app.use('/stakeholders',stakeholderRoutes);
app.use('/riskProfiling', riskProfilingRoutes);
app.use('/phases', phasesRoutes);
app.use('/sprint', sprintRoutes);
app.use('/timeline', timelineRoutes);
app.use('/auditorProjectForm', auditorProjectFormRoutes);
app.use('/projects', allProjectRoutes);







app.use('/user',userRoutes)

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

// Endpoint to check if the email exists in the database and get the role
app.post('/verify-email', async (req, res) => {
  console.log("Received request:", req.body);
  try {
    const { email } = req.body;
    console.log('verify-email',req.body)
    const user = await UserModel.findOne({ email });
    if (user) {
      res.json({ exists: true, role: user.role });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Define route to get user role by email
app.post('/user-role', async (req, res) => {
  try {
    console.log('userrole',req.body)
    const { email } = req.body; // Get the email from the query parameters
    const user = await UserModel.findOne({ email }); // Find the user by email
    if (user) {
      res.json({ role: user.role }); // Respond with the user's role
    } else {
      res.status(404).json({ error: 'User not found' }); // User not found error
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Internal server error
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Import CRUD operations
// const {
//   createApprovedTeam,
//   getApprovedTeamById,
//   getAllApprovedTeams,
//   updateApprovedTeam,
//   deleteApprovedTeam,
// } = require('./crudOperations/ApprovedTeamCrud');

// const {
//   createResource,
//   getResourceById,
//   getAllResource,
//   updateResource,
//   deleteResource,
// } = require('./crudOperations/ResourceCrud');

// const {
//   createClientFeedback,
//   getClientFeedbackById,
//   getAllClientFeedback,
//   updateClientFeedback,
//   deleteClientFeedback,
// } = require('./crudOperations/ClientFeedbackCrud');

// const {
//   createProjectUpdate,
//   getProjectUpdateById,
//   getAllProjectUpdate,
//   updateProjectUpdate,
//   deleteProjectUpdate,
// } = require('./crudOperations/ProjectUpdateCrud');

// const {
//   createClientMeeting,
//   getClientMeetingById,
//   getAllClientMeeting,
//   updateClientMeeting,
//   deleteClientMeeting,
// } = require('./crudOperations/ClientMeetingCrud');

// const{
//   createProjectBudget,
//   getProjectBudgetById,
//   getAllProjectBudgets,
//   updateProjectBudget,
//   deleteProjectBudget,
// }= require('./crudOperations/ProjectBudgetCrud')


// const{
//   createUser,
//   getAllUser,
// }= require('./crudOperations/userController');

// Set up express app




// app.post('/user', async (req, res) => {
//   try {
//     const result = await createUser(req.body);  
//     res.json(result);
//    // console.log('Received Data:', req.body);
//   } 

//   catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/user', async (req, res) => {
//   try {
//     const result = await getAllUser();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// Routes for CRUD operations

// ApprovedTeam CRUD
// app.post('/approvedTeam', async (req, res) => {
//   try {
//     const result = await createApprovedTeam(req.body);  
//     res.json(result);
//    // console.log('Received Data:', req.body);
//   } 

//   catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/approvedTeam/:id', async (req, res) => {
//   try {
//     const result = await getApprovedTeamById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/approvedTeam', async (req, res) => {
//   try {
//     const result = await getAllApprovedTeams();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/approvedTeam/:id', async (req, res) => {
//   try {
//     const result = await updateApprovedTeam(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/approvedTeam/:id', async (req, res) => {
//   try {
//     const result = await deleteApprovedTeam(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Resource CRUD
// app.post('/resource', async (req, res) => {
//   try {
//     const result = await createResource(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/resource', async (req, res) => {
//   try {
//     const result = await getAllResource();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/resource/:id', async (req, res) => {
//   try {
//     const result = await getResourceById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// app.put('/resource/:id', async (req, res) => {
//   try {
//     const result = await updateResource(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/resource/:id', async (req, res) => {
//   try {
//     const result = await deleteResource(req.params.id);
//     res.json({status: "Success"});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ClientFeedback CRUD
// app.post('/clientFeedback', async (req, res) => {
//   try {
//     const result = await createClientFeedback(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/clientFeedback/:id', async (req, res) => {
//   try {
//     const result = await getClientFeedbackById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/clientFeedback', async (req, res) => {
//   try {
//     const result = await getAllClientFeedback();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/clientFeedback/:id', async (req, res) => {
//   try {
//     const result = await updateClientFeedback(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/clientFeedback/:id', async (req, res) => {
//   try {
//     const result = await deleteClientFeedback(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ProjectUpdate CRUD
// app.post('/projectUpdate', async (req, res) => {
//   try {
//     const result = await createProjectUpdate(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/projectUpdate/:id', async (req, res) => {
//   try {
//     const result = await getProjectUpdateById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/projectUpdate', async (req, res) => {
//   try {
//     const result = await getAllProjectUpdate();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/projectUpdate/:id', async (req, res) => {
//   try {
//     const result = await updateProjectUpdate(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/projectUpdate/:id', async (req, res) => {
//   try {
//     const result = await deleteProjectUpdate(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ClientMeeting CRUD
// app.post('/clientMeeting', async (req, res) => {
//   try {
//     const result = await createClientMeeting(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/clientMeeting/:id', async (req, res) => {
//   try {
//     const result = await getClientMeetingById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/clientMeeting', async (req, res) => {
//   try {
//     const result = await getAllClientMeeting();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/clientMeeting/:id', async (req, res) => {
//   try {
//     const result = await updateClientMeeting(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/clientMeeting/:id', async (req, res) => {
//   try {
//     const result = await deleteClientMeeting(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// Project Budget Crud

// app.post('/projectBudget', async (req, res) => {
//   try {
//     const result = await createProjectBudget(req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/projectBudget/:id', async (req, res) => {
//   try {
//     const result = await getProjectBudgetById(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/projectBudget', async (req, res) => {
//   try {
//     const result = await getAllProjectBudgets();
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.put('/projectBudget/:id', async (req, res) => {
//   try {
//     const result = await updateProjectBudget(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.delete('/projectBudget/:id', async (req, res) => {
//   try {
//     const result = await deleteProjectBudget(req.params.id);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });









