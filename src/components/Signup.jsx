/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        const {name, email, password} = credentials;
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        if (json.error) {
            // alert(json.error)
            console.log(json)
            props.showAlert("Invalid Details", "danger")
        }
        else if(json.errors){
            console.log(json)
            props.showAlert("Invalid Details", "danger")
            // json.errors.map((error) => alert(error))
        }
        else {
            localStorage.setItem('token', json.authToken);
            console.log(json)
            props.showAlert("Account created succesfully", "success")
            navigate("/");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit} method='post'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credentials.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credentials.cpassword} minLength={6} required/>
                    <p className='text-danger'>{credentials.password !== credentials.cpassword && 'Your passwords do not match' } </p> 
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup