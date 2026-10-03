# Setup Instructions

Follow these steps to get your full-stack CRUD application running:

## Prerequisites

- Node.js (v14 or higher) installed
- npm or yarn package manager
- Git (for version control)

## Quick Start

### 1. Install Backend Dependencies

Open a terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

### 2. Start the Backend Server

While still in the backend folder:

```bash
npm start
```

You should see:
```
✅ Backend server running on http://localhost:3001
📝 API endpoints available at http://localhost:3001/api/todos
```

**Keep this terminal running!**

### 3. Install Frontend Dependencies

Open a **NEW terminal** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

### 4. Start the Frontend Development Server

While in the frontend folder:

```bash
npm run dev
```

You should see:
```
VITE v4.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### 5. Open the Application

Open your browser and go to: **http://localhost:5173/**

You should see the Todo List application!

## Testing the Application

Try these operations to test all CRUD functionality:

### Create (C)
1. Enter a title like "Learn React"
2. Add description "Complete React tutorial"
3. Click "Create Todo"
4. ✅ You should see the todo appear in the list

### Read (R)
1. ✅ All todos are displayed automatically
2. ✅ Use filter buttons to view All/Active/Completed todos

### Update (U)
1. Click the ✏️ edit button on any todo
2. Modify the title or description
3. Click "Update Todo"
4. ✅ Changes should appear immediately

### Delete (D)
1. Click the 🗑️ delete button on any todo
2. ✅ The todo should disappear from the list

## Features to Notice

### Loading States
- Watch for spinners when creating/updating/deleting todos
- The UI shows "Loading todos..." when fetching data

### Error Handling
- Try stopping the backend server (Ctrl+C)
- Try to create a todo - you'll see an error message
- Try to create a todo with an empty title - validation error

### State Management
- The application uses React hooks (useState, useEffect)
- All state changes are reflected immediately
- Data persists in the SQLite database

## Project Structure

```
task3/
├── backend/
│   ├── server.js         # Express API server
│   ├── package.json      # Backend dependencies
│   └── database.db       # SQLite database (created automatically)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.jsx    # Create/Edit form
│   │   │   ├── TodoItem.jsx    # Individual todo item
│   │   │   └── TodoList.jsx    # List with filters
│   │   ├── App.jsx             # Main component
│   │   ├── App.css             # Styles
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── index.html
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
│
├── .gitignore
├── README.md
└── SETUP.md (this file)
```

## API Endpoints

All endpoints are available at `http://localhost:3001/api/todos`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

## Pushing to GitHub

### Option 1: Monorepo (Recommended)

```bash
cd task3
git init
git add .
git commit -m "Initial commit: Full-stack CRUD app"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Option 2: Separate Repos

**Backend:**
```bash
cd backend
git init
git add .
git commit -m "Initial commit: Backend API"
git remote add origin YOUR_BACKEND_REPO_URL
git push -u origin main
```

**Frontend:**
```bash
cd frontend
git init
git add .
git commit -m "Initial commit: Frontend UI"
git remote add origin YOUR_FRONTEND_REPO_URL
git push -u origin main
```

## Troubleshooting

### Port Already in Use
If port 3001 or 5173 is already in use:
- Backend: Change `PORT` in `backend/server.js`
- Frontend: Change `server.port` in `frontend/vite.config.js`

### CORS Errors
- Make sure backend is running on port 3001
- Check that CORS is enabled in `backend/server.js`

### Database Errors
- Delete `backend/database.db` and restart the server
- The database will be recreated automatically

### Module Not Found
- Run `npm install` in both backend and frontend folders
- Delete `node_modules` and `package-lock.json`, then reinstall

## Next Steps

Once you have the basic app running, try:

1. Add more fields (due date, priority, tags)
2. Implement search/filter functionality
3. Add user authentication
4. Deploy to a cloud platform
5. Add pagination for large lists
6. Implement real-time updates with WebSockets

## Support

If you encounter issues:
1. Check that both servers are running
2. Look at the browser console for errors
3. Check the backend terminal for server errors
4. Ensure all dependencies are installed
