import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const API_BASE_URL = 'http://localhost:3001/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch all todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from API
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new todo
  const createTodo = async (todoData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }
      
      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error creating todo:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update an existing todo
  const updateTodo = async (id, todoData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update todo');
      }
      
      const updatedTodo = await response.json();
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      setEditingTodo(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error updating todo:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete todo');
      }
      
      setTodos(todos.filter(todo => todo.id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error deleting todo:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, {
      ...todo,
      completed: !todo.completed
    });
  };

  // Handle edit
  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  // Handle form submit
  const handleSubmit = async (todoData) => {
    if (editingTodo) {
      return await updateTodo(editingTodo.id, todoData);
    } else {
      return await createTodo(todoData);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo List</h1>
          <p>Full-Stack CRUD Application</p>
        </header>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TodoForm
          onSubmit={handleSubmit}
          editingTodo={editingTodo}
          onCancelEdit={handleCancelEdit}
          loading={loading}
        />

        <TodoList
          todos={todos}
          loading={loading}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default App;
