// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

const approvedTeamRoutes = require('./routes/approvedTeamRoutes')
const resourceRoutes = require('./routes/resourceRoutes');
const clientFeedbackRoutes = require('./routes/clientFeedbackRoutes');
const projectUpdateRoutes = require('./routes/projectUpdateRoutes');
const clientMeetingRoutes= require('./routes/clientMeetingRoutes');
const projectBudgetRoutes= require('./routes/projectBudgetRoutes')
const auditHistoryRoutes = require('./routes/auditHistoryRoutes');
const versionHistoryRoutes = require('./routes/versionHistoryRoutes');
const projectDescriptionRoutes = require('./routes/projectDescriptionRoutes');
const scopeRoutes = require('./routes/scopeRoutes');
const projectStackRoutes = require('./routes/projectStackRoutes');
const escalationMatrixRoutes = require('./routes/escalationMatrixRoutes');
const stakeholderRoutes = require('./routes/stakeholderRoutes');
const riskProfilingRoutes = require('./routes/riskProfilingRoutes');
const phasesRoutes = require('./routes/phasesRoutes');
const sprintRoutes = require('./routes/sprintRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const auditorProjectFormRoutes = require('./routes/auditorProjectFormRoutes');
const allProjectRoutes = require('./routes/allProjectRoutes');
const userRoutes= require('./routes/userRoutes')
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











