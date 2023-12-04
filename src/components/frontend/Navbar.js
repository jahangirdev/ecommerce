import axios from 'axios';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
export default function Navbar(){
    const navigate = useNavigate();
    const logoutSubmit = (e) => {
        e.preventDefault();
        e.persist();
        axios.post('/api/logout').then(res =>{
            if(res.data.status == 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_username');
                swal('Success', res.data.message, 'warning');
                navigate('/');
            }
        });
    }
    var authButtons = '';
    if(!localStorage.getItem('auth_token')){
        authButtons = (
            <>
                
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
        );
    }
    else{

    }


    return(
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
            <div className="container">
                <Link className="navbar-brand" to="#">ECOMMERCE</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Pricing</Link>
                        </li>
                        {!localStorage.getItem('auth_token') && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                    {localStorage.getItem('auth_token')? (
                        <div className="dropdown">
                            <Link className="btn btn-danger dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                My Account
                            </Link>

                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><button onClick={logoutSubmit} className="dropdown-item text-danger">Logout</button></li>
                            </ul>
                        </div>
                    ): (
                            <Link className="btn btn-danger" to="/register">Register</Link>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}