import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main'; // ✅ Make sure './main' is correct
import './index.css'; // ✅ Optional, or remove if not used

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
