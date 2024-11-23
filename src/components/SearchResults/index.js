import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom' // Use useLocation instead of useSearchParams
import MovieCard from '../MovieCard'
import './style.css'

const SearchResults = () => {
  const [movies, setMovies] = useState([])
  const location = useLocation() // Access the current location (URL)

  // Function to fetch search results
  const fetchSearchResults = async query => {
    const apiKey = '52d38f600d3a8f6797c2b24e51d7db0e'
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`,
    )
    const data = await response.json()
    setMovies(data.results)
  }

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    if (query) {
      fetchSearchResults(query)
    }
  }, [location.search]) // Re-run when the query parameter changes

  return (
    <div className="search-results-page">
      <h2>Search Results</h2>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No results found. Please try another query.</p>
        )}
      </div>
    </div>
  )
}

export default SearchResults
