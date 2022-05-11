import React from "react";

function Moive({moive, liked, onToggleLike:toggle}) {
  return (
    <div className="movie">
      <img
        src={moive.poster_path === null?"./image-not-available.jpg":`https://image.tmdb.org/t/p/w500${moive.poster_path}`}
        alt="Movie poster"
      />
      <div className="overlay">
        <div className="title">{moive.title}</div>
        <div className="rating">{moive.vote_average}/10</div>
        <div className="plot">{moive.overview}</div>
        <div data-toggled={liked} className="listToggle" onClick={() => toggle(moive.id)}>
          <div>
            <i className="far fa-heart"></i>
            <i className="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Moive;
