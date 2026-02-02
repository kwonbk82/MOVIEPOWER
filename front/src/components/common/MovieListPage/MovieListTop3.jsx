import MovieItem from "./MovieItem";
import "./MovieListTop3.css";

const MovieListTop3 = ({movie}) => {
        const movieRanking = movie.slice(0,3); 
    return(
        <div id="MovieListTop3">
            {movieRanking.map((item,idx)=><div key={item.id} className="rank">
                <span>{idx+1}</span>
                <MovieItem movie={item}/>
                </div>)}
        </div>
    )
}
export default MovieListTop3;