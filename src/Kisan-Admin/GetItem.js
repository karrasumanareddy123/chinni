import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  
    
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/inventory', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        // Check if response data contains an 'items' property that is an array
        if (response.data && Array.isArray(response.data.items)) {
          setItems(response.data.items); // Extract and set the 'items' array
          setLoading(false);
        } else {
          console.error('Response data:', response.data);
          throw new Error('Data received is not in the expected format');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('An error occurred while fetching items. Please try again later.');
        setLoading(false);
      }
    };
    
    

    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.category}</strong>: {item.itemname} - {item.units} - ${item.costPerUnit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetItems;
