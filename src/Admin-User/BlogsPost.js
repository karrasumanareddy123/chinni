import React, { useState } from 'react';
import axios from 'axios';

const AddBlogComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleBlogCreation = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('User not authenticated');
        return;
      }

      const { name, description, price, image } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('description', description);
      formDataToSend.append('price', price);
      formDataToSend.append('image', image);

      const response = await axios.post('http://localhost:4000/post-blog', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data.message);
      // Clear form fields after successful submission
      setFormData({
        name: '',
        description: '',
        price: '',
        image: null
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setErrorMessage('User does not have permission to create blog');
      } else {
        setErrorMessage('Failed to create blog. Please try again later.');
      }
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Add New Blog</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange}></textarea>
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
      <input type="file" name="image" onChange={handleImageChange} />
      <button onClick={handleBlogCreation}>Create Blog</button>
    </div>
  );
};

export default AddBlogComponent;
