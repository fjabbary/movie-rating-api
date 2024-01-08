import { useState } from "react";
import Movie from "./Movie";


const MovieList = ({ movies, loading, errMsg, setIdFn }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && (
        <ul className="list list-movies">
          {errMsg ? errMsg : movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} setIdFn={setIdFn} />)}
        </ul>
      )}
    </div>
  )
}

export default MovieList