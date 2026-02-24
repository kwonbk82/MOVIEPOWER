import {useNavigate} from "react-router-dom";

const MyPageReview = ({reviews,onDelete}) => {
    const nav = useNavigate();

    const handleUpdateReview = (movieId,reviewId,i)=>{
        nav(`/reviewwrite/${movieId}?reviewId=${reviewId}`, {
            state: {
                review: reviews[i],
                isEdit: true
            }
        });
    }

    return(
        <section>
            <h3 className="content-title">✍️ 내가 쓴 리뷰</h3>
            {reviews.map((r,index) => (
                <div key={r.id} className="info-card review-item">
                    <div>
                        <h4>
                            <span className="review-number">{index + 1}. </span>
                            {r.title}
                            <span className="rating">★ {r.star}</span>
                        </h4>
                        <p>{r.content}</p>
                    </div>
                    <div className="review-button">
                        <button className="btn-update" onClick={()=>handleUpdateReview(r.movieId,r.id,index)}>수정</button>
                        <button className="btn-delete" onClick={() => onDelete(r.id)}>삭제</button>
                    </div>
                </div>
            ))}
        </section>
    )
}
export default MyPageReview;