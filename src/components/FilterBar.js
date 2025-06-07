import React from 'react';

function FilterBar({ filter, setFilter }) {
  return (
    <div className="filter-buttons" style={{ marginBottom: '20px' }}>
      <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
      <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>Pending</button>
    </div>
  );
}

export default FilterBar;
