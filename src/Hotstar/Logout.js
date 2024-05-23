import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
    const [message, setMessage] = useState('');

    const email = localStorage.getItem('email'); // Retrieve the email from local storage
    console.log(email, 'email'); // Good for debugging, make sure it shows the expected email

    const handleLogout = async () => {
        try {
            // Directly pass email from the retrieved local storage
            await axios.post('http://localhost:3000/api/users/logout', { email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Logged out successfully');
            localStorage.removeItem('token');
            localStorage.removeItem('email'); // It's a good practice to also remove the email from local storage
        } catch (error) {
            setMessage('Logout failed');
            console.error('Logout error:', error); // Log the error for better debugging
        }
    };

    return (
        <div>
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Logout;
