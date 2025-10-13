import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Import Components
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [expenses, setExpenses] = useState([]);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    useEffect(() => {
        document.title = 'SpendWise';
        const checkLoggedIn = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }
            try {
                const tokenRes = await axios.post(`${apiUrl}/users/tokenIsValid`, null, { headers: { 'x-auth-token': token } });
                if (tokenRes.data) {
                    const userRes = await axios.get(`${apiUrl}/users/`, {
                        headers: { 'x-auth-token': token },
                    });
                    setUserData({
                        token,
                        user: userRes.data,
                    });
                }
            } catch (err) {
                console.error("Login check failed", err);
            }
        };
        checkLoggedIn();
    }, []);

    useEffect(() => {
        if (userData.user) {
            fetchExpenses();
        } else {
            setExpenses([]);
        }
    }, [userData]);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get(`${apiUrl}/expenses/`, {
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
            await axios.delete(`${apiUrl}/expenses/${id}`, {
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

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem('auth-token', '');
    };
    
    const appStyle = {
        minHeight: '100vh',
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };

    const containerStyle = {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
    };


    return (
        <BrowserRouter>
            <div style={appStyle}>
                <Navbar userData={userData} logout={logout} />
                <div style={containerStyle}>
                    <Routes>
                        {userData.user ? (
                            <>
                                <Route path="/" element={
                                    <div>
                                        <ExpenseForm onNewExpense={handleNewExpense} token={userData.token} expenseToEdit={expenseToEdit} />
                                        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
                                    </div>
                                } />
                                <Route path="/dashboard" element={<Dashboard token={userData.token} />} />
                                <Route path="/profile" element={<Profile userData={userData} />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/login" element={<Login setUserData={setUserData} />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="*" element={<Navigate to="/login" />} />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

