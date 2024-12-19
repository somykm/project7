import { Link } from "react-router-dom";
import logo from '../assets/images/icon.png';
import '../styles/header.css';
function Header() {
  return (
    <div className="headerContainer">
      
      <div className="linkContainer">
        <Link to="/" className="linkButtons">
          Home
        </Link>
        <Link to="/login" className="linkButtons">
          Logout
        </Link>
        <Link to="/create-post" className="linkButtons">
          Add a Post
        </Link>
      </div>
      <div className="siteLogo">
      <img src={logo} alt="Groupomania web logo" />
      </div>
    </div>
  );
}
export default Header;
