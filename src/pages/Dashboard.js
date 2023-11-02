import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const isAuthenticated = () => {
        // Check if the user is authenticated (token exists in local storage)
        return localStorage.getItem('token') !== null;
    };

    useEffect(() => {
        // Inside the useEffect, perform the redirect based on authentication status
        if (!isAuthenticated()) {
            // Redirect to the login page if not authenticated
            navigate('/login');
        }
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    const handleLogout = () => {
        // Clear the token from local storage (or perform your logout API request here)
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div>
            {isAuthenticated() ? (
                <>
                    <h1>You are logged in!</h1>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : null}
        </div>
    );
}

export default Dashboard;
