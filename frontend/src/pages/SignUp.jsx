import { useState } from "react";
// import { Navigate } from 'react-router-dom';
import "../styles/SignUp.css";
import Banner from "../components/Banner";

function SignUp() {
  const [signData, setSignData] = useState({
    firstNamename: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setSignData({ signData, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    alert("User signed up successfully!");
  }

  // if(!user) {
  //   return (
  //     <Navigate to="/login" replace/>
  //   );
  // }
  return (
    <div>
      <Banner />

      <div className="signUp">
        <h2 className="signin">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <span>First Name:</span>
            <br />
            <input
              className="inputPart"
              type="text"
              name="name"
              value={signData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <span>Last Name:</span>
            <br />
            <input
              className="inputPart"
              type="text"
              name="name"
              value={signData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <span>Email:</span>
            <br />
            <input
              className="inputPart"
              type="email"
              name="email"
              value={signData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <span className="signinPass">Password:</span>
            <br />
            <input
              className="inputPart"
              type="password"
              name="password"
              value={signData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
