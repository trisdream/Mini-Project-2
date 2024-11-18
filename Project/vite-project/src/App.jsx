import React, { useState, useEffect } from "react";
import FilmFetching from "../components/Fetching";
import LoadingPopup from "../components/Popup.jsx";
import ThemeToggle from "../components/ThemeChanger";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="App">
      {isLoading && <LoadingPopup onClose={() => setIsLoading(false)} />}

      <FilmFetching />

      <ThemeToggle />
    </div>
  );
}

export default App;
