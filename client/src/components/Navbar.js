import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ userData, setUserData }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem('auth-token', '');
        navigate('/login');
    };

    // Styling
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(22, 22, 29, 0.9)', // Darker translucent background
        backdropFilter: 'blur(10px)',
        color: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    };
    const titleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#00d1b2' // Vibrant Teal color for the logo
    };
    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
    };
    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '1.5rem',
        fontWeight: '500'
    };
    const welcomeTextStyle = {
        marginLeft: '1.5rem',
        fontStyle: 'italic',
        color: '#ccc'
    };
    const logoutButtonStyle = {
        marginLeft: '1.5rem',
        padding: '0.5rem 1rem',
        border: '1px solid #00d1b2',
        borderRadius: '5px',
        background: 'transparent',
        color: '#00d1b2',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={titleStyle}>SpendWise</Link>
            <div style={navLinksStyle}>
                {userData.user ? (
                    <>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <Link to="/" style={linkStyle}>Expenses</Link>
                        <span style={welcomeTextStyle}>Welcome, {userData.user.username}</span>
                        <button onClick={handleLogout} style={logoutButtonStyle}>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

