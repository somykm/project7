import Banner from "../components/Banner";
import styled from 'styled-components';
import colors from '../styles/colors'
import { useEffect, useState } from "react";
import Cart from "../components/Cart";
const StyledLink =styled.div`
padding:2px;
color:${colors.pimary};
font-size:14px;
background-color:${colors.secondary};
`

function Home() {
  const [posts, setPosts] =useState([]);
  useEffect(()=>{
    const storedPosts =JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);
  return (
    <StyledLink>
      <Banner />
      <div>
        <h2>Posts</h2>
        {posts.lenght ===0 ? (
          <p>No posts yet. Create on here!</p>
        ) :(
          posts.map((post, index)=>(
            <Cart
            key={index}
            content={post.content}
            mediaUrl={post.mediaUrl}
            date={post.createdAt}
            />
          ))
        )}
      </div>
    </StyledLink> 
  );
}

export default Home