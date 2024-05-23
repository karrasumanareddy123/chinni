import React, { useState } from 'react';
import axios from 'axios';

const CreateCartItemForm = () => {
  const [formData, setFormData] = useState({
    category: 'offerZone',
    itemname: 'chandra',
    units: '10',
    costPerUnit: '3452',
    discount: '32',
    description: 'nothing',
    userId: '6620d5d68abbe1051e991fa5',
    payment: 'true',
    price: '23456',
    count: '2',
    orderStatus: 'false',
    itemImage: null, // File object for image upload
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, itemImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      // Assuming you have a function to retrieve the authentication token
      const token = localStorage.getItem('token'); // Implement this function according to your authentication mechanism
  
      await axios.post('http://localhost:4000/cart', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the authentication token in the request headers
        },
      });
      // Reset form after successful submission
      setFormData({
        category: 'offerZone',
        itemname: 'chandra',
        units: '123',
        costPerUnit: '234',
        discount: '54',
        description: 'noting',
        userId: '6620d5d68abbe1051e991fa5',
        payment: 'true',
        price: '123456',
        count: '33',
        orderStatus: 'yaa',
        itemImage: null,
      });
      alert('Cart item created successfully!');
    } catch (error) {
      console.error('Error creating cart item:', error);
      alert('Failed to create cart item.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label> 
        Category:
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </label>
      <label>
        Item Name:
        <input type="text" name="itemname" value={formData.itemname} onChange={handleChange} required />
      </label>
      <label>
        Units:
        <input type="text" name="units" value={formData.units} onChange={handleChange} required />
      </label>
      {/* Add other fields similarly */}
      <label>
        Item Image:
        <input type="file" accept="image/*" name="itemImage" onChange={handleFileChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCartItemForm;
