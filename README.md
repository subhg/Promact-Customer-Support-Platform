# Customer Success Platform

The Customer Success Platform is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It automates the process of notifying stakeholders about any updates or changes within the system, aiming to enhance communication and transparency by ensuring that all stakeholders are promptly informed whenever there is a relevant update.

## Functionality

### Role-Based Access Control

#### Admin Role
![Capture](https://github.com/subhg/Promact-Customer-Support-Platform/assets/113555022/1ac84997-fe69-4230-89a5-068e4bc10438)

**Credentials:**
- Email: admin@gmail.com
- Password: Admin@1234

**Functionality:**
- Add users with role-wise permissions
- Perform CRUD operations

#### Auditor Role
![Auditor](https://github.com/subhg/Promact-Customer-Support-Platform/assets/113555022/ca505c95-5d91-4ba3-a5ca-d03f5b213d1f)

**Credentials:**
- Email: auditor@gmail.com
- Password: Auditor@1234

**Functionality:**
- Add clients
- Register projects
- View all projects
- Update audit history

#### Project Manager Role
![Pm](https://github.com/subhg/Promact-Customer-Support-Platform/assets/113555022/ecc9b286-3b6b-464e-82b4-c35a515527d1)

**Credentials:**
- Email: pm@gmail.com
- Password: Pm@123456

**Functionality:**
- Manage content for assigned projects

#### Client Role
![Client](https://github.com/subhg/Promact-Customer-Support-Platform/assets/113555022/f1161844-4b95-4d57-8e41-0496079e897f)

**Credentials:**
- Email: client2@gmail.com
- Password: Client2@1234
  
**Functionality:**
- View the Customer Success Platform for the project

## Technology Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB

## Server Setup

1. Move to the Backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Frontend Setup

1. Move to the Frontend directory:
   ```bash
   cd frontend/cs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```
##Auth0 callback url:
   http://localhost:3001
