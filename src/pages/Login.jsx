import React, { useState, useEffect } from 'react';
import styles from "../css/login.module.css";
import { login } from "../script/apis";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    function togglePassword() {
        const icon = document.getElementById('icon');
        const password = document.getElementById('password');
        if (icon && password) {
            icon.classList.toggle('uil-eye');
            icon.classList.toggle('uil-eye-slash');
            password.type = password.type === 'password' ? 'text' : 'password';
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await login(email, password);
            console.log('Login successful:', response);
            navigate('/');
        } catch (error) {
            setMessage(error.error || 'An error occurred during login.');
            console.error(error);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h2>Welcome Back Admin!</h2>
                <p>Log in to access your account</p>
                {message && <div id="message" className={styles.message}><p>{message}</p></div>}
                <form className={styles.box} onSubmit={handleSubmit}>
                    <div className={styles.input}>
                        <i className="uil uil-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={`${styles.input} ${styles.password}`}>
                        <i className="uil uil-lock" id="icon" onClick={togglePassword}></i>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.input}>Login</button>
                    <Link to="/forget-password">Forget Password</Link>
                    <p>Not a member? <a href="#signup">Join Us</a></p>
                </form>
            </div>
        </div>
    );
}
