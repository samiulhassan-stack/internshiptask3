import { useState } from 'react';

function TodoItem({ todo, onDelete, onToggleComplete, onEdit, isDeleting }) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggleComplete(todo);
    setIsToggling(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed === 1}
          onChange={handleToggle}
          disabled={isToggling || isDeleting}
          id={`todo-${todo.id}`}
        />
        <label htmlFor={`todo-${todo.id}`} className="checkbox-label">
          {isToggling && <span className="spinner small"></span>}
        </label>
      </div>

      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">Created: {formatDate(todo.created_at)}</span>
          {todo.updated_at !== todo.created_at && (
            <span className="todo-date">Updated: {formatDate(todo.updated_at)}</span>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="btn-icon btn-edit"
          onClick={() => onEdit(todo)}
          disabled={isDeleting}
          title="Edit todo"
        >
          ✏️
        </button>
        <button
          className="btn-icon btn-delete"
          onClick={() => onDelete(todo.id)}
          disabled={isDeleting}
          title="Delete todo"
        >
          {isDeleting ? <span className="spinner small"></span> : '🗑️'}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
