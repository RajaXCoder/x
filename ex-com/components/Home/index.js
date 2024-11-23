import React, {useEffect, useState} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './style.css'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 500 // TMDB's maximum limit

  useEffect(() => {
    const apiKey = '52d38f600d3a8f6797c2b24e51d7db0e'
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${currentPage}`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json()
        setMovies(data.results)
      } catch (error) {
        console.error('Error fetching movies:', error)
      }
    }

    fetchMovies()
  }, [currentPage])

  return (
    <div className="movies-page">
      <h2>Popular Movies</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}

export default Home
