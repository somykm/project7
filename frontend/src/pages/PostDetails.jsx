import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/postDetails.css";
import Banner from "../components/Banner";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPost(response.data);

        await axios.put(
          `http://localhost:3000/api/posts/${id}/markAsRead`,
          null,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details or marking as read:", error);
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Banner />
      <div className="postDetailContainer">
        <h2>Post Details</h2>
        <div className="postContent">
          <p>{post.content}</p>
          {post.mediaUrl &&
            (post.mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
              <img src={post.mediaUrl} alt="Post media" />
            ) : post.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video controls>
                <source src={post.mediaUrl} type="video/mp4" />
                <source src={post.mediaUrl} type="video/webm" />
                <source src={post.mediaUrl} type="video/ogg" />
              </video>
            ) : post.mediaUrl.match(/\.(mp3|wav|ogg)$/i) ? (
              <audio controls>
                <source src={post.mediaUrl} type="audio/mp3" />
                <source src={post.mediaUrl} type="audio/wav" />
                <source src={post.mediaUrl} type="audio/ogg" />
              </audio>
            ) : null)}
        </div>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default PostDetails;
