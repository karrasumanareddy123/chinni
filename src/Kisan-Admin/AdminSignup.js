import React, { useState } from 'react';
import axios from 'axios';

const AdminAuth = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/admin/signup', { phone, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/admin/login', { phone, password });
      setMessage(response.data.message);
      console.log(response.data.token)
      localStorage.setItem("token",response.data.token)
      // You can save the token in local storage or state for further authenticated requests
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Admin Authentication</h2>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminAuth;
