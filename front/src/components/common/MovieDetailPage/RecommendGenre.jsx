// RecommendGenre.jsx
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MovieItem from '../MovieListPage/MovieItem';

import './RecommendGenre.css';

const RecommendGenre = ({ genre, movie, handleClickGenre }) => {
    const recMovie = movie.slice(0, 4);
    return (
        <div id="RecommendGenre">
            <ul>
                {recMovie.map((item, idx) => (
                    <MovieItem key={idx} movie={item} />
                ))}
                <div className="recommend-more">
                    <button onClick={handleClickGenre}>
                        <img
                            src="/icon/plus_128px.png"
                            alt="해당 장르 더보기"
                        />
                        <p className="plus-info">
                            {genre.genres[0].name} 장르 영화 더보기
                        </p>
                    </button>
                </div>
            </ul>
        </div>
    );
};
export default RecommendGenre;
