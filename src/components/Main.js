import { useState } from 'react'
import MovieList from './MovieList';
import WatchedMovieList from './WatchedMovieList';



const Main = () => {

  return (
    <main className="main">
      <MovieList />
      <WatchedMovieList />
    </main>
  )
}

export default Main