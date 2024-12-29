import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import "../styles/app.css";
import Home from "./Home";
import SignUp from "../auth/signup/SignUp";
import NoMatch from "./NoMatch";
import Login from "../auth/login/Login";
import CreatePost from "./CreatePost";
import Profile from "../components/Profile";
import PostDetails from "./PostDetails";

function App() {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const logoutHandler = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
        <Route path="/create-post" element={<CreatePost addPost={addPost} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
