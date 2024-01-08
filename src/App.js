import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import MovieList from './components/MovieList';
import WatchedMovieList from './components/WatchedMovieList';



export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const KEY = "87db9a8e";

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        const data = await res.json();

        if (data.Search?.length > 0) {
          setError("")
          setMovies(data.Search);
        } else if (data.Error && query) {
          setMovies([]);
          setError("⛔ " + data.Error);
        } else if (!query) {
          setMovies([])
          setError("")
        }

      } catch (error) {
        setError("⛔ " + error.message);
      }
    }

    fetchMovies();

  }, [query])


  const setIdFn = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }

  const closeMovieDetails = () => {
    setSelectedId(null)
  }


  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <MovieList movies={movies} errMsg={error} setIdFn={setIdFn} />
        <WatchedMovieList selectedId={selectedId} closeMovieDetails={closeMovieDetails} />
      </Main>
    </>
  );
}
