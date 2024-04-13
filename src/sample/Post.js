import React, { useState } from 'react';
import axios from 'axios';
import Design from './Design';

const PostStudent = () => {
  const [formData, setFormData] = useState({ name: '', age: '', grade: '' });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null); // Clear error message on input change
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem('authToken');
      console.log(token,'tokennn')
      if (!token) {
        throw new Error('Unauthorized: You must be logged in to create students');
      }

      const response = await axios.post('http://localhost:5000/students', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
  
      console.log('Student created:', response.data);
      setFormData({ name: '', age: '', grade: '' }); // Clear form after success
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message); // Display user-friendly error message
    }
  }
  
  

  return (
    <div>
      <Design />
      <h2>Post Student</h2>
      <form onSubmit={handleSubmit}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            name="grade"
            id="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostStudent;
