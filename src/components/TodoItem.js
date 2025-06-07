import React, { useState, useEffect, useRef } from 'react';

function TodoItem({ todo, onDelete, onUpdate, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // Auto-focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText.length === 0) {
      // Optionally: don't allow empty text, revert to old text
      setEditText(todo.text);
    } else if (trimmedText !== todo.text) {
      onUpdate(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        background: '#f7f7f7',
        padding: '10px',
        borderRadius: '6px',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        style={{ transform: 'scale(1.2)', marginRight: '10px' }}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={handleEditChange}
          onBlur={handleEditSave}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            fontSize: '18px',
            padding: '4px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      ) : (
        <span
          onDoubleClick={handleEditStart}
          style={{
            flex: 1,
            fontSize: '18px',
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'gray' : 'black',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          title="Double click to edit"
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        style={{
          backgroundColor: '#ff4d4d',
          border: 'none',
          color: 'white',
          padding: '6px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          marginLeft: '10px',
        }}
        title="Delete task"
      >
        ✖
      </button>
    </div>
  );
}

export default TodoItem;
