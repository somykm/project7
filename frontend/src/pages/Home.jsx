import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import "../styles/home.css";
import Header from "../components/Header";
import Banner from "../components/Banner";
import styled from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage!");
      return;
    }

    axios
      .get("http://localhost:3000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleMarkAsRead = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/posts/${postId}/markAsRead`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, reads: [...(post.reads || []), "new read"] }
            : post
        )
      );
    } catch (error) {
      console.error("Error marking post as read:", error);
    }
  };

  const handleCardClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <Header />
      <Banner />
      <PostsContainer>
        {posts.length === 0 ? (
          <p>No posts yet. Create one here!</p>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              content={post.content}
              mediaUrl={post.mediaUrl}
              date={post.createdAt}
              reads={post.reads}
              onDelete={() => handleDelete(post.id)}
              onMarkAsRead={() => handleMarkAsRead(post.id)}
              onCardClick={handleCardClick}
            />
          ))
        )}
      </PostsContainer>
    </div>
  );
}

export default Home;
