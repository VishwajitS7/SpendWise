import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from 'axios';

// Destructure the new props: expenseToEdit and setExpenseToEdit
const ExpenseForm = ({ onNewExpense, token, expenseToEdit, setExpenseToEdit }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    // This effect will run whenever 'expenseToEdit' changes
    useEffect(() => {
        if (expenseToEdit) {
            setDescription(expenseToEdit.description);
            setAmount(expenseToEdit.amount);
            setCategory(expenseToEdit.category);
            setDate(new Date(expenseToEdit.date).toISOString().slice(0, 10));
        }
    }, [expenseToEdit]);

    const clearForm = () => {
        setDescription('');
        setAmount('');
        setCategory('Food');
        setDate(new Date().toISOString().slice(0, 10));
        setExpenseToEdit(null); // Clear the expense being edited
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseData = { description, amount, category, date };
        const headers = { headers: { 'x-auth-token': token } };

        if (expenseToEdit) {
            // If we are editing, send a PUT request
            axios.put(`http://localhost:5000/expenses/update/${expenseToEdit._id}`, expenseData, headers)
                .then(() => {
                    onNewExpense(); // Refresh the list
                    clearForm();
                })
                .catch(err => console.error(err));
        } else {
            // If we are adding a new one, send a POST request
            axios.post('http://localhost:5000/expenses/add', expenseData, headers)
                .then(() => {
                    onNewExpense(); // Refresh the list
                    clearForm();
                })
                .catch(err => console.error(err));
        }
    };
    
    // Styling
    const formStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };
    const inputStyle = { padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginRight: '1rem' };
    const buttonStyle = { padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' };

    return (
        // Change the button text and add a Cancel button based on the mode
        <form onSubmit={handleSubmit} style={formStyle}>
            {/* All input fields remain the same */}
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
            
            <button type="submit" style={buttonStyle}>
                {expenseToEdit ? 'Update Expense' : 'Add Expense'}
            </button>
            {expenseToEdit && (
                <button type="button" onClick={clearForm} style={{...buttonStyle, backgroundColor: '#6c757d'}}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default ExpenseForm;

