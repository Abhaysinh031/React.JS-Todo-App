import React, { useState } from 'react';

function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <div style={{ display: 'flex', marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new task"
        style={{ flexGrow: 1 }}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;
