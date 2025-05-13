import React from 'react';
import ReactDOM from 'react-dom/client'; // Import mis à jour pour React 18
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Nouvelle méthode
root.render(
  <Router>
    <App />
  </Router>
);
