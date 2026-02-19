// ReviewList.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import ReviewCard from './ReviewCard';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = ({movieId}) => {
    const reviewListRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [review, setReview] = useState([]);
    const [sorted, setSorted] = useState('like');
    const [visibleCount, setVisibleCount] = useState(6);
    const [isMore,setIsMore] = useState(false);

    useEffect(() => {
        fetchReview();
    }, [review.id]);

    const fetchReview = async () => {
        try {
            const res = await axios.get(`/api/review/movie/${movieId}`);
            setReview(res.data);
        } catch (e) {
            console.e('데이터 로딩 실패 :', e);
        } finally {
            setIsReady(true);
        }
    };

    const sortedReview = useMemo(() => {
        const arr = [...review];
        const dateVal = (d) => (d ? new Date(d).getTime() : 0);

        if (sorted === 'liked') {
            return arr.sort((a, b) => (b.like ?? 0) - (a.like ?? 0));
        }
        if (sorted === 'regTime') {
            return arr.sort(
                (a, b) => dateVal(b.regTime) - dateVal(a.regTime)
            );
        }
        if (sorted === 'star') {
            return arr.sort((a, b) => b.star - a.star);
        }
    }, [review, sorted]);

    const visibleReview = useMemo(
        () => sortedReview.slice(0, visibleCount),
        [sortedReview, visibleCount]
    );

    const handleMore = () => {
        if(visibleCount>6){
            setVisibleCount((c) => Math.min(c + 6, sortedReview.length));
            setIsMore(true);
        }else {
            setIsMore(false);
        }
    };
    const handeleFold = () => {
        setVisibleCount(6);
        if (reviewListRef.current) {
            reviewListRef.current.scrollIntoView({ behavior: 'auto' });
        }
        setIsMore(false);
    };
    if (!isReady) {
        return <div>데이터 로딩 중 ...</div>;
    }
    console.log(review);
    return (
        <div id="ReviewList">
            <select
                name="sort"
                id="sort"
                ref={reviewListRef}
                onChange={(e) => setSorted(e.target.value)}
                value={sorted}
            >
                <option value="liked">인기순</option>
                <option value="regTime">최신순</option>
                <option value="star">평점순</option>
            </select>
            <ul>
                {visibleReview.map((rev) => (
                    <ReviewCard key={rev.id} review={rev} />
                ))}
            </ul>
            <div className="review-btn">
                {isMore && <button className="more-btn" onClick={handleMore}>
                    더보기
                </button>}
                {isMore && <button className="fold-btn" onClick={handeleFold}>
                    접기
                </button>}
            </div>
        </div>
    );
};
export default ReviewList;
