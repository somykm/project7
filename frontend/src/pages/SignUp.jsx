import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUp.css";
import Banner from "../components/Banner";
import styled from "styled-components";

const SigninWrapper = styled.div`
  display: flex;
  flex-direction: colum;
`;

function SignUp() {
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    firstNamename: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const[firstName, setFirstName]= useState();
  const[lastName, setLastName]= useState();

  // const[signupSuccess, setSignupSuccess] = useState(false);

  // const handleChange = (e) => {
  //   setSignData({ signData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://hocalhost:3000/api/auth/signup", {email, password, firstName, lastName})
      .then((response) => {
        console.log(response);
        alert("User signed up successfully!");
        //  setSignupSuccess(true);
         navigate('/login');
      })
      .catch((error) => {
        console.error("Error happend in signing up:", error);
      });
  };

//   useEffect(() => { 
//     if (signupSuccess) { 
//       navigate('/');
//     }
//   }, [signupSuccess, navigate]
// );

  // if(!user) {
  //   return (
  //     <Navigate to="/login" replace/>
  //   );
  // }
  return (
    <div>
      <Banner />

      <SigninWrapper className="signUp">
        <h2 className="signin">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <span>First Name:</span>
            <br />
            <input
              className="inputPart"
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <span>Last Name:</span>
            <br />
            <input
              className="inputPart"
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </SigninWrapper>
    </div>
  );
}

export default SignUp;
