import React, {useState} from "react";
import AuthLayout from "../../../../layouts/frontend/auth/AuthLayout";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import swal from "sweetalert";
export default function Register(){
    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        error_list: []
    });
    const handleInput = (e) => {
        e.preventDefault();
        e.persist();
        setRegisterInput({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        e.persist();
        const data = {
            first_name: registerInput.first_name,
            last_name: registerInput.last_name,
            email: registerInput.email,
            password: registerInput.password,
            confirm_password: registerInput.confirm_password
        };
        axios.get('/sanctum/csrf-cookie').then(function(){
            axios.post('/api/register', data).then( response => {
                if(response.data.status === 200){
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_name', response.data.username);
                    swal('Success', response.data.message, 'success');
                    navigate("/");
                }
                else{
                    setRegisterInput({...registerInput, error_list: response.data.validation_errors});
                }
            });
        });
    }
    return(
        <AuthLayout>
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                <div className="card-body">
                    <form onSubmit={registerSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleInput} name="first_name" value={registerInput.first_name} className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                    <label htmlFor="inputFirstName">First name</label>
                                    <span className="text-danger">{registerInput.error_list.first_name}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input onChange={handleInput} name="last_name" value={registerInput.last_name} className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                    <label htmlFor="inputLastName">Last name</label>
                                    <span className="text-danger">{registerInput.error_list.last_name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleInput} name="email" value={registerInput.email} className="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                            <label htmlFor="inputEmail">Email address</label>
                            <span className="text-danger">{registerInput.error_list.email}</span>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleInput} name="password" value={registerInput.password} className="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                    <label htmlFor="inputPassword">Password</label>
                                    <span className="text-danger">{registerInput.error_list.password}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input onChange={handleInput} name="confirm_password" value={registerInput.confirm_password} className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                    <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                    <span className="text-danger">{registerInput.error_list.confirm_password}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 mb-0">
                            <div className="d-grid"><input onClick={registerSubmit} type="submit" className="btn btn-primary btn-block" value="Create Account"/></div>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-center py-3">
                    <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                </div>
            </div>
        </AuthLayout>
    );
}