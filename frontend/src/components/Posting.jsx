 import Card from './Card';
import MediaPost from '../models/MediaPost';
import CreatePost from '../pages/CreatePost';

 function Posting(){
  return(
  <div>
    <h1>Creat Post</h1>
    <CreatePost />
    {MediaPost.map((posting, index)=>
      <Card 
      key={`${posting.name}-${index}`}
      caption={posting.description}
      image={posting.image}
      date={posting.createdAt}/>
    )}
  </div>
  )
 };

 export default Posting