import {Link, withRouter} from 'react-router-dom'
import './style.css'

const MovieCard = ({movie, history}) => {
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500'
  const defaultImage = 'https://via.placeholder.com/500x750?text=No+Image'

  const movieDetailView = () => {
    history.push(`/movie/${movie.id}`)
  }

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `${imageBaseURL}${movie.poster_path}`
            : defaultImage
        }
        alt={movie.title || 'No Title Available'}
      />
      <h3>{movie.title || 'Untitled'}</h3>
      <p>⭐ {movie.vote_average || 'N/A'}</p>
      <Link to={`/movie/${movie.id}`}>
        <button type="button" onClick={movieDetailView}>
          View Details
        </button>
      </Link>
    </div>
  )
}

export default withRouter(MovieCard)
