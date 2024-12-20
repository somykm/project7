import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/signUp.css";
import Banner from "../../components/Banner";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
      })
      .then((response) => {
        console.log(response);
        alert("User signed up successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error happend in signing up:", error);
      });
  };

  return (
    <div>
      <Banner />
      <div className="signinContainer">
      <div>
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
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitButton">Sign Up</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default SignUp;
