import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/admin/pages/Dashboard";
import Profile from "./components/admin/pages/Profile";
import Home from "./components/frontend/pages/Home";
import Login from "./components/frontend/pages/auth/Login";
import Register from "./components/frontend/pages/auth/Register";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Accept'] = 'application/josn';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <Router>
      <Routes>
        {/* Frontend routes */}
        <Route exact path="/" element={<Home/>} />
        {/* End of frontend routes */}


        {/* Auth rotues */}
        <Route exact path="/login" element={!localStorage.getItem('auth_token') ? <Login/> : <Navigate to="/"/>} />
        <Route exact path="/register" element={!localStorage.getItem('auth_token') ? <Register/> : <Navigate to="/"/>} />
        {/* End of auth routes */}


        {/* Admin routes */}
        <Route exact path="/admin/dashboard" element={<AdminPrivateRoute><Dashboard/></AdminPrivateRoute>} />
        <Route exact path="/admin/profile" element={<Profile/>} />
        <Route path="/admin" element={<AdminPrivateRoute><Navigate to="/admin/dashboard" /></AdminPrivateRoute>} />
        {/* End of admin routes */}

        {/* User routes */}
        {/* End of user routes */}

        {/* Error page routes */}
        <Route path="*" element={<><h1>404</h1><p>Page not found</p></>} />
        {/* End of error page routes */}
      </Routes>
    </Router>
  );
}

export default App;
