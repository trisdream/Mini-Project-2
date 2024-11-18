import React, { useState, useEffect } from "react";

const FilmFetching = () => {
  const [filmData, setFilmData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://ghibli.rest/films");
        if (!response.ok) {
          throw new Error("Films not found");
        }
        const data = await response.json();
        setFilmData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilmData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!filmData.length) return <div>No films found</div>;

  return (
    <div>
      {filmData.map((film) => (
        <div key={film.id}>
          <h1>{film.title}</h1>
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
      ))}
    </div>
  );
};

export default FilmFetching;
