# TaskBoard

Taskboard is a team task management web application that allows users to create teams, manage tasks, assign tasks to team members, and track task progress.

## Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

## Prerequisites

Before running the project, make sure the following are installed:

* Node.js
* npm
* Git
* MongoDB Atlas account

## 1. Clone the Repository

Clone the GitHub repository:

```bash
git clone https://github.com/Rxyz72/kanban-taskboard.git
```

Navigate into the project:

```bash
cd kanban-taskboard
```

## 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file inside the `backend` folder.

Add the required environment variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your own MongoDB Atlas connection string.

The `.env` file is not included in the GitHub repository for security reasons.

### Run the Backend

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5001
```

## 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Vite will provide a local URL, usually:

```text
http://localhost:5173
```

Open the URL in a web browser.

## 4. MongoDB Setup

The application uses MongoDB Atlas as the database.

To run the project, the user must:

1. Create a MongoDB Atlas account.
2. Create a MongoDB cluster.
3. Create a database user.
4. Allow the required IP address in Network Access.
5. Copy the MongoDB connection string.
6. Add the connection string to the `MONGO_URI` variable in the backend `.env` file.

Each person running the project can use their own MongoDB Atlas database.

## 5. Adding a New Member to a Team

To add a new member to a team, the **Team Leader must enter the new member's User ID**.

The new member can find their **User ID on the Settings page** of their account. The Team Leader should use this User ID when adding the member to the team.

## 6. Postman API Collection

A Postman collection containing the project's API endpoints is included in the GitHub repository.

Import the collection into Postman to test the backend API endpoints.

## 7. Running the Complete Application

Two terminals are required.

### Terminal 1 – Backend

```bash
cd backend
npm run dev
```

### Terminal 2 – Frontend

```bash
cd frontend
npm run dev
```

Then open the frontend URL provided by Vite in your browser.

## Important

The `.env` file is not uploaded to GitHub because it contains sensitive information such as the MongoDB connection string and JWT secret.

Each developer or user running the project should create their own `.env` file locally.

## Project Structure

```text
kanban-taskboard/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md
```
