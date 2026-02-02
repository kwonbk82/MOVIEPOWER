// RecommendDirector.jsx
import { useNavigate, useParams } from 'react-router-dom';
import MovieItem from '../MovieListPage/MovieItem';
import { useEffect, useState } from 'react';
import baseApi from '/public/data/api/api';
import './RecommendDirector.css';

const RecommendDirector = ({ director }) => {
    const [isLoding, setIsLoding] = useState(false);
    const [crewMovies, setCrewMovies] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        fahctData();
    }, [director[0].id]);
    const fahctData = async () => {
        try {
            const respones = await baseApi.get(
                `/person/${director[0].id}/movie_credits`
            );
            const crewMovieData = respones.data.crew;
            const uniqueTitles = new Set();

            // 중복을 제거한 새로운 영화 목록
            const uniqueCrewMovies = crewMovieData.filter((movie) => {
                if (!uniqueTitles.has(movie.title)) {
                    uniqueTitles.add(movie.title);
                    return true;
                }
                return false;
            });
            const cutCrewMovies = uniqueCrewMovies.slice(0, 4);
            setCrewMovies(cutCrewMovies);
        } catch (e) {
            console.error('데이터 로딩 실패 : ', e);
        } finally {
            setIsLoding(true);
        }
    };
    const handleClickDirector = () => {
        nav(`/actordetail/${director[0].id}`);
    };
    const cutDirector = director.slice(0,1)
    return (
        <div id="RecommendDirector">
            <ul>
                {crewMovies.map((item) => (
                    <MovieItem key={item.id} movie={item} />
                ))}
                <div className="recommend-more">
                    <button onClick={handleClickDirector}>
                        <img
                            src="/icon/plus_128px.png"
                            alt="해당 감독 더보기"
                        />
                        {cutDirector.map((item,idx) => (
                            <p key={idx}>{item.name} 감독 작품 더보기</p>
                        ))}
                    </button>
                </div>
            </ul>
        </div>
    );
};
export default RecommendDirector;
