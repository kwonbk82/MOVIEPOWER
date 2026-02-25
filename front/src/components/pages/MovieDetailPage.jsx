// MovieDetailPage.jsx
import { useEffect, useState } from 'react';
import {
    MovieDetailActorList,
    RecommendDirector,
    RecommendGenre,
    ReviewList,
} from '../common/MovieDetailPage';
import baseApi from '/public/data/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import "./MovieDetailPage.css";
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {useDelete} from "../../hooks/UseDelete.js";

const MovieDetailPage = () => {
    const nav = useNavigate();
    const [isReady, setIsReady] = useState(false);
    const [movie, setMovie] = useState([]);
    const { id } = useParams();
    const [genreMovie, setGenreMovie] = useState([]);
    const [cast,setCast] = useState([]);
    const [crew,setCrew] = useState([]);
    const [likeBtn,setLikeBtn] = useState(false);
    const [heart,setHeart] = useState(false);
    const {user} = useAuth();
    useEffect(() => {
        fetchMovie();
    }, [id]);

    const fetchMovie = async () => {
        setIsReady(false);
        try {
            const res1 = await baseApi.get(`/movie/${id}`);
            const data = await res1.data;
            const res2 = await baseApi.get(
                `/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=vote_average.desc&with_genres=${data.genres[0].id}&vote_count.gte=200`
            );
            const genreData = await res2.data.results;
            const res3 = await baseApi.get(`/movie/${id}/credits`);
            const castData = await res3.data.cast;
            const crewData = await res3.data.crew;

            const res4 = await axios.get(`/api/wishlist/check/${movie.id}`);
            setHeart(res4.data);
            setMovie(data);
            setGenreMovie(genreData)
            setCast(castData)
            setCrew(crewData)
        } catch (e) {
            console.error('데이터 로딩 실패 :', e);
        } finally {
            setIsReady(true);
        }
    };
    // 중복빼기
    const filteredGenreMovie = genreMovie.filter(item => item.id !== movie.id)
    
    // 감독찾기
    const director = crew.filter(item => item.job === "Director")
    
    const handleClickGenre = ()=>{
        nav(`/movielist?genre=${movie.genres[0].id}&page=1`)
    }
    const handleClickMovieLike = async ()=>{
        try {
            if (likeBtn){
                await axios.delete("/api/wishlist/delete", {
                    params: {targetId: movie.id, targetType: "MOVIE" }
                });
                setLikeBtn(false);
                setHeart(false);
            }else {
                const res = await axios.post("/api/wishlist/create",{
                    targetId: movie.id,
                    targetType: "MOVIE"
                })
                if(res.status===200){
                    setLikeBtn(true);
                    setHeart(true);
                }
            }
        }catch (e) {
            console.error('찜 삭제 실패 :', e);
            if (e.response?.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
            } else {
                alert("요청을 처리할 수 없습니다.");
            }
        }
    }
    const handleClickReviewBtn = ()=>{
        nav(`/reviewwrite/${movie.id}`)
    }
    let movieScore = Math.round(movie.vote_average * 100) / 100;
    if (!isReady) {
        return <div>데이터 로딩 중 ...</div>;
    }
    return (
        <div id="MovieDetailPage">
            <div className="movie-info">
                <div className="md-left">
                    <img
                        className="img"
                        src={movie.poster_path ?`https://image.tmdb.org/t/p/w500${movie.poster_path}` :"/img/img_loading.png"}
                        alt={movie.title}
                    />
                    <div className="left-info">
                        <div className="rating">
                            <span>평점</span>
                            <p>{movieScore}점</p>
                        </div>
                        <div className="left-btn">
                            <button onClick = {handleClickMovieLike}   className={`good-btn ${heart ? 'active' : ''}`}>보고싶어요</button>
                            <button onClick={handleClickReviewBtn} className='go-review-btn'>리뷰작성</button>
                        </div>
                    </div>
                </div>
                <div className="md-right">
                    <h1>{movie.title}</h1>
                    <MovieDetailActorList cast={cast} director={director}
                    genre={movie.genres[0]}/>
                    <div className="right-info">
                        <div>
                            <h4>장르</h4>
                            <span>{movie.genres[0].name}</span>
                        </div>
                        <div>
                            <h4>개봉일</h4>
                            <span>{movie.release_date}</span>
                        </div>
                        <div>
                            <h4>줄거리</h4>
                            <span>{movie.overview ?movie.overview :"..."}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewList movieId={movie.id}/>
            <h2>같은 장르 추천 영화</h2>
            <RecommendGenre genre={movie} movie={filteredGenreMovie} handleClickGenre={handleClickGenre}/>
            <h2>같은 감독의 다른 영화</h2>
            <RecommendDirector director={director} />
        </div>
    );
};

export default MovieDetailPage;
