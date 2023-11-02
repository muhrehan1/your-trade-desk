import React, { useState, useEffect } from 'react';
import axios from 'axios';
function UserLists() {
    const [userData, setUserData] = useState([]);

    const sendDataToLaravel = () => {
        const requestData = {
            key: {
                'id': 'test',
                'name': 'Rehan' // Apna naam yahan shamil karein
            },
        };
        axios.post('http://127.0.0.1:8000/api/send-data',requestData, {
            headers: {
                'Content-Type': 'application/json',
                // Include CSRF token in request headers (if required by your Laravel backend)
                // 'X-CSRF-TOKEN': csrfToken,
            },
        })
            .then(response => {
                // Handle the successful response from Laravel
                console.log('Response from Laravel:', response.data);
            })
            .catch(error => {
                // Handle errors that occurred during the request
                console.error('Error:', error);
            });
    };
    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('http://127.0.0.1:8000/api/resource')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    // Define the function to send data to Laravel


    // Call sendDataToLaravel when userData changes (i.e., after data is fetched from /api/resource)
    useEffect(() => {

        sendDataToLaravel();
    }, [userData]); // Call this effect whenever userData changes

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {userData && userData.map((user) => (
                    <li key={user.id}>
                        Name: {user.name}
                        Email: {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserLists;
