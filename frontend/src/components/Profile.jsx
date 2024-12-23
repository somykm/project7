import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("userId"));

    if (!token || !userId) {
      console.error("No token or userId found in localStorage!");
      return;
    }

    axios
      .get(`http://localhost:3000/api/posts?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, []);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    const userId = parseInt(localStorage.getItem("userId"));

    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/sign-up");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="profileContainer">
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Create one!</p>
      ) : (
        posts.map((post) => (
          <Card
            key={post.id}
            content={post.content}
            mediaUrl={post.mediaUrl}
            date={post.createdAt}
            reads={post.reads}
          />
        ))
      )}
      <button className="delete-account" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default Profile;
