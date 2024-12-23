import { Link } from "react-router-dom";
import '../styles/header.css';
function Header({onLogout}) {
  return (
    <div className="headerContainer">
      <div className="linkContainer">
        <Link to="/" className="linkButtons">
          Home
        </Link>
        <Link to="/login" onClick={onLogout} className="linkButtons">
          Logout
        </Link>
        <Link to="/create-post" className="linkButtons">
          Add a Post
        </Link>
        <Link to="/sign-up" className="linkButtons">
          SignUp
        </Link>
      </div>
    </div>
  );
}
export default Header;