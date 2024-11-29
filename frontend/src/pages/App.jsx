import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import SignUp from './SignUp';
import Banner from '../components/Banner';
import NoMatch from './NoMatch';
import Menu from '../components/Menu';
import Login from './Login';

function App() {
  return (
    <Router>
      <nav style={{ margin: 20 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/sign-up" style={{ padding: 5 }}>
          Logout
        </Link>
      </nav>
      <cart style={{ margin: 20 }}>
        <Link to="/menu" style={{ padding: 5 }}>
          Menu
        </Link>
      </cart>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
