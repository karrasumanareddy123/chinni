import React, { useState } from 'react';
import axios from 'axios';
import Design from './Design';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signUp', { email, password });
      // Handle response, maybe log the user in or redirect to login page
      console.log('Signup successful:', response.data.message);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error signing up');
    }
  };

  return (
    <div>
      <Design />
      <form onSubmit={handleSignup}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
