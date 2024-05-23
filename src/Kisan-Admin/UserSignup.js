import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    userName: '',
    phoneNumber: '',
    password: '',
    email: '',
  });

  const [loginData, setLoginData] = useState({
    phoneNumber: '',
    password: '',
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:4000/signup', signupData);
      console.log(response.data); // Newly created user data
    } catch (error) {
      console.error('Signup failed:', error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', loginData);
      // const { token } = response.data;   
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      console.log(response.data); // Login successful message and user data
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
    }
  };
  
  return (
    <div>
      <h1>User Management</h1>
      <div>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Username"
          name="userName"
          value={signupData.userName}
          onChange={handleSignupChange}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={signupData.phoneNumber}
          onChange={handleSignupChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signupData.password}
          onChange={handleSignupChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signupData.email}
          onChange={handleSignupChange}
        />
        <button onClick={handleSignup}>Signup</button>
      </div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={loginData.phoneNumber}
          onChange={handleLoginChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    
      
    </div>
  );
};

export default Signup;