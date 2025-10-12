import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userData, logout }) => {

    // --- STYLING ---
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(40, 40, 70, 0.8)', // Darker translucent
        backdropFilter: 'blur(10px)',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    };

    const titleStyle = {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#61dafb', // Vibrant teal
    };

    const authLinksStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '1.5rem',
        fontSize: '1rem',
    };

    const welcomeTextStyle = {
        color: '#eee',
        marginRight: '1rem',
        fontSize: '1rem'
    };

    const logoutButtonStyle = {
        ...linkStyle,
        background: '#e74c3c',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer'
    };


    return (
        <nav style={navStyle}>
            <Link to="/" style={titleStyle}>SpendWise</Link>
            <div>
                {userData.user ? (
                    <div style={authLinksStyle}>
                        <span style={welcomeTextStyle}>Welcome, {userData.user.username}</span>
                        <Link to="/profile" style={linkStyle}>Profile</Link>
                        <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
                        <Link to="/" style={linkStyle}>Expenses</Link>
                        <button onClick={logout} style={logoutButtonStyle}>Log Out</button>
                    </div>
                ) : (
                    <div style={authLinksStyle}>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

