import React, { useState } from "react";

// SearchBar component allows the user to input a search term and triggers the search
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />

      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
