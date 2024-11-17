import { useState } from "react";
import "./App.css";
import FilmFetching from "../components/Fetching";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FilmFetching />
    </>
  );
}

export default App;
