import { useState } from "react";
import '../styles/YourPost.css';

function YourPost() {
  const [createPost, updateCreatePost] = useState({
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCreatePost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  function handleFileChange (e) {
    updateCreatePost((prevPost) => ({
      ...prevPost,
      image: e.target.files[0],
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", createPost.description);
    formData.append("image", createPost.image);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      alert(result.message || "Post created successfully!");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
    return (
      <div >
        <h3 className="post-section">Add a Post</h3>
        <form onSubmit={handleAdd}>
          <div>
            <span>Add a Caption</span>
            <br />
            <input
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
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit">Add Post</button>
        </form>
      </div>
    );
  }

export default YourPost;
