import { useState } from "react";
import '../styles/SignUp.css'

function SignUp() {
  const [signData, setSignData] = useState(
    {
      name: "",
      email: "",
      password: "",
    }
  );

  const handleChange = (e)=>{
    setSignData({signData, [e.target.name]:e.target.value});
  };
  function handleSubmit (e){
    e.preventDefault()
    alert("User signed up successfully!");
  }

  return(
    <div class='signUp'> 
    <div>
    </div>
      <h2 className='signin'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type= "text" name= "name" value= {signData.name} onChange={handleChange} required />
        </div>
        <div>
          <lable>Email:</lable>
          <input type="email" name= "email" value={signData} onChange={handleChange} required />
        </div>
        <div>
        <label>Password:</label>
        <input type="password" name= "password" value={signData.password} onChange={handleChange} required />
        </div>
        <button type ="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;