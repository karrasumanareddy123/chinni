import React, { useState } from 'react';
import axios from 'axios';
import Design from './Design';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const token = response.data.token;
      // Store the token in local storage or context for future requests
      localStorage.setItem('authToken', token);
      // Redirect to another page or update the state to indicate successful login
      console.log('Login successful:', token);
    } catch (err) {
      if (err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Error logging in');
      }
    }
  };

  return (
    <div>
      <Design />
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
