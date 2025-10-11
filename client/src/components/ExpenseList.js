import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {

    const listContainerStyle = {
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        margin: '2rem 0'
    };
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    const thTdStyle = {
        borderBottom: '1px solid #ddd',
        padding: '12px',
        textAlign: 'left',
        color: '#333'
    };
    const headerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        fontWeight: 'bold'
    };
    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#333'
    };
    const deleteButtonStyle = {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    const editButtonStyle = {
        backgroundColor: '#ffc107',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '8px'
    };

    if (expenses.length === 0) {
        return <p style={{ textAlign: 'center', marginTop: '2rem', color: '#555' }}>No expenses found. Add one to get started!</p>;
    }

    return (
        <div style={listContainerStyle}>
            <h2 style={titleStyle}>Your Expenses</h2>
            <table style={tableStyle}>
                <thead style={headerStyle}>
                    <tr>
                        <th style={thTdStyle}>Date</th>
                        <th style={thTdStyle}>Description</th>
                        <th style={thTdStyle}>Category</th>
                        <th style={thTdStyle}>Amount</th>
                        <th style={thTdStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense._id}>
                            <td style={thTdStyle}>{new Date(expense.date).toLocaleDateString()}</td>
                            <td style={thTdStyle}>{expense.description}</td>
                            <td style={thTdStyle}>{expense.category}</td>
                            <td style={thTdStyle}>₹{expense.amount.toFixed(2)}</td>
                            <td style={thTdStyle}>
                                <button onClick={() => onEdit(expense)} style={editButtonStyle}>Edit</button>
                                <button onClick={() => onDelete(expense._id)} style={deleteButtonStyle}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;

