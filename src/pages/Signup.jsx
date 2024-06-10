import React, { useState, useEffect } from "react";
import { signup } from "../script/apis";
import styles from "../css/login.module.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            navigate('/');
        }
    }, [navigate]);

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


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
        const formData = new FormData(event.target);
        const formDataObject = Object.fromEntries(formData.entries());
        try {
            const response = await signup(formDataObject);
            setMessage(response.message);
        } catch (error) {
            setMessage(error.error || 'An error occurred during signup.');
            console.error(error);
        }
    }

    return <div className={styles.main}>
        <div className={styles.container}>
            <h2>Welcome Admin!</h2>
            <p>Sign up to create your account</p>
            {message && <div className={styles.message}><p className={styles.success}>{message}</p></div>}
            {error && <div className={styles.message}><p className={styles.error}>{error}</p></div>}            
            <form className={styles.box} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <i className="uil uil-user"></i>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        required
                    />
                </div>
                <div className={styles.input}>
                    <i className="uil uil-envelope"></i>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
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
                        required
                    />
                </div>
                <button type="submit" className={styles.input}>Signup</button>
                <p>Have a account? <Link to="/login">login</Link></p>
            </form>
        </div>
    </div>
}