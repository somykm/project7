import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import SignUp from './pages/SignUp';
import Login from './pages/Login';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <SignUp />
    <Login />
  </React.StrictMode>
);

