import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // Import App component (assuming it exists)
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App /> 
    </Router>
  </React.StrictMode>
);



reportWebVitals();
