import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import './style.css'

const MovieDetails = props => {
  const [movie, setMovie] = useState({})
  const [cast, setCast] = useState([])
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    const apiKey = '52d38f600d3a8f6797c2b24e51d7db0e'

    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        )
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie details')
        }
        const movieData = await movieResponse.json()
        setMovie(movieData)

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
        )
        if (!castResponse.ok) {
          throw new Error('Failed to fetch cast details')
        }
        const castData = await castResponse.json()
        setCast(castData.cast)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchMovieDetails()
  }, [id])

  return (
    <div className="movie-details">
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
      </div>
      <div className="movie-cast">
        <h3>Cast</h3>
        <ul className="cast-grid">
          {cast.map(member => (
            <li key={member.id} className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                alt={member.name}
              />
              <p>
                {member.name} as {member.character}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MovieDetails
