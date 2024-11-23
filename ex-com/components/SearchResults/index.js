import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import MovieCard from '../MovieCard'
import './style.css'

const SearchResults = () => {
  const [movies, setMovies] = useState([])
  const [searchParams] = useSearchParams()

  const fetchSearchResults = async query => {
    const apiKey = '52d38f600d3a8f6797c2b24e51d7db0e'
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`,
    )
    const data = await response.json()
    setMovies(data.results)
  }

  useEffect(() => {
    const query = searchParams.get('query')
    if (query) {
      fetchSearchResults(query)
    }
  }, [searchParams])

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
