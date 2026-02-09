// Header.jsx

import { useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import './Header.css';
import HeaderSearchBar from './HeaderSearchBar';
import {useAuth} from "../../contexts/AuthContext.jsx";

// 재사용 가능한 드롭다운 메뉴 컴포넌트
const DropdownMenu = ({ title, to, items, dropdownClassName }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className="dropdown-menu-item"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Link to={to}>{title}</Link>
      {isVisible && (
        <ul className={`nav-dropdown ${dropdownClassName}`}>
          {items.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Header = () => {
  const { pathname } = useLocation(); // 2. 현재 경로를 가져오기 위해 useLocation 사용
  const { user, logout, loading} = useAuth();
  const nav = useNavigate();

  // 장르와 이벤트 데이터를 컴포넌트에 맞게 구조화
  const genreItems = [
    { path: '/movielist?genre=28', name: '액션' },
    { path: '/movielist?genre=16', name: '애니메이션' },
    { path: '/movielist?genre=35', name: '코미디' },
    { path: '/movielist?genre=27', name: '공포' },
    { path: '/movielist?genre=10749', name: '로맨스' },
    { path: '/movielist?genre=878', name: 'SF' },
    { path: '/movielist?genre=18', name: '드라마' },
    { path: '/movielist?genre=10402', name: '음악' },
    { path: '/movielist?genre=10751', name: '가족' },
  ];

  const eventItems = [
    { path: '/events/premieres', name: '시사회' },
    { path: '/events/goods', name: '굿즈' },
  ];

  const [isModal, setIsModal] = useState(false);
  const handleClickIsModal = () => {
    setIsModal(!isModal);
  };

  const modalClose = () => {
    setIsModal(false);
  };

  const handleLogout = async ()=>{
    const result = await logout(Email,Password);
      if(result.success) {
        alert("로그아웃 되었습니다");
        nav("/");
      }else {
        alert(result.message);
    }
  }
  if (loading) return <div>로딩 중...</div>;
  return (
    <header id="site-header">
      <div className="logo-area">
        <Link to="/" className="logo-link">
          <span className="logo1">MOVIE</span>
          <span className="logo2">RANGER</span>
        </Link>
      </div>

      <nav className="main-nav">
        <ul className="main-nav-ul">
          {/* 분리된 DropdownMenu 컴포넌트 사용 */}
          <DropdownMenu
            title="장르"
            items={genreItems}
            dropdownClassName="genre-dropdown"
          />
          <DropdownMenu
            title="이벤트"
            to="/eventlist"
            items={eventItems}
            dropdownClassName="event-dropdown"
          />

          {/* 문의 메뉴 (툴팁) */}
          <li className="tooltip-item">
            <Link to="/inguirywrite">문의</Link>
            <span className="tooltip-text">문의 작성하기</span>
          </li>
        </ul>
      </nav>

      <div className="user-menu">
        {/* 3. 현재 경로가 메인('/')이 아닐 때만 검색창을 렌더링 */}
        {pathname !== '/' && <HeaderSearchBar />}
        {user ? (
            <>
              <span className="user-name">{user.email}님</span>
              <button onClick={handleLogout}>로그아웃</button>
              <Link to="/mypage">마이페이지</Link>
            </>
        ) : (
            <>
              <button onClick={handleClickIsModal}>로그인</button>
              <Link to="/signup">회원가입</Link>
            </>
        )}
      </div>
      <div className="isModal">
        {<LoginPage isModal={isModal} modalClose={modalClose} />}
      </div>
    </header>
  );
};

export default Header;
