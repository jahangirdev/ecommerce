import React, {useState} from "react";
import AuthLayout from "../../../../layouts/frontend/auth/AuthLayout";
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
export default function Login(){
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
        email: '',
        password: '',
        remember: false,
        error_list: []
    });
    const handleInput = (e) => {
        e.preventDefault();
        setLoginInput({...loginInput, [e.target.name]: e.target.value});
    }
    const handleCheckBox = (e) => {
        setLoginInput({...loginInput, [e.target.name]: !loginInput.remember});
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
            remember: loginInput.remember
        }
        axios.get('sanctum/csrf-cookie').then(function(){
            axios.post('/api/login', data).then( res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_username', res.data.username);
                    swal('Success', res.data.message, 'success');
                    navigate('/');
                }
                else if(res.data.status === 401){
                    swal('Login Failed', res.data.message, 'error');
                }
                else{
                    setLoginInput({...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }
    return(
        <AuthLayout>
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                <div className="card-body">
                    <form onSubmit={loginSubmit}>
                        <div className="form-floating mb-3">
                            <input onChange={handleInput} className="form-control" name="email" value={loginInput.email} id="inputEmail" type="email" placeholder="name@example.com" />
                            <label htmlFor="inputEmail">Email address</label>
                            <span className="text-danger">{loginInput.error_list.email}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleInput} className="form-control" name="password" value={loginInput.password} id="inputPassword" type="password" placeholder="Password" />
                            <label htmlFor="inputPassword">Password</label>
                            <span className="text-danger">{loginInput.error_list.password}</span>
                        </div>
                        <div className="form-check mb-3">
                            <input onChange={handleCheckBox} className="form-check-input" name="remember" checked={loginInput.remember} id="inputRememberPassword" type="checkbox"/>
                            <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            <Link className="small" to="/forgot-password">Forgot Password?</Link>
                            <button type="submit" className="btn btn-primary" to="">Login</button>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center py-3">
                    <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                </div>
            </div>
        </AuthLayout>
    );
}