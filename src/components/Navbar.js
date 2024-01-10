import { useEffect, useRef } from "react"

const Navbar = ({ movies, query, setQuery }) => {

  const inputEl = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', callback)
    inputEl.current.focus();

    function callback(e) {
      if (document.activeElement === inputEl.current)
        return;

      if (e.key === 'Enter') {
        inputEl.current.focus();
        setQuery('');
      }
    }
    return () => document.removeEventListener('keydown', callback)
  }, [setQuery])


  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
      <p className="num-results">
        Found <strong>{movies?.length}</strong> results
      </p>
    </nav>
  )
}

export default Navbar