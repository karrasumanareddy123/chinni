import axios from 'axios';
import React, { useState } from 'react';

const CreateItem = () => {
  const [data, setData] = useState({
    category: 'offerZone',
    itemname: 'Mangoes',
    units: '28',
    costPerUnit: '12',
    discount: '8',
    description: 'antha assam',
  });
  const [itemImage, setItemImage] = useState(null);

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('category', data.category);
      formData.append('itemname', data.itemname);
      formData.append('units', data.units);
      formData.append('costPerUnit', data.costPerUnit);
      formData.append('discount', data.discount);
      formData.append('description', data.description);
      formData.append('itemImage', itemImage);

      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/addItem', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  return (
    <div>
      <input type='file' name='itemImage' onChange={(e) => setItemImage(e.target.files[0])} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default CreateItem;
 