import { useState } from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    const [likeCount, setLikeCount] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const handleLikeBtn = () => {
        if(isActive){
            
            setLikeCount(likeCount - 1);
            setIsActive(false);
        }else{
            setLikeCount(likeCount + 1);
            setIsActive(true);
        }
        
    };

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
