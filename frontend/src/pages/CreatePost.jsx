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
  const userId = parseInt(localStorage.getItem("userId"));
  
  const handleMediaChange = (event) => {
    setMediaUrl(event.target.files[0]); //geting the first files
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content || !mediaUrl) {
      alert("Please add a content description and upload media.");
      return;
    }
    console.log("Uploading content and file...");

    //the formData obj handle the file update
    const formData = new FormData();
    const post = {
      userId,
      content,
    };
    formData.append("post", JSON.stringify(post));
    formData.append("media", mediaUrl);

    try {
      //making API call to backend
      const response = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
           Authorization: `Bearer ${token}`
          },
        }
      );

      const data = response.data;
      console.log("Post created successfuly:", data);

      addPost(data.post);
      setContent("");
      setMediaUrl(null);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
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
              onChange={handleMediaChange}
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
