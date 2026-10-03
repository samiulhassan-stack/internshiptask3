# Full-Stack CRUD Application

A complete full-stack Todo List application demonstrating CRUD operations with frontend and backend integration.

## Project Structure

```
task3/
├── backend/          # Express.js API server
│   ├── server.js     # Main server file
│   ├── package.json
│   └── database.db   # SQLite database (auto-generated)
├── frontend/         # React + Vite application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ RESTful API backend with Express
- ✅ React frontend with proper state management
- ✅ Loading states for all operations
- ✅ Error handling with user feedback
- ✅ SQLite database (no external DB setup needed)
- ✅ CORS enabled for local development

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
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

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a specific todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Request/Response Examples

**Create Todo:**
```json
POST /api/todos
{
  "title": "Learn React",
  "description": "Complete the React tutorial",
  "completed": false
}
```

**Update Todo:**
```json
PUT /api/todos/1
{
  "title": "Learn React",
  "description": "Complete the React tutorial",
  "completed": true
}
```

## Technologies Used

### Backend
- Node.js
- Express.js
- SQLite3
- CORS

### Frontend
- React 18
- Vite
- CSS3

## Features Demonstrated

1. **State Management**: Uses React hooks (useState, useEffect) for managing application state
2. **Error Handling**: Comprehensive error handling with user-friendly messages
3. **Loading States**: Visual feedback during async operations
4. **Optimistic Updates**: Optional optimistic UI updates with rollback on error
5. **Form Validation**: Basic client-side validation before API calls
6. **Responsive Design**: Clean, mobile-friendly UI

## Development Notes

- The backend uses SQLite for simplicity - no external database required
- CORS is configured to allow requests from the frontend dev server
- Error messages are displayed in the UI for better user experience
- Loading states prevent duplicate requests during operations
