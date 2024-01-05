import WatchedMovieList from './WatchedMovieList';

const Main = ({ children }) => {

  return (
    <main className="main">
      {children}
      <WatchedMovieList />
    </main>
  )
}

export default Main