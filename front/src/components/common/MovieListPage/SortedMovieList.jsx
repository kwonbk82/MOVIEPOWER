import MovieItem from "./MovieItem";
import "./SortedMovieList.css";

const SortedMovieList = ({movie}) => {
    return(
        <div id="SortedMovieList">
            {movie.map(item=><MovieItem key={item.id} movie={item}/>)}
        </div>
    )
}
export default SortedMovieList;