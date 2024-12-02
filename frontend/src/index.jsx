import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import YourPost from './pages/YourPost';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>
);

