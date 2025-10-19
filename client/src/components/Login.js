import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
    
    // --- STYLING ---
    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5rem',
    };

    const formContainerStyle = {
        background: 'rgba(200, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#000',
        fontSize: '2rem'
    };
    
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
    };

    const labelStyle = {
        marginBottom: '0.5rem',
        color: '#000',
    };

    const inputStyle = {
        padding: '0.8rem',
        marginBottom: '1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        background: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem',
        color: '#000'
    };

    const buttonStyle = {
        padding: '0.8rem',
        borderRadius: '8px',
        border: 'none',
        background: '#3498db',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer',
    };

    const linkStyle = {
        textAlign: 'center',
        marginTop: '1rem',
        color: '#000'
    };
    
    const errorStyle = {
        color: 'red',
        textAlign: 'center',
        marginBottom: '1rem'
    };

    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Login</h2>
                {error && <p style={errorStyle}>{error}</p>}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <label style={labelStyle}>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <label style={labelStyle}>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" style={buttonStyle}>Login</button>
                </form>
                <p style={linkStyle}>
                    Don't have an account? <Link to="/register" style={{color: '#3498db'}}>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

