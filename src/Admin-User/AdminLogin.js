import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        isLogin: true // Set the default mode to login
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdminAction = async () => {
        try {
            const { phone, password, isLogin } = formData;
            if (isLogin) {
                // Admin login
                const response = await axios.post('http://localhost:4000/admin/login', { phone, password });
                console.log(response.data.message);
                // Store token in local storage
                localStorage.setItem("token", response.data.token);
                // Redirect or display success message
            } else {
                // Admin signup
                const response = await axios.post('http://localhost:4000/admin/signup', formData);
                console.log(response.data.message);
                // Redirect or display success message
            }
        } catch (error) {
            console.error(error.response.data.message);
            // Display error message to the user
        }
    };

    return (
        <div>
            <h1>{formData.isLogin ? 'Admin Login' : 'Admin Signup'}</h1>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            <button onClick={handleAdminAction}>{formData.isLogin ? 'Login' : 'Sign Up'}</button>
            <button onClick={() => setFormData({ ...formData, isLogin: !formData.isLogin })}>
                {formData.isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default AdminPanel;
