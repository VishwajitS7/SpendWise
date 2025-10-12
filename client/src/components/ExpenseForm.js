import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseForm = ({ onNewExpense, token, expenseToEdit }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [isEditing, setIsEditing] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        if (expenseToEdit) {
            setDescription(expenseToEdit.description);
            setAmount(expenseToEdit.amount);
            setCategory(expenseToEdit.category);
            setDate(new Date(expenseToEdit.date).toISOString().slice(0, 10));
            setIsEditing(true);
        } else {
            resetForm();
        }
    }, [expenseToEdit]);

    const resetForm = () => {
        setDescription('');
        setAmount('');
        setCategory('Food');
        setDate(new Date().toISOString().slice(0, 10));
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount || !date) {
            alert("Please fill all fields");
            return;
        }

        const expenseData = { description, amount, category, date };
        
        try {
            if (isEditing) {
                await axios.put(`${apiUrl}/expenses/update/${expenseToEdit._id}`, expenseData, {
                    headers: { 'x-auth-token': token },
                });
            } else {
                await axios.post(`${apiUrl}/expenses/add`, expenseData, {
                    headers: { 'x-auth-token': token },
                });
            }
            onNewExpense();
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const formStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        marginBottom: '2rem',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    };
    
    const inputStyle = {
        padding: '0.8rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        background: 'rgba(255, 255, 255, 0.8)',
        fontSize: '1rem',
        color: '#000',
        marginRight: '1rem'
    };

    const buttonStyle = {
        padding: '0.8rem 1.5rem',
        borderRadius: '8px',
        border: 'none',
        background: isEditing ? '#f39c12' : '#2ecc71',
        color: 'white',
        fontSize: '1rem',
        cursor: 'pointer'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} required />
            <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} style={inputStyle} required />
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
            </select>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} required />
            <button type="submit" style={buttonStyle}>{isEditing ? 'Update Expense' : 'Add Expense'}</button>
        </form>
    );
};

export default ExpenseForm;

