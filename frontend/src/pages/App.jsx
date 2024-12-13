import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Link, Outlet, Navigate } from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import SignUp from '../auth/signup/SignUp';
import Banner from '../components/Banner';
import NoMatch from './NoMatch';
import Posting from '../components/Posting';
import Login from '../auth/login/Login';
import CreatePost from './CreatePost';
import { useEffect, useState } from 'react';

const PrivateRoutes = ()=>{
  const auth = JSON.parse(localStorage.getItem('auth')|| '{"token": false}');
  return auth.token ? <Outlet />:<Navigate to="/Login" />;
};

function App() {
  const[posts, setPosts] =useState([]);

  const addPost =(newPost)=>{
    setPosts([newPost, ...posts])
  };

  useEffect(()=>{
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || []; setPosts(storedPosts);
  }, []);

  useEffect(() => { 
    localStorage.setItem("posts", JSON.stringify(posts)); 
  }, [posts]);

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
        <Link to="/create-post" style={{ padding: 5 }}>
          Add a Post
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/post" element={<PrivateRoutes><Posting /></PrivateRoutes>} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/create-post" element={<CreatePost addPost={addPost}/>} />
      </Routes>
    </Router>
  );
}

export default App;