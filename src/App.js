// import React from 'react'
// import Login from './GLR/Login'
// import Logout from './GLR/Logout'
// import CareerList from './GLR/StudentGet'

// const App = () => {
//   return (
//     <div>
//       <Login />
//       <Logout />
//       <CareerList />
//     </div>
//   )
// }

// export default App


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShirtList = () => {
    const [shirts, setShirts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShirts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/shirt');
                setShirts(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShirts();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Shirt List</h1>
            <ul>
                {shirts.map((shirt) => (
                    <li key={shirt._id}>
                        <h2>{shirt.name}</h2>
                        <img src={`data:image/png;base64,${shirt.image}`} alt={shirt.name} style={{width: '200px',height:'250PX'}}/>
                        <p>Price: ${shirt.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShirtList;

