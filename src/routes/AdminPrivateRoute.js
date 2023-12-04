import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

export default function AdminPrivateRoute({children}){
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        axios.get('api/checkingAuthenticated').then(res => {
            if(res.status == 200){
                setAuthenticated(true);
                setLoading(false);
            }
            else{
                setAuthenticated(false);
                setLoading(false);
            }
        }).catch( err => {
            swal(err.response.status+'', err.message, 'warning');
            navigate("/");
        });

    }, []);

    if(loading){
        return <h1>Loading...</h1>;
    }
    else if(authenticated)
        return children;
    else{
        return(
            <Navigate to="/"/>
        );
    }
}