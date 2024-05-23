import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        mobile: '',
        dateOfBirth: '',
        qualification: '',
        branch: '',
        passedOutYear: '',
        privacyPolicy: false
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/signup', formData);
            alert('Signup successful');
            console.log(response.data); // Log server response, helpful for debugging
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed');
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" required />
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" required />
                <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" required />
                <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required />
                <input type="text" name="passedOutYear" value={formData.passedOutYear} onChange={handleChange} placeholder="Passed Out Year" required />
                 <label>
                    <input type="checkbox" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange} />
                    Accept Privacy Policy
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;
