import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {

    const listContainerStyle = {
        padding: '1.5rem',
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        color: '#000',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '1.5rem',
        fontSize: '1.8rem'
    };
    
    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };
    
    const thTdStyle = {
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '12px',
        textAlign: 'left',
    };
    
    const headerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    };
    
    const deleteButtonStyle = {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
    };
    
    const editButtonStyle = {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '8px'
    };

    if (expenses.length === 0) {
        return (
            <div style={listContainerStyle}>
                <p style={{ textAlign: 'center' }}>No expenses found. Add one to get started!</p>
            </div>
        );
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

