import React, { useEffect, useState } from 'react'
import StarRating from './StarRating';

const MovieDetails = ({ selectedId, closeMovieDetails }) => {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const KEY = "87db9a8e";

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = selectedMovie;

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

  return (
    <div className="details">
      {isLoading ? <p className='loader'>Loading...</p> :
        <React.Fragment>
          <header>
            <button className="btn btn-back" onClick={closeMovieDetails}> &#x2190; </button>
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
              <StarRating />
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </React.Fragment>
      }

    </div>
  )
}

export default MovieDetails