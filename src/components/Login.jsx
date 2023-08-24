import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const {showAlert} = props;
    const host = import.meta.env.VITE_SERVER_URL

    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const json = await response.json();
        if(json.error){
            // alert(json.error)
            showAlert("Invalid Credentials", "danger")
        }
        else{
            localStorage.setItem('token', json.authToken);
            showAlert("Logged in successfully", "success")
            navigate("/");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit} method='post'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login