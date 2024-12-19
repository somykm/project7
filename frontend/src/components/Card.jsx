import '../styles/card.css';

function Card({ content, mediaUrl, date,reads }) {
  const isImage =mediaUrl.match(/\.(jpeg|jpg|gif|png)$/i);
  const isVideo =mediaUrl.match(/\.(mp4|webm|ogg)$/i);
  const isAudio =mediaUrl.match(/\.(mp3|wav|ogg)$/i);
  return (
  <div className='card'>
    <p className="paragraph-content">{content}</p>
    {isImage && <img src={mediaUrl} alt={`cover of ${content}`} height={150} width={200}/>}
    {isVideo && (
      <video controls style={{maxWidth: "100%"}}>
        <source src={mediaUrl} type="video/mp4" /> 
        <source src={mediaUrl} type="video/webm" /> 
        <source src={mediaUrl} type="video/ogg" />
      </video>
    )}
    {isAudio && (
      <audio controls>
        <source src={mediaUrl} type="audio/mpeg" /> 
        <source src={mediaUrl} type="audio/wav" /> 
        <source src={mediaUrl} type="audio/ogg" />
      </audio>
    )}
    <div>{date}</div> 
    <div>Reads: {reads}</div> 
  </div>
  );
}

export default Card;
