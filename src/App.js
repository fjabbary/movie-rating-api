import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import MovieList from './components/MovieList';
import WatchedMovieList from './components/WatchedMovieList';

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];



export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);
  const [userRating, setUserRating] = useState('');


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

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        closeMovieDetails()
      }
    }

    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback)
    }

  }, [])


  const setIdFn = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }

  const closeMovieDetails = () => {
    setSelectedId(null)
  }

  const handleAddWatch = (movie) => {
    const foundMovie = watched.find(item => item.imdbID === movie.imdbID);
    if (foundMovie) {
      alert('This movie is already in your watchlist!')
      return;

    }
    setWatched(watched => ([...watched, { ...movie, userRating }]))
  }

  const handleUserRate = (userRate) => {
    setUserRating(userRate)
  }

  const removedWatchedMovie = (id) => {
    setWatched(watched => watched.filter((item) => item.imdbID !== id))
  }


  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main>
        <MovieList movies={movies} errMsg={error} setIdFn={setIdFn} />
        <WatchedMovieList selectedId={selectedId} closeMovieDetails={closeMovieDetails} watched={watched} handleAddWatch={handleAddWatch} handleUserRate={handleUserRate} removedWatchedMovie={removedWatchedMovie} />
      </Main>
    </>
  );
}
