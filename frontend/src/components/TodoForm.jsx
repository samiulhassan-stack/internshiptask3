import { useState, useEffect } from 'react';

function TodoForm({ onSubmit, editingTodo, onCancelEdit, loading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title || '');
      setDescription(editingTodo.description || '');
      setCompleted(editingTodo.completed === 1);
    } else {
      resetForm();
    }
  }, [editingTodo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCompleted(false);
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Client-side validation
    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }

    if (title.trim().length < 3) {
      setFormError('Title must be at least 3 characters');
      return;
    }

    setIsSubmitting(true);

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      completed,
    };

    const result = await onSubmit(todoData);

    setIsSubmitting(false);

    if (result.success) {
      resetForm();
    } else {
      setFormError(result.error || 'Failed to save todo');
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="todo-form-container">
      <h2>{editingTodo ? '✏️ Edit Todo' : '➕ Add New Todo'}</h2>
      
      <form onSubmit={handleSubmit} className="todo-form">
        {formError && (
          <div className="form-error">
            {formError}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            disabled={isSubmitting || loading}
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description (optional)"
            disabled={isSubmitting || loading}
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={isSubmitting || loading}
            />
            <span>Mark as completed</span>
          </label>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || loading}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                {editingTodo ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              editingTodo ? 'Update Todo' : 'Create Todo'
            )}
          </button>

          {editingTodo && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting || loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
