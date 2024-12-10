import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import SignUp from './SignUp';
import Banner from '../components/Banner';
import NoMatch from './NoMatch';
import Posting from '../components/Posting';
import Login from './Login';
import CreatePost from './CreatePost';

const PrivateRoutes = ()=>{
  const auth = JSON.parse(localStorage.getItem('auth')|| '{"token": false}');
  return auth.token ? <Outlet />:<Navigate to="/Login" />;
};

function App() {
  return (
    
    <Router>
      <div style={{ margin: 20 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/login" style={{ padding: 5, display:'flex',flexDirection:"row" }}>
          Logout
        </Link>
        <Link to="/sign-up" style={{ padding: 5,  }}>
          Signup
        </Link>
      </div>
      <div style={{ margin: 20 }}>
        <Link to="/post" style={{ padding: 5 }}>
          Add a Post
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/post" element={<Posting />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
