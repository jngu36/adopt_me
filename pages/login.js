import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert'
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'
import Navbar from './components/Navbar';

export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push("/");
        }
    }, []);

    const handleRegister = () => {
        router.push('/register')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST', // Make sure to use POST method
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: login, password: password }),
            });

            const data = response.json();
            if (response.ok) {
                // Login successful
                localStorage.setItem('token', data.token);
                router.reload();
            } else {
                // Login failed
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container body_full" style={{ width: "500px" }}>
                <form onSubmit={handleSubmit} className="border" style={{ padding: "50px" }}>
                    <div className="mb-3">
                        <label htmlFor="email_input" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email_input" aria-describedby="emailHelp" value={login} onChange={(e) => setLogin(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password_input" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password_input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <div className="container">
                    <div className="row justify-content-end">
                        <div className={styles.registerLink}><p onClick={handleRegister}>Create Account</p></div>
                    </div>
                </div>
            </div>
        </>
    );
}
