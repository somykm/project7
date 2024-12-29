import { useState } from "react";
import "../styles/createPost.css";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import axios from "axios";

function CreatePost({ addPost }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content || !mediaUrl) {
      alert("Please add a content description and upload media.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", localStorage.getItem("userId")); // Append userId directly
    formData.append("content", content);
    formData.append("media", mediaUrl);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      console.log("Post created successfully:", data);

      setContent("");
      setMediaUrl(null);
      addPost(data.post);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error.response.data);
    }
  };

  return (
    <div>
      <Banner />
      <div className="createPostContainer">
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              className="captions"
              type="text"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
              required
            />
          </div>
          <div>
            <input
              type="file"
              name="mediaUrl"
              onChange={(event) => setMediaUrl(event.target.files[0])}
              accept="image/*,video/*,audio/*,.gif"
            />
          </div>
          <button className="post" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
