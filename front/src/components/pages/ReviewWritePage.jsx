// ReviewWritePage.jsx
import {useEffect, useRef, useState} from 'react';
import './ReviewWritePage.css';
import baseApi from '/public/data/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../../contexts/AuthContext.jsx";
const ReviewWritePage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const {user} = useAuth();
    const categories = [
        { key: "SOLO", label: "단독" },
        { key: "COUPLE", label: "연인" },
        { key: "FAMILY", label: "가족" },
        { key: "FRIEND", label: "친구" },
        { key: "GROUP", label: "단체" }];
    // const todayString = new Date().toISOString().slice(0, 10);
    const MAX_CONTENT = 200;

    // noti
    const ratingRef = useRef();
    const dateRef = useRef();
    const accompanyRef = useRef();
    const contentRef = useRef();

    const [isReady, setIsReady] = useState(false);
    const [movie,setMovie] = useState();
    const [review,setReview] =useState({});
    const [accompany, setAccompany] = useState(null);
    const [date, setDate] = useState(null);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    
        useEffect(() => {
            fetchMovie();
        }, []);

    const fetchMovie = async()=>{
      setIsReady(false);
        try {
            const res1 = await baseApi.get(`/movie/${id}`);
            const data = await res1.data;
            setMovie(data);
        } catch (e) {
            console.error('데이터 로딩 실패 :', e);
        } finally {
            setIsReady(true);
        }
    }

    const handleChangeDate = (e) =>
    {setDate(e.target.value);
        if (e.target.value && dateRef.current) {
            dateRef.current.style.display = "none";
        }};
    const handleChangeContent = (e) => {
        setContent(e.target.value);
        if (e.target.value.trim().length > 0 && contentRef.current) {
            contentRef.current.style.display = "none";
        }
    };
    const onMouseEnter = (index) => {
        setHoverRating(index);
    };

    const countingStars = (ratingValue) => {
        switch (ratingValue) {
            case 1:
                return <p>매우 불만족</p>;
            case 2:
                return <p>불만족</p>;
            case 3:
                return <p>보통</p>;
            case 4:
                return <p>만족</p>;
            case 5:
                return <p>매우 만족</p>;
            default:
                return
        }
    };
    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onStarClick = (index) => {
        setRating(index);
        if (ratingRef.current) {
            ratingRef.current.style.display = "none";
        }
    };
    const handleClickWrite = async () => {

        let isValid = true;

        if (rating === 0) {
            ratingRef.current.style.display = "block";
            isValid = false;
        }
        if (!date) {
            dateRef.current.style.display = "block";
            isValid = false;
        }
        if (!accompany) {
            accompanyRef.current.style.display = "block";
            isValid = false;
        }
        if (!content.trim()) {
            contentRef.current.style.display = "block";
            isValid = false;
        }

        if (!isValid) return;
                if (!window.confirm("리뷰를 등록하시겠습니까?")) {
                    return; // '취소' 클릭 시 중단
                }

                try {
                const res = await axios.post("/api/review/create",{
                    movieId: id,
                    star : rating,
                    date,
                    accompany,
                    content
                });
                window.confirm("리뷰가 등록되었습니다.")
                setReview(res.data);
                nav(`/moviedetail/${id}`);

        }catch (e) {
            console.error("리뷰 등록 실패:", e);
            alert("등록에 실패했습니다.")
        }

    };
    if (!isReady) {
        return <div>데이터 로딩 중 ...</div>;
    }


    return (
        <div id="ReviewWritePage">
            <div className="review-wrap">
                <div className="review-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                </div>
                <div className="review-write">
                    <h1>영화는 즐겁게 감상하셨나요?</h1>
                    <div className="review-stars-wrap">
                        <h3>별점</h3>
                        <div className="review-stars">
                            {[1, 2, 3, 4, 5].map((index) => {
                                const filled = hoverRating
                                    ? hoverRating >= index
                                    : rating >= index;
                                return (
                                    <span
                                        key={index}
                                        className={`star ${
                                            filled ? 'filled' : 'empty'
                                        }`}
                                        onMouseEnter={() => onMouseEnter(index)}
                                        onMouseLeave={onMouseLeave}
                                        onClick={() => onStarClick(index)}
                                    >
                                        ★
                                    </span>
                                );
                            })}
                            {countingStars(hoverRating || rating)}
                        </div>
                        <p className="noti" ref={ratingRef}>
                             "별점을 입력해주세요."
                        </p>
                    </div>
                    <div className="review-date">
                        <>
                            <h3>시청일</h3>
                            <input
                                type="date"
                                onChange={handleChangeDate}
                                value={date}
                            />
                            <p className="noti" ref={dateRef}>
                                "날짜를 선택해주세요."
                            </p>
                        </>

                    </div>
                    <div className="review-with">
                        <>
                            <h3>동행</h3>
                            {categories.map((category) => (
                                <button
                                    key={category.key}
                                    className={`categoryGroup ${
                                        accompany === category.key
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        setAccompany(category.key);
                                        if (accompanyRef.current) {
                                            accompanyRef.current.style.display = "none";
                                        }
                                    }}
                                >
                                    {category.label}
                                </button>
                            ))}
                            <p className="noti" ref={accompanyRef}>
                                 "동행 버튼을 선택해주세요."
                            </p>
                        </>

                    </div>
                    <div className="review-content">
                        <>
                            <h3>내용</h3>
                            <textarea
                                name="reviewContent"
                                id="reviewContent"
                                placeholder={`${user.nickName} 님만의 감상평을 남겨주세요!`}
                                onChange={handleChangeContent}
                                value={content}
                                maxLength={MAX_CONTENT}
                            />
                            <p className="max-length">
                                {content.length}/{MAX_CONTENT}자
                            </p>
                            <p className="noti" ref={contentRef}>
                               "내용을 입력해주세요."
                            </p>
                        </>

                    </div>
                </div>
            </div>
            <button className="review-done" onClick={handleClickWrite}>작성하기</button>
        </div>
    );
};

export default ReviewWritePage;
