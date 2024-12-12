import { useState } from "react";
import "../styles/CreatePost.css";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [createPost, setCreatePost] = useState({
    id: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreatePost((prevPost) => ({
      ...prevPost,
      [name]: value,
      updatedAt: new Date(),
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);

      setCreatePost((prevPost) => ({
        ...prevPost,
        image: url,
        updatedAt: new Date(),
      }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(createPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <div>
          <span>Add a Caption</span>
          <br />
          <textarea
            className="caption"
            type="text"
            name="description"
            value={createPost.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span>Add an Image</span>
          <br />
          <input
            type="file"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div>
          <span>Add a video</span>
          <br />
          <input
            type="file"
            name="videoUrl"
            onChange={handleFileChange}
            accept="video/*"
          />
        </div>
        <div>
          <span>Add an audio</span>
          <br />
          <input
            type="file"
            name="audioUrl"
            onChange={handleFileChange}
            accept="audio/*"
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
