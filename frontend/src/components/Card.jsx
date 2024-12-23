import '../styles/card.css';

function Card({ content, mediaUrl, date,reads, onDelete, onClick }) {
  const isImage =mediaUrl?.match(/\.(jpeg|jpg|gif|png)$/i);
  const isVideo =mediaUrl?.match(/\.(mp4|webm|ogg)$/i);
  const isAudio =mediaUrl?.match(/\.(mp3|wav|ogg)$/i);

  const handleCardClick = (event) => { if (event.target.tagName !== 'BUTTON') { onClick(); }};
  return (
  <div className='card' onClock={handleCardClick} style={{ cursor: 'pointer'}}>
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
        <source src={mediaUrl} type="audio/ogg" /> 
        <source src={mediaUrl} type="audio/wav" /> 
        <source src={mediaUrl} type="audio/mp3" />
      </audio>
    )}
    <p className="paragraph-content">{content}</p>
    <div>{date}</div> 
    <div>Reads: {reads}</div> 
    <button className="delete-button" onClick={(e)=> {e.stopPropagation(); onDelete();}}>Delete</button>
  </div>
  );
}

export default Card;
