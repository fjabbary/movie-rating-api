
const WatchedMovie = ({ movie, removedWatchedMovie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} </span>
        </p>
        <p>
          <button className="btn-delete" onClick={() => removedWatchedMovie(movie.imdbID)}>X</button>
        </p>
      </div>

    </li>
  )
}

export default WatchedMovie