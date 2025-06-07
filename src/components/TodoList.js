import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onDelete, onUpdate, onToggleComplete }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
