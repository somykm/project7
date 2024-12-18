import { useState } from "react";
import "../styles/CreatePost.css";
import { useNavigate } from "react-router-dom";
import { connect } from "http2";

function CreatePost({addPost}) {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState(null);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setCreatePost((prevPost) => ({
  //     ...prevPost,
  //     [name]: value,
  //     updatedAt: new Date(),
  //   }));
  // };

  // const handleFileChange = (e) => {
  //   const {files } = e.target;
  //   if (files && files.length > 0) {
  //     const file = files[0];
  //     const url = URL.createObjectURL(file);

  //     setCreatePost((prevPost) => ({
  //       ...prevPost,
  //       mediaUrl: url,
  //       updatedAt: new Date(),
  //     }));
  //   }
  // };

  // const handleAdd = async (e) => {
  //   e.preventDefault();
  //   const posts = JSON.parse(localStorage.getItem("posts")) || [];
  //   posts.push(createPost);
  //   localStorage.setItem("posts", JSON.stringify(posts));
  //   addPost(createPost);
  //   navigate("/");
  // };

  const handleMediaChange = (event) =>{
setMediaUrl(event.target.files[0]);//geting the first files
  };

  const handleSubmit =(event) =>{
    event.preventDeffault();

    if(!content || !mediaUrl){
      alert('Please add a content description and uplosd media.');
      return;
    }
    //the formData obj handle the file update
    const formData = new FormData();
    formData.append('content', connect);
    formData.append('mediaUrl', mediaUrl);

    //making API call to backend
    fetch('/api/posts',{
      method:'POST',
      body:formData,
    })
    .then((Response)=> Response.json())
    .then((data)=> {
      console.log('Post created successfully:',data);
      setContent('');
      navigate('/');
    })
    .catch((error)=>{
      console.error('Error creating post:', error);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Add a Caption</span>
          <br />
          <textarea
            className="caption"
            type="text"
            name="content"
            value={content}
            onChange={(e)=> setContent(e.target.value)}
            placeholder="Write something..."
            required
          />
        </div>
        <div>
          <span>Upload Media(Image,Video,Audio,GIF):</span>
          <br />
          <input
            type="file"
            name="mediaUrl"
            onChange={handleMediaChange}
            accept="image/*,video/*,audio/*,.gif"
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
