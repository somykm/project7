import Banner from "../components/Banner";
import styled from 'styled-components';
import colors from '../styles/colors'
import { useEffect, useState } from "react";
const StyledLink =styled.div`
padding:2px;
color:${colors.pimary};
font-size:14px;
background-color:${colors.secondary};
`

function Home() {
  const [posts, setCreatePost] =useState([]);
  useEffect(()=>{
    const storedPosts =JSON.parse(localStorage.getItem("posts")) || [];
    storedPosts(storedPosts);
  }, []);
  return (
    <StyledLink>
      <Banner />
      <div>
        {posts.map((post, index)=>(
          <div key={index} className="post">
            <p>{post.description}</p>
            {post.image && <img src={post.image} alt={post}/>}
            {post.videoUrl && (
              <video controls>
                <source src={post.videoUrl} type="video/mp4" />
              </video>
            )}
            {post.audioUrl && (
              <audio controls>
                <source src={post.audioUrl} type="audio/mpeg" />
              </audio>
            )}
            </div>
        ))}
      </div>
    </StyledLink> 
  );
}

export default Home;