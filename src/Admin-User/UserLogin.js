import React, { useState } from 'react';
import axios from 'axios';

const UserInterface = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isLogin: false
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUserAction = async () => {
        try {
            const { name, email, password, isLogin } = formData;
            if (isLogin) {
                // User login
                const response = await axios.post('http://localhost:4000/user/login', { email, password });
                console.log(response.data.message);
                // Store token in local storage if login is successful
                localStorage.setItem('token', response.data.token);
                // Redirect or display success message
                if(response.status === 200) {
                    alert("Login successful!");
                }
            } else {
                // User signup
                const response = await axios.post('http://localhost:4000/user/signup', { name, email, password });
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
            <h1>{formData.isLogin ? 'User Login' : 'User Signup'}</h1>
            {!formData.isLogin && <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            <button onClick={handleUserAction}>{formData.isLogin ? 'Login' : 'Sign Up'}</button>
            <button onClick={() => setFormData({ ...formData, isLogin: !formData.isLogin })}>
                {formData.isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default UserInterface;
