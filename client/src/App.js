import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard'; // Import Dashboard

const App = () => {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [expenses, setExpenses] = useState([]);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }
            try {
                const tokenRes = await axios.post('http://localhost:5000/users/tokenIsValid', null, { headers: { 'x-auth-token': token } });
                if (tokenRes.data) {
                    const userRes = await axios.get('http://localhost:5000/users/', {
                        headers: { 'x-auth-token': token },
                    });
                    setUserData({
                        token,
                        user: userRes.data,
                    });
                }
            } catch (err) {
                console.log("User not logged in or token invalid");
            }
        };
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (userData.token) {
            fetchExpenses();
        } else {
            setExpenses([]);
        }
    }, [userData.token]);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('http://localhost:5000/expenses/', {
                headers: { 'x-auth-token': userData.token },
            });
            setExpenses(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleNewExpense = () => {
        fetchExpenses();
        setExpenseToEdit(null);
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/expenses/${id}`, {
                headers: { 'x-auth-token': userData.token },
            });
            fetchExpenses();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditExpense = (expense) => {
        setExpenseToEdit(expense);
    };
    
    // Styling
    const appStyle = {
        minHeight: '100vh',
        // New background image URL
        backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/double-bubble-outline.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };
    const containerStyle = {
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 1rem',
    };

    return (
        <Router>
            <div style={appStyle}>
                <Navbar userData={userData} setUserData={setUserData} />
                <div style={containerStyle}>
                    <Routes>
                        <Route path="/login" element={<Login setUserData={setUserData} />} />
                        <Route path="/register" element={<Register />} />

                        <Route 
                            path="/dashboard" 
                            element={
                                userData.token ? 
                                <Dashboard token={userData.token} /> : 
                                <Navigate to="/login" />
                            } 
                        />

                        <Route 
                            path="/" 
                            element={
                                userData.token ? (
                                    <>
                                        <ExpenseForm 
                                            onNewExpense={handleNewExpense} 
                                            token={userData.token} 
                                            expenseToEdit={expenseToEdit} 
                                            setExpenseToEdit={setExpenseToEdit}
                                        />
                                        <ExpenseList 
                                            expenses={expenses} 
                                            onDelete={handleDeleteExpense} 
                                            onEdit={handleEditExpense} 
                                        />
                                    </>
                                ) : (
                                    <Navigate to="/login" />
                                )
                            } 
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;

