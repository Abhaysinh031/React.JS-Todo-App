import React, { useState } from 'react';
import { auth, googleProvider  } from '../firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import '../styles/Auth.css'

function Auth({onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');

  const handleEmailAuth  = async () => {
    try {
      setError('');
      let userCred;
      if (isSignup) {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      }onLogin(userCred.user);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleEmailAuth}>
        {isSignup ? 'Create Account' : 'Login'}
      </button>

      <button onClick={handleGoogleLogin} style={{ marginTop: '10px' }}>
        Sign in with Google
      </button>

      <p>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}

export default Auth;
