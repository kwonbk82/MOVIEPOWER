import {useEffect, useState} from 'react';

import './MyPage.css';
import axios from "axios";
import baseApi from "../../../public/data/api/api.js";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [user,setUser] = useState("");
  const [reviews,setReviews] = useState([]);
  const [wishlists,setWishlists] = useState("");
  const [inquiries,setInquiries] = useState("");

  // 데이터 샘플 (실제로는 API에서 가져오겠지?)
  const data = {
    // review: [
    //   { id: 1, movie: "조커", text: "호아킨 피닉스의 연기가 압도적임.", score: 5 },
    //   { id: 2, movie: "테넷", text: "한 번 봐서는 이해가 안 가네요..", score: 3.5 }
    // ],
    wishlist: ["듄: 파트2", "오펜하이머", "스파이더맨: 뉴 유니버스"],
    // inquiries: [
    //   { id: 1, title: "포인트 환불 문의", date: "2024-03-01", status: "답변완료" },
    //   { id: 2, title: "계정 보안 관련", date: "2024-03-05", status: "처리중" }
    // ]
  };

  useEffect(()=>{

    userInfo();
  },[activeTab]);

  const userInfo = async ()=>{
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
      console.error("데이터 가져오기 실패:", e);    }
  }
  console.log(reviews);

  if (!user) {
    return <div className="loading">로딩 중...</div>;
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
        {activeTab === 'info' && (
          <section>
            <h3 className="content-title">👤 내 정보</h3>
            <div className="info-card">
              <p><strong>사용자명:</strong>{user.name}</p>
              <p><strong>이메일:</strong>{user.email}</p>
              <p><strong>닉네임:</strong>{user.nickName}</p>
              <p><strong>성별:</strong>{user.gender==="MALE" ? "남" : "여"}</p>
              <p><strong>생일:</strong>{user.birthDate}</p>
              <p><strong>가입일:</strong>{user.regTime}</p>
            </div>
          </section>
        )}

        {activeTab === 'review' && (
          <section>
            <h3 className="content-title">✍️ 내가 쓴 리뷰</h3>
            {reviews.map((r,index) => (
              <div key={r.id} className="info-card review-item">
                <h4>
                  <span className="review-number">{index + 1}. </span>
                  {r.title}
                  <span className="rating">★ {r.star}</span>
                </h4>
                <p>{r.content}</p>
              </div>
            ))}
          </section>
        )}

        {activeTab === 'wishlist' && (
          <section>
            <h3 className="content-title">❤️ 찜 목록</h3>
            <div className="info-card">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {data.wishlist.map((item, i) => (
                  <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #333' }}>
                    🎬 {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeTab === 'inquiry' && (
          <section>
            <h3 className="content-title">❓ 내 문의 현황</h3>
            {inquiries.map(q => (
              <div key={q.id} className="info-card" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{q.title} <small style={{ color: '#888' }}>({q.date})</small></span>
                <span className={`status-badge ${q.process === 1 ? 'status-done' : 'status-wait'}`}>
                  {q.process === 1 ? "처리됨" : "미처리"}
                </span>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default MyPage;