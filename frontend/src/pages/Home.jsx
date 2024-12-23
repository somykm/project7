import Banner from "../components/Banner";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import "../styles/home.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const StyledLink = styled.div`
  padding: 2px;
  font-size: 14px;
`;

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
      .get(`http://localhost:3000/api/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [setPosts]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const handlePostClick = (postId) => {
    navigate(`/profile`);
  };

  return (
    <StyledLink>
      <Header />
      <Banner />
      <PostsContainer>
        {posts.length === 0 ? (
          <p>No posts yet. Create on here!</p>
        ) : (
          posts.map((post) => (
            <Card
              key={post.id}
              content={post.content}
              mediaUrl={post.mediaUrl}
              date={post.createdAt}
              reads={post.reads}
              onDelete={() => handleDelete(post.id)}
              onClick={() => handlePostClick(post.Id)}
            />
          ))
        )}
      </PostsContainer>
    </StyledLink>
  );
}

export default Home;
