import React, { useState } from "react";
import logo from "./logo.png";

// Navbar component allows users to filter films based on selected criteria
const Navbar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  // Handle the change in filter criteria selection
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Ghibli Logo" className="ghibli-logo" />
      </div>

      <div className="navbar-title">
        <h1>Studio Ghibli Films</h1>
      </div>

      <div className="filter-container">
        <select
          id="filter-select"
          name="filter"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="filter-select"
          aria-label="Select filter criteria"
        >
          <option value="">Sort by...</option>{" "}
          <option value="title">Title (A-Z)</option>{" "}
          <option value="director">Director (A-Z)</option>{" "}
          <option value="release_date">Release Date (Newest to Oldest)</option>{" "}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
