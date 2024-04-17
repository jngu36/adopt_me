import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Alert from '@mui/material/Alert'

export default function Login() {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState("");
    const [showAlert, setAlert] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        
    };

    return (
        <>
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
                        <div className='col'>Forgot password?</div>
                        <div className='col-4 justify-content-right'>Create Account</div>
                    </div>
                    <div><p><br />^ these should be links</p></div>
                </div>

                <Alert severity="success" className={showAlert ? 'alert-shown' : 'alert-hidden'}>
                    It works, you bozo
                </Alert>
            </div>
        </>
    );
}
