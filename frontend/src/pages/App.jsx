import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/app.css";

import Home from "./Home";
import SignUp from "../auth/signup/SignUp";
import Banner from "../components/Banner";
import NoMatch from "./NoMatch";
import Login from "../auth/login/Login";
import CreatePost from "./CreatePost";
import Profile from "../components/Profile";
import { useEffect, useState } from "react";


function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // const logoutHandler = () => { localStorage.clear(); window.location.href = "/login"; // Redirect to login page
  // };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts}/>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/create-post" element={<CreatePost addPost={addPost} />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
