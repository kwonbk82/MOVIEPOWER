import {useEffect, useState} from 'react';
import './ReviewCard.css';
import {useAuth} from "../../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useDelete} from "../../../hooks/UseDelete.js";
import axios from "axios";
import {IMAGE_CONFIG} from "../../../constants/images.js";

const ReviewCard = ({ review }) => {
    const [likeCount,setLikeCount] = useState(review.liked);
    const [isLikeActive, setIsLikeActive] = useState(false);
    const [isReportActive, setIsReportActive] = useState(false);
    const {user} = useAuth();
    const { requestDelete } = useDelete();
    const nav = useNavigate();

    const accompanyMap = {
        SOLO : "단독",
        COUPLE : "연인",
        FAMILY : "가족",
        FRIEND : "친구",
        GROUP : "단체"
    }
    const userProfile = review.profileImg ? IMAGE_CONFIG.PROFILE.BASE_URL+review.profileImg
                                                : IMAGE_CONFIG.PROFILE.DEFAULT

    useEffect(() => {
        if(user) {
            fetchReviewToggleStatus();
        }
    }, []);

    const fetchReviewToggleStatus = async ()=>{
        try {
            const res = await axios.get(`/api/review/${review.id}/status`);

            if(res.data.isLiked){
                setIsLikeActive(true);
            }else {
                setIsLikeActive(false);
            }

            if(res.data.isReported){
                setIsReportActive(true);
            }else {
                setIsReportActive(false);
            }
        }catch (e) {
            console.error('리뷰 추천,신고 여부 로딩 실패 :', e);
        }
    }

    const handleLikeBtn = async () => {
        try {
            const res = await axios.patch(`/api/review/${review.id}/liked`);
            setLikeCount(res.data);
            setIsLikeActive(!isLikeActive);
        }catch (e) {
            console.error('리뷰 추천 동작 중 에러 :', e);
            if (e.response?.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
            } else {
                alert("요청을 처리할 수 없습니다.");
            }
        }
    };

    const handleReportBtn = async () => {
        try {
            if(!isReportActive){
                alert("정말 이 리뷰를 신고하시겠습니까?");
            }else {
                alert("이 리뷰에 대한 신고를 취소할까요?");
            }
            const res = await axios.patch(`/api/review/${review.id}/reported`);
            setIsReportActive(!isReportActive);
        }catch (e) {
            console.error('신고 버튼 동작 중 에러 :', e);
            if (e.response?.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
            } else {
                alert("요청을 처리할 수 없습니다.");
            }
        }
    };

    const handleEditReview = () => {
        // review 객체 전체를 다음 페이지로 넘깁니다.
        nav(`/reviewwrite/${review.movieId}?reviewId=${review.id}`, {
            state: {
                review: review,
                isEdit: true
            }
        });
    };

    const handleDeleteReview = ()=>{
        requestDelete(`/api/review/delete/${review.id}`, "리뷰",
            () => nav(0));

    }

    const isAuthorized = user && user.id===review.userId;
    const canReport = user && user.id !== review.userId;

    return (
        <li className="ReviewCard">
            <div className="card-top">
                <div className="card-profile">
                    <p className="profile-img">
                        <img src={userProfile} alt={review.nickName} />
                    </p>
                    <p className="info-nick">{review.nickName}</p>
                    <p className="info-modified">{review.modified ? "(수정됨)" : ""}</p>
                </div>
                <div className="card-stars">
                    {Array.from({ length: review.star }).map((_, index) => (
                        <span key={`filled-${index}`} className="filled-star">
                            ★
                        </span>
                    ))}
                    {Array.from({ length: 5 - review.star }).map((_, index) => (
                        <span key={`empty-${index}`} className="empty-star">
                            ☆
                        </span>
                    ))}
                </div>
                {user && (
                    <div className="edit-img">
                        {isAuthorized && (
                            <>
                                <button
                                    type="button"
                                    className="update-btn"
                                    onClick={handleEditReview}
                                >
                                    <img src="/img/pencil.png" alt="update-review" />
                                </button>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={handleDeleteReview}
                                >
                                    <img src="/img/trashcan.png" alt="delete-review" />
                                </button>
                            </>
                        )}
                        {canReport && (
                            <button
                                type="button"
                                className="report-btn"
                                aria-label="리뷰 신고"
                                onClick={handleReportBtn}

                            >
                                <img src={isReportActive ? "/img/sirenActived.png" : "/img/siren.png"} alt="report-review" />
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="card-mid">
                <div className="info-viewingdate">
                    <p>시청일</p>
                    <p>{review.date}</p>
                </div>
                <div className="info-accompany">
                    <p>동행</p>
                    <p>{accompanyMap[review.accompany] || "정보 없음"}</p>
                </div>
            </div>
            <div className="card-content">{review.content}</div>
            <div className="card-like">
                <button
                    className={`like-button ${isLikeActive ? 'active' : ''}`}
                    onClick={handleLikeBtn}
                >
                    좋아요
                </button>
                <p>{likeCount}</p>
            </div>
        </li>
    );
};
export default ReviewCard;
