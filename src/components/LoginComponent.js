import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user-login', {
                email: email,
                password: password,
            });

            if (response.data.token) {
                // Store the token in local storage
                localStorage.setItem('token', response.data.token);
                // Redirect to the dashboard page
                window.location.href = '/dashboard'; // Change this to the URL of your dashboard page
            } else {
                // Handle error or show success message
                console.log(response.data.message);
            }
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };


    return (
        <Container>
            <>
                <Row className="row align-items-center d-flex pt-5 mt-5">
                    <Col lg={8} sm={12} className="form_col pt-5 mt-5">
                        <input type="email" name={'email'} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                    <Col lg={8} sm={12} className="form_col">
                        <input type="password" name={'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Col>
                    <Col lg={8} sm={12} className="form_col">
                        <button onClick={handleLogin}>Login</button>
                    </Col>
                </Row>
            </>
        </Container>
    );
};

export default LoginComponent;
