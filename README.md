# Daily Tasks Backend

This is the backend for the Daily Tasks application, built using Node.js, Express, MongoDB, and TypeScript.

## Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MongoDB (version 4.x or later)

## Environment Variables

Create a `.env` file in the root of your project with the following variables:

CORS_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/REPORT
PORT=8800


## Installation

1. Install the dependencies:

    ```bash
    npm install
    ```

2. Create a `.env` file in the root of your project and add your MongoDB connection string. Example:

    ```
    MONGODB_URI=your-mongodb-connection-string
    ```

3. Start the application:

    ```bash
    npm run dev
    ```

## API Endpoints

### Employees

- **Create Employee**

  - **URL:** `/api/employees`
  - **Method:** POST
  - **Request Body:**

    ```json
    {
      "name": "John Doe"
    }
    ```

- **Get Employee**

  - **URL:** `/api/employees`
  - **Method:** GET
  - **Request Body:**

    ```json
    {
      "name": "John Doe"
    }
    ```

### Tasks

- **Create Task**

  - **URL:** `/api/tasks`
  - **Method:** POST
  - **Request Body:**

    ```json
    {
      "description": "Complete the project",
      "from": "2024-08-01T09:00:00.000Z",
      "to": "2024-08-01T17:00:00.000Z",
      "employee": "60c72b2f9b1d8e6d88f3e3d9"
    }
    ```

- **Get Single Task**

  - **URL:** `/api/tasks/:id`
  - **Method:** GET
  - **Request Params:**
    
    ```json
    {
      "employee": "60c72b2f9b1d8e6d88f3e3d9"
    }
    ```

- **Update Task**

  - **URL:** `/api/tasks/:id`
  - **Method:** PUT
  - **Request Body:**

    ```json
    {
      "description": "Complete the project",
      "from": "2024-08-01T09:00:00.000Z",
      "to": "2024-08-01T17:00:00.000Z",
      "employee": "60c72b2f9b1d8e6d88f3e3d9"
    }
    ```

- **Delete Task**

  - **URL:** `/api/tasks/:id`
  - **Method:** DELETE
  - **Request Body:**

    ```json
    {
      "employee": "60c72b2f9b1d8e6d88f3e3d9"
    }
    ```

Make sure to replace `:id` with the actual task ID for GET, PUT, and DELETE requests.

