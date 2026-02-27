import {useEffect, useRef, useState} from "react";
import './MyPageWishlist.css';
import axios from "axios";
import MovieItem from "../MovieListPage/MovieItem.jsx";
import PersonItem from "../PersonCardPage/PersonItem.jsx";


const MyPageWishlist = ({wishlists}) => {

    const [page, setPage] = useState("MOVIE");
    const [movie,setMovie] = useState([]);
    const [person,setPerson] = useState([]);
    const movieRef = useRef();
    const actorRef = useRef();

    const handleClickPage = (e) => {
        setPage(e.target.value);
    };
    useEffect(() => {
        if (page === "MOVIE") {
            movieRef.current.classList.add("active");
            actorRef.current.classList.remove("active");

        } else {
            actorRef.current.classList.add("active");
            movieRef.current.classList.remove("active");
            setPage("PERSON");
        }

        if (!wishlists || !Array.isArray(wishlists) || wishlists.length === 0) return;
        const movieWishlists = wishlists.filter(item => item.targetType === "MOVIE");
        const personWishlists = wishlists.filter(item => item.targetType === "PERSON");
        const fetchData = async () =>{
            try {
                {
                    if (page === "MOVIE") {
                        const res = await Promise.all(movieWishlists.map(w => axios.get(`/api/movie/${w.targetId}?language=ko-KR`)));
                        setMovie(res.map(r => r.data));
                    } else {
                        const res = await Promise.all(personWishlists.map(w => axios.get(`/api/person/${w.targetId}?language=ko-KR`)));
                        setPerson(res.map(r => r.data));
                    }
                }
            }catch (e) {
                console.error("데이터 로딩 중 에러:", e);
            }
        }
        fetchData();

    }, [page,wishlists]);


    return(
        <section id="MyPageWishlist">
            <div className="wishlist-top">
                <h3 className="content-title wishlist-title">❤️ 찜 목록</h3>
                <div className="movie-actor">
                    <div className="page-btn">
                        <button
                            className="movie-btn active"
                            value="MOVIE"
                            onClick={handleClickPage}
                            ref={movieRef}
                        >
                            영화
                        </button>
                        <button
                            className="actor-btn"
                            value="ACTOR"
                            onClick={handleClickPage}
                            ref={actorRef}
                        >
                            인물
                        </button>
                    </div>
                </div>
            </div>
            <div className="wishlist-card">
                {page === "MOVIE" && movie.map(item => (
                    <MovieItem key={item.id} movie={item} />
                ))}
                {page === "PERSON" && person.map(item => (
                    <PersonItem key={item.id} person={item} />
                ))}
            </div>
        </section>
    )
}
export default MyPageWishlist;