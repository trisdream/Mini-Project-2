import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import FilmCard from "./FilmCards";
import SearchBar from "./Searchbar";

// Custom hook for debouncing input (delaying updates for efficient search)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const FilmFetching = () => {
  const [films, setFilms] = useState([]);

  const [filteredFilms, setFilteredFilms] = useState([]);

  const [filterCriteria, setFilterCriteria] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch films from the Ghibli API on initial render
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch("https://ghibliapi.vercel.app/films");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setFilms(data);
        setFilteredFilms(data);
      } catch (error) {
        console.error("Error fetching films:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFilms();
  }, []); // Empty dependency array,runs only on initial render

  // Filter and sort films whenever filter criteria, films, or debounced search term changes
  useEffect(() => {
    let filteredAndSortedFilms = [...films];

    // Filter films by search term if available
    if (debouncedSearchTerm) {
      filteredAndSortedFilms = filteredAndSortedFilms.filter((film) =>
        film.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Apply sorting based on the selected filter criteria
    if (filterCriteria === "title") {
      filteredAndSortedFilms.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterCriteria === "director") {
      filteredAndSortedFilms.sort((a, b) =>
        a.director.localeCompare(b.director)
      );
    } else if (filterCriteria === "release_date") {
      filteredAndSortedFilms.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }

    setFilteredFilms(filteredAndSortedFilms);
  }, [filterCriteria, films, debouncedSearchTerm]);

  const handleFilterCriteriaChange = (newFilterCriteria) => {
    setFilterCriteria(newFilterCriteria);
  };

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Display loading message if data is being fetched
  if (loading) {
    return <div>Loading films...</div>;
  }

  return (
    <div>
      {/*navbar filters*/}
      <Navbar onFilterChange={handleFilterCriteriaChange} />

      {/* SearchBar search films by title */}
      <SearchBar onSearch={handleSearch} />

      <div className="film-container">
        {/* Render the filtered films*/}
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => <FilmCard key={film.id} film={film} />)
        ) : (
          <p>No films found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FilmFetching;
