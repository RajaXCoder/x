import {useEffect, useState} from 'react'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './style.css'

const TopRated = () => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const fetchTopRatedMovies = async (page = 1) => {
    const apiKey = '52d38f600d3a8f6797c2b24e51d7db0e'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${page}`,
    )
    const data = await response.json()
    setMovies(data.results)
  }

  useEffect(() => {
    fetchTopRatedMovies(currentPage)
  }, [currentPage])

  return (
    <div className="top-rated-page">
      <h2>Top Rated Movies</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalPages={10} // Adjust based on API response if available
      />
    </div>
  )
}

export default TopRated
