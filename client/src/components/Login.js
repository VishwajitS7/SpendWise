import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// --- DEFINE apiUrl OUTSIDE THE COMPONENT ---
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Login = ({ setUserData }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const loginUser = { username, password };
            const loginRes = await axios.post(`${apiUrl}/users/login`, loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem('auth-token', loginRes.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response ? err.response.data.msg : "Login failed. Please try again.");
        }
    };
    
    // ... (rest of your styling and component code remains the same)
    // ...
};

export default Login;

