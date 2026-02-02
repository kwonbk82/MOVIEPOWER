// ActorCrewMovieItem.jsx

import { Link } from "react-router-dom";
import "./ActorCrewMovieItem.css";
const ActorCrewMovieItem = ({ movie }) => {
  const movieDate = new Date(movie.release_date);
  const moveieYear = movieDate.getFullYear();
  return (
    <li className="actor-crew-moive-item">
      <Link to={`/moviedetail/${movie.id}`}>
        <img
          className="movie-poster"
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}`
              : "/img/img_loading.png"
          }
          alt={movie.title}
        />
        <p className="movie-title">{movie.title}</p>
        <p className="movie-date">{moveieYear}</p>
      </Link>
    </li>
  );
};

export default ActorCrewMovieItem;
