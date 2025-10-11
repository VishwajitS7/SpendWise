import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { username, password, passwordCheck };
            await axios.post('http://localhost:5000/users/register', newUser);
            navigate('/login');
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    // Styling (same as Login for consistency)
    const pageStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '5rem' };
     const formContainerStyle = { 
        background: 'rgba(255, 255, 255, 0.8)', // Slightly less transparent for better contrast
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        padding: '2.5rem', 
        borderRadius: '15px', 
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        width: '100%', 
        maxWidth: '400px' 
    };
    const titleStyle = { textAlign: 'center', marginBottom: '1.5rem', color: '#000', textShadow: 'none' }; 
    const inputGroupStyle = { marginBottom: '1rem' };
    const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#000' }; 
    const inputStyle = { 
        width: '100%', 
        padding: '0.75rem', 
        border: '1px solid rgba(0, 0, 0, 0.2)', // Darker border for inputs
        borderRadius: '8px', 
        boxSizing: 'border-box',
        background: 'rgba(255, 255, 255, 0.9)', // Slightly opaque white background for inputs
        color: '#000', 
        outline: 'none'
    };
    const buttonStyle = { width: '100%', padding: '0.75rem', border: 'none', borderRadius: '8px', background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)', color: 'white', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' };
    const errorStyle = { color: '#ff0000', background: 'rgba(217, 48, 55, 0.1)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' };
    const linkStyle = { display: 'block', textAlign: 'center', marginTop: '1rem', color: '#000' }; 


    return (
        <div style={pageStyle}>
            <div style={formContainerStyle}>
                <h2 style={titleStyle}>Create Account</h2>
                {error && <p style={errorStyle}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label htmlFor="username" style={labelStyle}>Username</label>
                        <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label htmlFor="password" style={labelStyle}>Password</label>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label htmlFor="passwordCheck" style={labelStyle}>Confirm Password</label>
                        <input id="passwordCheck" type="password" onChange={(e) => setPasswordCheck(e.target.value)} style={inputStyle} />
                    </div>
                    <button type="submit" style={buttonStyle}>Register</button>
                </form>
                <Link to="/login" style={linkStyle}>Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default Register;

