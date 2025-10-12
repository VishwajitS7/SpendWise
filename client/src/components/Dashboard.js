import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ token }) => {
    const [summary, setSummary] = useState([]);
    const [error, setError] = useState('');
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get(`${apiUrl}/expenses/summary`, {
                    headers: { 'x-auth-token': token },
                });
                setSummary(res.data);
            } catch (err) {
                setError('Could not fetch summary data.');
            }
        };
        fetchSummary();
    }, [token, apiUrl]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

    const chartData = summary.map(item => ({
        name: item._id,
        value: item.total,
    }));
    
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '2.5rem',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '100%',
        maxWidth: '800px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        color: '#000'
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#000',
        fontSize: '2rem'
    };
    
    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h2 style={titleStyle}>Spending Summary</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {summary.length > 0 ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p style={{ textAlign: 'center' }}>No expense data available to display chart.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

