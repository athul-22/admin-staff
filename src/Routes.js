import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Staff from './Staff';
import Login from './Login';

const RouteComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/staff" element={<Staff />} />
    </Routes>
  );
};

export default RouteComponent;