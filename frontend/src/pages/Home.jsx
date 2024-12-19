import Banner from "../components/Banner";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import '../styles/home.css';
import Header from "../components/Header";
const StyledLink = styled.div`
  padding: 2px;
  font-size: 14px;
`;

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // TODO use axios to get all the post, use the use SetPosts to save them
    const posts = [
      {
        id: 10,
        content: null,
        mediaUrl: "http://localhost:3000/media/th.jpg1734559060436.jpg",
        userId: null,
        reads: [],
        updatedAt: "2024-12-18T21:57:40.449Z",
        createdAt: "2024-12-18T21:57:40.449Z",
      },
    ];
    setPosts(posts)
  }, []);
  return (
    <StyledLink>
      <Header />
      <Banner />
      <div>
        <h2>Posts</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Create on here!</p>
        ) : (
          posts.map((post, index) => (
            <Card
              key={index}
              content={post.content}
              mediaUrl={post.mediaUrl}
              date={post.createdAt}
              reads={post.reads}
            />
          ))
        )}
      </div>
    </StyledLink>
  );
}

export default Home;
