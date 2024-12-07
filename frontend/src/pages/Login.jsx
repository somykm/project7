import'../styles/Lohin.css';
import axios from "axios";

import { useState } from "react";
import Banner from '../components/Banner';

function Login() {
  const [email, setEmail]= useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e =>{
    e.preventDefault();
  
    axios
    .post('http://localhost:3000/api/auth/login', {email, password})
    .then(response =>{
      console.log(response)
    }).catch(error =>{
      console.error('Error logging in:', error);
    });
  };

  return (
    <div>
      <Banner />
    
    <form action='' id="login" method='post' onSubmit={handleSubmit}>
      <div className='login_div'>
      <div>
      <h1 className='login'>Login</h1>
        <label for="email">Email</label><br/>
        <input className="inputPart"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label for="password">Password</label><br/>
        <input className="inputPart"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
      </div>
      <p className='item'>
        <input type="submit" value="Login" />
        </p>
      </div>
    </form>
    </div>
  );
}

export default Login;
