import React from "react";
import "../styles/card.css";

function Card({
  id,
  content,
  mediaUrl,
  date,
  reads,
  onDelete,
  onMarkAsRead,
  onCardClick,
}) {
  const isImage = mediaUrl?.match(/\.(jpeg|jpg|gif|png)$/i);
  const isVideo = mediaUrl?.match(/\.(mp4|webm|ogg)$/i);
  const isAudio = mediaUrl?.match(/\.(mp3|wav|ogg)$/i);

  const handleCardClick = (event) => {
    if (event.target.tagName !== "BUTTON") {
      onCardClick(id);
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {isImage && (
        <img
          src={mediaUrl}
          alt={`cover of ${content}`}
          height={150}
          width={200}
        />
      )}
      {isVideo && (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={mediaUrl} type="video/mp4" />
          <source src={mediaUrl} type="video/webm" />
          <source src={mediaUrl} type="video/ogg" />
        </video>
      )}
      {isAudio && (
        <audio controls>
          <source src={mediaUrl} type="audio/mp3" />
          <source src={mediaUrl} type="audio/wav" />
          <source src={mediaUrl} type="audio/ogg" />
        </audio>
      )}
      <p className="paragraph-content">{content}</p>
      <div>{date}</div>
      <div>Reads: {reads.length}</div>
      <button
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        Delete
      </button>
      <button
        className="mark-as-read-button"
        onClick={(e) => {
          e.stopPropagation();
          onMarkAsRead();
        }}
      >
        Mark as Read
      </button>
    </div>
  );
}

export default Card;
