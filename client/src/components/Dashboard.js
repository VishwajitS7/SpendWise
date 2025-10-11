import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = ({ token }) => {
    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get('http://localhost:5000/expenses/summary', {
                    headers: { 'x-auth-token': token }
                });
                setSummaryData(res.data);
            } catch (err) {
                console.error('Error fetching summary data:', err);
            }
        };

        if (token) {
            fetchSummary();
        }
    }, [token]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6361'];

    const dashboardContainerStyle = {
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        margin: '2rem auto',
        maxWidth: '800px'
    };
    
    const titleStyle = {
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333'
    };

    return (
        <div style={dashboardContainerStyle}>
            <h2 style={titleStyle}>Spending by Category</h2>
            {summaryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={summaryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {summaryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            ) : (
                <p style={{ textAlign: 'center' }}>No expense data available to display a chart.</p>
            )}
        </div>
    );
};

export default Dashboard;

