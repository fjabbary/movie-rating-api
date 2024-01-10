import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';

const MovieDetails = ({ selectedId, closeMovieDetails, handleAddWatch, handleUserRate }) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const KEY = "87db9a8e";

  const { Title: title, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = selectedMovie;

  useEffect(() => {
    async function getOneMovie() {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json();
      setSelectedMovie(data)
      setIsLoading(false)
    }

    getOneMovie();

  }, [selectedId])

  useEffect(() => {
    document.title = `Movie | ${title}`
    return () => {
      document.title = "Movie Rating API"
    }
  }, [title])

  const handleAdd = (movie) => {
    handleAddWatch(movie)
    closeMovieDetails();
  }

  return (
    <div className="details">
      {isLoading ? <p className='loader'>Loading...</p> :
        <React.Fragment>
          <header>
            <button className="btn btn-back" onClick={closeMovieDetails}> <i className="fa fa-arrow-left" aria-hidden="true"></i> </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span> {imdbRating} IMDb rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating handleUserRate={handleUserRate} />

              <button className="btn-add" onClick={() => handleAdd(selectedMovie)}>+ Add to list</button>
            </div>
            <p><strong>Plot: </strong><em>{plot}</em></p>
            <p><strong>Starring:</strong> {actors}</p>
            <p><strong>Directed by: </strong> {director}</p>
          </section>
        </React.Fragment>
      }

    </div>
  )
}

export default MovieDetails