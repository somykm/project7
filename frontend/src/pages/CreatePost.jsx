import { useState } from "react";
import "../styles/createPost.css";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";

function CreatePost({ addPost }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState(null);

  const handleMediaChange = (event) => {
    setMediaUrl(event.target.files[0]); //geting the first files
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content || !mediaUrl) {
      alert("Please add a content description and uplosd media.");
      return;
    }
    //the formData obj handle the file update
    const formData = new FormData();
    formData.append('content', content);
    formData.append('mediaUrl', mediaUrl);

    try {
      //making API call to backend
      const result = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await result.json();
      console.log("Post created successfully:", data);

      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.push(data.post);
      localStorage.setItem("posts", JSON.stringify(posts));
      addPost(data.post);
      setContent("");
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
          {/* <label className="postInput">Add a Caption:</label>
          <br /> */}
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
          {/* <label className="postInput">Upload Media:</label>
          <br /> */}
          <input
          
            type="file"
            name="mediaUrl"
            onChange={handleMediaChange}
            accept="image/*,video/*,audio/*,.gif"
          />
        </div>
        <button className="post" type="submit">Post</button>
      </form>
    </div>
    </div>
  );
}

export default CreatePost;
