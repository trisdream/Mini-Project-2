import React from "react";

const FilmCard = ({ film }) => {
  return (
    <div className="film-card">
      <img src={film.image} alt={film.title} />
      <h2>{film.title}</h2>
      <p>{film.description}</p>
      <p>
        <strong>Release Date:</strong> {film.release_date}
      </p>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>
        <strong>Producer:</strong> {film.producer}
      </p>
    </div>
  );
};

export default FilmCard;
