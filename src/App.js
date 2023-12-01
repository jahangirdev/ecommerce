import React from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/admin/pages/Dashboard";
import Profile from "./components/admin/pages/Profile";
import Home from "./components/frontend/pages/Home";
import Login from "./components/frontend/pages/auth/Login";
import Register from "./components/frontend/pages/auth/Register";

import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post['Accept'] = 'application/josn';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/admin/dashboard" element={<Dashboard/>} />
        <Route exact path="/admin/profile" element={<Profile/>} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
