import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { useRouter } from 'next/router';
import styles from '../styles/login.module.css'
import Navbar from './components/Navbar';
export default function Login() {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleAccountExist = () => {
        router.push('/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/register', {
                method: 'POST', // Make sure to use POST method
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify({ email: login, password: password}),
            });
            
            if (response.ok) {
                // Registration successful
                router.push('/login');
            } else {
                // Registration failed
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };
    


    return (
        <>
        <Navbar/>
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
                    <button type="submit" className="btn btn-primary">Create Account</button>
                </form>

                <div className="container">
                    <div className="row justify-content-end">
                        <div><p onClick={handleAccountExist}>Already have an account?</p></div>
                        <div className='col-4 justify-content-right'></div>
                    </div>
                </div>
            </div>

        </>
    );
}
