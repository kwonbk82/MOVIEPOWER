// MovieItem.jsx
import { Link } from "react-router-dom";
import "./MovieItem.css";

const MovieItem = ({movie}) => {
    return(
        <div id="movieItem">
            <Link to={`/moviedetail/${movie.id}`}>
                <img className="img" src={movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}` :"/img/img_loading.png"} alt={movie.title}/>
                <p className="title">{movie.title}</p>
            </Link>
        </div>
    )
}
export default MovieItem;
