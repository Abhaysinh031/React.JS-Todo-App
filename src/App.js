import React, { useEffect, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import './App.css';
import { auth } from './firebase';
import Auth from './components/Auth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
  if (user) {
    const storedTodos = JSON.parse(localStorage.getItem(`todos_${user.uid}`)) || [];
    setTodos(storedTodos);
  }
}, [user]);

useEffect(() => {
  if (user) {
    localStorage.setItem(`todos_${user.uid}`, JSON.stringify(todos));
  }
}, [todos, user]);


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([newTodo, ...todos]);
  };
  
 const deleteTodo = (id) => {
  const updated = todos.filter(todo => todo.id !== id);
  setTodos(updated);
  
};

const updateTodo = (id, text) => {
  const updated = todos.map(todo => todo.id === id ? { ...todo, text } : todo);
  setTodos(updated);
  
};

const toggleComplete = (id) => {
  const updated = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
  setTodos(updated);
  
};


  const filteredTodos = todos.filter(todo =>
    filter === 'completed' ? todo.completed :
    filter === 'pending' ? !todo.completed : true
  );

  if (!user) return <Auth />;

  return (
    <div className="app-container">
      <div className="header">
        <h1>Todo Dashboard</h1>
        <div className="header-buttons">
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}> {theme === 'light' ? 'Dark theme' : 'Light theme'}</button>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      </div>
      <TodoInput onAdd={addTodo} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;