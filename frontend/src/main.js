// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Dashboard from './pages/dashboard';
import CardReport from './pages/cardreport';
import RechargeUnit from './pages/rechargeunit';
import AtmReport from './pages/atmreport';
import PanelReport from './pages/panelreport';
import User from './pages/user';
import Device from './pages/device';
import AddUser from './pages/adduser';
import AddDevice from './pages/adddevice';
import EditDevice from './pages/editdevice';
import AddRechargeUnit from './pages/addrechargeunit';
import EditRechargeUnit from './pages/editrechargeunit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cardreport" element={<CardReport />} />
        <Route path="/rechargeunit" element={<RechargeUnit />} />
        <Route path="/atmreport" element={<AtmReport />} />
        <Route path="/panelreport" element={<PanelReport />} />
        <Route path="/user" element={<User />} />
        <Route path="/device" element={<Device />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/adddevice" element={<AddDevice />} />
        <Route path="/editdevice" element={<EditDevice />} />
        <Route path="/addrechargeunit" element={<AddRechargeUnit />} />
        <Route path="/editrechargeunit" element={<EditRechargeUnit />} />
      </Routes>
    </Router>
  );
}

export default App;
