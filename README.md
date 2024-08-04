# Daily Tasks Backend

This is the backend for the Daily Tasks application, built using Node.js, Express, MongoDB, and TypeScript.


## Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MongoDB (version 4.x or later)


### Environment Variables

CORS_URL= http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/REPORT
PORT=8800



## Installation

1. Install the dependencies:
 npm install --dev -deps

Create a .env file in the root of your project and add your MongoDB connection string: MONGODB_URI=your-mongodb-connection-string

2. Running the Application
npm run dev

3. API Endpoints

A. Employees
-- Create Employee

URL: /api/employees
Method: POST
Request Body:

{
  "name": "John Doe"
}

-- Get Employee

URL: /api/employees
Method: get
Request Body:

{
  "name": "John Doe"
}


B. Tasks

-- Create Task

URL: /api/tasks
Method: POST
Request Body:
{
  "description": "Complete the project",
  "from": "2024-08-01T09:00:00.000Z",
  "to": "2024-08-01T17:00:00.000Z",
  "employee": "60c72b2f9b1d8e6d88f3e3d9"
}

-- Get single Task

URL: /api/tasks/60c72b2f9b1d8e6d88f3e3d9
Method: get
Request Body:
{

  "employee": "60c72b2f9b1d8e6d88f3e3d9"
}


-- Update Task

URL: /api/tasks/60c72b2f9b1d8e6d88f3e3d9
Method: put
Request Body:
{
  "description": "Complete the project",
  "from": "2024-08-01T09:00:00.000Z",
  "to": "2024-08-01T17:00:00.000Z",
  "employee": "60c72b2f9b1d8e6d88f3e3d9"
}

-- delete Task

URL: /api/tasks/60c72b2f9b1d8e6d88f3e3d9
Method: delete
Request Body:
{

  "employee": "60c72b2f9b1d8e6d88f3e3d9"
}
