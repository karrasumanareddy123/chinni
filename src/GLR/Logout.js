import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        const email = localStorage.getItem('email');  // Ensure email is retrieved correctly
        if (!email) {
            setMessage('No email found, please log in.');
            return;
        }

        try {
            await axios.post('http://localhost:4000/user-auth/logout', { email }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            setMessage('Logged out successfully');
        } catch (error) {
            const errMsg = error.response && error.response.data ? error.response.data : 'Logout failed';
            setMessage(errMsg);
            console.error('Logout error:', error);  // Log the actual error
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
