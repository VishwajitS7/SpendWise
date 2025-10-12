import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userData }) => {
    const [profileData, setProfileData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem('auth-token');
            if (token && userData) {
                try {
                    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
                    const res = await axios.get(`${apiUrl}/users/`, {
                        headers: { 'x-auth-token': token },
                    });
                    setProfileData(res.data);
                } catch (err) {
                    setError('Could not fetch profile data.');
                }
            }
        };
        fetchProfileData();
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const token = localStorage.getItem('auth-token');
            const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
            const res = await axios.post(`${apiUrl}/users/change-password`,
                { currentPassword, newPassword },
                { headers: { 'x-auth-token': token } }
            );
            setMessage(res.data.msg);
            // Clear fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.response ? err.response.data.msg : "An error occurred.");
        }
    };

    // --- STYLING (Consistent with the rest of the app) ---
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        color: '#000',
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#000',
        fontSize: '2rem'
    };

    const infoStyle = {
        marginBottom: '2rem',
        color: '#000',
        fontSize: '1.1rem'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
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
        marginTop: '1rem'
    };
    
    const messageStyle = {
        textAlign: 'center',
        marginTop: '1rem'
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>User Profile</h2>
                {profileData ? (
                    <div style={infoStyle}>
                        <p><strong>Username:</strong> {profileData.username}</p>
                        <p><strong>Member Since:</strong> {new Date(profileData.createdAt).toLocaleDateString()}</p>
                    </div>
                ) : <p style={{textAlign: 'center'}}>Loading profile...</p>}

                <h3 style={{ ...titleStyle, fontSize: '1.5rem' }}>Change Password</h3>
                <form onSubmit={handleSubmit} style={formStyle}>
                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <button type="submit" style={buttonStyle}>Update Password</button>
                </form>
                {message && <p style={{ ...messageStyle, color: 'green' }}>{message}</p>}
                {error && <p style={{ ...messageStyle, color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Profile;
