import React, { useState } from 'react';
import axios from 'axios';

const Logout = () => {
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        try {
            await axios.post('https://mobile-be-6l2x.onrender.com/api/users/logout', {
                email: 'venu@gmail.com'  // Ensure to pass the correct email or manage via global state/context
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setMessage('Logged out successfully');
            localStorage.removeItem('token');
        } catch (error) {
            setMessage('Logout failed');
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
