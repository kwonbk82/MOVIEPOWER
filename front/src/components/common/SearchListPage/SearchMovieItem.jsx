// SearchMovieItem.jsx

import { Link } from "react-router-dom";
import "./SearchMovieItem.css";
const SearchMovieItem = ({ movie }) => {
  return (
    <li className="search-movie-item">
      <Link to={`/moviedetail/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}`
              : "/img/img_loading.png"
          }
          alt={movie.title}
        />
        <div className="movie-info">
          <p className="movie-title">{movie.title}</p>
        </div>
      </Link>
    </li>
  );
};
export default SearchMovieItem;
