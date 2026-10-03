import { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, loading, onDelete, onToggleComplete, onEdit }) {
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-list-container">
      <div className="list-header">
        <h2>📋 Your Todos</h2>
        <div className="todo-stats">
          <span className="stat">Total: {todos.length}</span>
          <span className="stat">Active: {activeCount}</span>
          <span className="stat">Completed: {completedCount}</span>
        </div>
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({activeCount})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      {loading && todos.length === 0 ? (
        <div className="loading-container">
          <div className="spinner large"></div>
          <p>Loading todos...</p>
        </div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-message">
            {todos.length === 0 
              ? 'No todos yet. Create your first todo above!' 
              : `No ${filter} todos.`}
          </p>
        </div>
      ) : (
        <div className="todo-list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              isDeleting={deletingId === todo.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
