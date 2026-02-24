import { useState } from 'react';
import './ReviewCard.css';
import {useAuth} from "../../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useDelete} from "../../../hooks/UseDelete.js";
import axios from "axios";

const ReviewCard = ({ review }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const {user} = useAuth();
    const { requestDelete } = useDelete();
    const nav = useNavigate();
    const handleLikeBtn = () => {
        if(isActive){
            
            setLikeCount(likeCount - 1);
            setIsActive(false);
        }else{
            setLikeCount(likeCount + 1);
            setIsActive(true);
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
                        <img src={review.profile ?`${review.profile}`:"/img/no_user_profile.jpg"} alt={review.nickName} />
                    </p>
                    <p className="info-nick">{review.nickName}</p>
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
                            >
                                <img src="/img/siren.png" alt="report-review" />
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
                    <p>{review.accompany}</p>
                </div>
            </div>
            <div className="card-content">{review.content}</div>
            <div className="card-like">
                <button
                    className={`like-button ${isActive ? 'active' : ''}`}
                    onClick={handleLikeBtn}
                >
                    좋아요
                </button>
                <p>{review.liked+likeCount}</p>
            </div>
        </li>
    );
};
export default ReviewCard;
