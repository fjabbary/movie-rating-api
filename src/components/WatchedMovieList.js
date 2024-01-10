import { useState } from 'react'
import WatchedMovieSummary from './WatchedMovieSummary';
import WatchedMovie from './WatchedMovie';
import MovieDetails from './MovieDetails';



const WatchedMovieList = ({ selectedId, closeMovieDetails, watched, handleAddWatch, handleUserRate, removedWatchedMovie }) => {

  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {selectedId ? <MovieDetails
        selectedId={selectedId}
        closeMovieDetails={closeMovieDetails}
        handleAddWatch={handleAddWatch}
        handleUserRate={handleUserRate}

      /> : <div>
        {isOpen2 && (
          <div>
            <WatchedMovieSummary watched={watched} />

            <ul className="list list-movies">
              {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} removedWatchedMovie={removedWatchedMovie} />)}
            </ul>
          </div>
        )}
      </div>}
    </div>
  )
}

export default WatchedMovieList