import {useEffect, useState} from 'react';

import './MyPage.css';
import axios from "axios";
import baseApi from "../../../public/data/api/api.js";
import {useDelete} from "../../hooks/UseDelete.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext.jsx";
import {MyPageInquiry, MyPageReview, MyPageUserInfo, MyPageWishlist} from "../common/MyPage/index.js";


const MyPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [user,setUser] = useState(null);
  const [reviews,setReviews] = useState([]);
  const [wishlists,setWishlists] = useState("");
  const [inquiries,setInquiries] = useState([]);
  const [isReady,setIsReady] = useState(false);
  const {requestDelete} = useDelete();
  const {logout} = useAuth();
  const nav = useNavigate();


  useEffect(()=>{
    aboutUser();
  },[activeTab]);

  const aboutUser = async ()=>{
    try {
      const res = await axios.get(`/api/mypage/${activeTab}`);

      if(res.status===200){
        switch (activeTab) {
          case 'info':
            setUser(res.data); // 내 정보 저장
            break;

          case 'review':{
            const data = res.data;
            const shownReviews = await Promise.all(data.map(async (r) => {
              const movieRes = await baseApi.get(`/movie/${r.movieId}`); // 엔티티 필드명 확인(movie_id)
              return {
                ...r,
                title: movieRes.data.title // 화면에 그릴 제목 추가
              };
            }));
            setReviews(shownReviews);
            break;
          }

          case 'wishlist':
            setWishlists(res.data); // 찜 목록 저장
            break;

          case 'inquiry':
            setInquiries(res.data); // 문의 내역 저장
            break;

          default:
            console.warn("알 수 없는 탭입니다:", activeTab);
        }
      }
    }catch (e) {
      console.error("데이터 가져오기 실패:", e);
    } finally {
      setIsReady(true);
    }
  }


  const handleDelete = (id)=>{
    const targetNames = {
      review: "리뷰",
      inquiry: "문의",
      wishlist: "찜 항목"
    };
    requestDelete(`/api/${activeTab}/delete/${id}`, `${targetNames[activeTab]}`,
        () => nav(0));

  }

  if (!isReady) {
    return <div className="loading">로딩 중...</div>;
  }
  if(!user){
    alert("로그인 후 이용 가능합니다.");
    nav("/");
  }

  return (
    <div className="mypage-container">
      {/* 사이드바 */}
      <nav className="sidebar">
        <ul>
          <li className={`menu-item ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => setActiveTab('info')}>내 정보</li>
          <li className={`menu-item ${activeTab === 'review' ? 'active' : ''}`}
              onClick={() => setActiveTab('review')}>내 리뷰</li>
          <li className={`menu-item ${activeTab === 'wishlist' ? 'active' : ''}`} 
              onClick={() => setActiveTab('wishlist')}>찜 목록</li>
          <li className={`menu-item ${activeTab === 'inquiry' ? 'active' : ''}`} 
              onClick={() => setActiveTab('inquiry')}>내 문의</li>
        </ul>
      </nav>

      {/* 컨텐츠 영역 */}
      <main className="content-area">
        {activeTab === 'info' &&
          <MyPageUserInfo user={user} logout={logout}/>
        }
        {activeTab === 'review' &&
          <MyPageReview reviews={reviews} onDelete={handleDelete}/>
        }
        {activeTab === 'wishlist' &&
          <MyPageWishlist wishlists={wishlists}/>
        }
        {activeTab === 'inquiry' &&
          <MyPageInquiry inquiries={inquiries} onDelete={handleDelete}/>
        }
      </main>
    </div>
  );
};

export default MyPage;