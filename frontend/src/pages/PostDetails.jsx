import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/postDetails.css";
import Banner from "../components/Banner";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Add state for editing
  const [formData, setFormData] = useState({ content: "", mediaUrl: "" }); // Form data state
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
        setFormData({ content: response.data.content, mediaUrl: response.data.mediaUrl });

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

  const handleEdit = () => {
    setIsEditing(true); // Trigger edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdatePost = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/posts/${id}`,
        formData, // Send updated post data
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost({ ...post, ...formData }); // Update post state with new data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

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
        {isEditing ? (
          <div className="editForm">
            <textarea className="content-part"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
            <input className="media-link-part"
              type="text"
              name="mediaUrl"
              value={formData.mediaUrl}
              onChange={handleInputChange}
            />
            <button className="postDetailsButton" onClick={handleUpdatePost}>Save</button>
          </div>
        ) : (
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
            <button className="postDetailsButton" onClick={handleEdit}>Edit</button> {/* Edit Button */}
          </div>
        )}
        <button className="postDetailsButton" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default PostDetails;
