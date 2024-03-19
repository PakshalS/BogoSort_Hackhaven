import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YourComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Make an HTTP GET request to your Flask API endpoint
        axios.get('http://localhost:5025/')
            .then(response => {
                setMessage(response.data.message);
                // Display the message in an alert
                alert(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return null; // Returning null since we're using an alert instead of rendering HTML
};

export default YourComponent;
