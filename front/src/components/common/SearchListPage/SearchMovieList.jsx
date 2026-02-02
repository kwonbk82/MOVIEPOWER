// SearchMovieList.jsx

import SearchMovieItem from "./SearchMovieItem";
import "./SearchMovieList.css";
const SearchMovieList = ({ searchMovies }) => {
  return (
    <div id="SearchMovieList">
      <ul className="search-movie-list">
        {searchMovies.map((movie) => (
          <SearchMovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};
export default SearchMovieList;
