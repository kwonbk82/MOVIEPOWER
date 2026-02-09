/*MainPage.jsx*/

import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import baseApi from '/public/data/api/api';

import './MainPage.css';
import 'swiper/css';
import 'swiper/css/virtual';
import {LoginPage} from "./index.js";

function MainPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [topMovies, setTopMovies] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]); // [추가] 이벤트 데이터를 저장할 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${year}.${month}.${day} ${hours}:${minutes} 기준`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    // [수정] 영화와 이벤트 데이터를 함께 불러오는 함수
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Promise.all을 사용해 여러 데이터를 동시에 요청합니다.
        const [movieResponse, movieEventsRes, mdEventsRes] = await Promise.all([
          baseApi.get('/movie/popular', {
            params: { language: 'ko-KR', region: 'KR', page: 1 },
          }),
          fetch('/data/eventMovieData.json'), // 영화 이벤트 데이터 fetch
          fetch('/data/eventMdData.json'), // 굿즈 이벤트 데이터 fetch
        ]);

        // 1. 인기 영화 데이터 처리
        setTopMovies(movieResponse.data.results.slice(0, 10));

        // 2. 이벤트 데이터 처리
        const movieEvents = await movieEventsRes.json();
        const mdEvents = await mdEventsRes.json();

        // 3. 두 종류의 이벤트를 하나의 배열로 합치기
        const allEvents = [
          ...movieEvents.map((event) => ({ ...event, type: 'movie' })),
          ...mdEvents.map((event) => ({ ...event, type: 'goods' })),
        ];

        // 4. 현재 날짜를 기준으로 진행 중인 이벤트만 필터링
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 날짜만 비교하기 위해 시간 초기화

        const filteredEvents = allEvents.filter((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          return startDate <= today && today <= endDate;
        });

        // 5. 필터링된 이벤트를 상태에 저장
        setOngoingEvents(filteredEvents);
      } catch (e) {
        console.error('데이터 로딩 중 오류 발생:', e);
        setError('정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  // 검색 실행 함수
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    // [핵심] 검색어를 URL 쿼리 파라미터로 넘겨주며 검색 결과 페이지로 이동합니다.
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  // Enter 키 입력 처리 함수
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // API로부터 받아온 데이터를 1-3위와 4-10위로 분리
  const topThreeMovies = topMovies.slice(0, 3);
  const remainingMovies = topMovies.slice(3, 10);

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return <div className="loading-message">정보를 불러오는 중...</div>;
  }

  // 에러 발생 시 표시할 UI
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  const cutOnGoingEvent = ongoingEvents.slice(0, 4);

  const handleClickPlus = () => {
    navigate('/eventlist');
  };
  return (
    <div id="MainPage">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="영화,배우 등 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-icon" onClick={handleSearch}>
            search
          </button>
        </div>

        <section className="top-movies-section">
          <div className="section-header">
            <h2>실시간 TOP 10</h2>
            <p className="current-time">{currentTime}</p>
          </div>

          <div className="top-three-movies">
            {topThreeMovies.map((movie, index) => (
              <div key={movie.id} className="movie-item">
                <span className="movie-rank">{index + 1}</span>
                <Link to={`/moviedetail/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* remaining-top-movies 부분을 Swiper로 교체합니다. */}
          <div className="remaining-top-movies">
            <Swiper
              modules={[Virtual]}
              spaceBetween={100}
              slidesPerView={4}
              virtual
            >
              {remainingMovies.map((movie, index) => (
                <SwiperSlide key={movie.id} virtualIndex={index}>
                  <div className="movie-item">
                    {/* [핵심 수정] 순위가 10일 때 'rank-10' 클래스를 추가합니다. */}
                    <p
                      className={`movie-rank ${
                        index + 4 === 10 ? 'rank-10' : ''
                      }`}
                    >
                      {index + 4}
                    </p>
                    <Link to={`/moviedetail/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="event-section">
          <div className="section-header">
            <h2>지금 진행중인 이벤트</h2>
          </div>
          <div className="event-container">
            <div className="event-list">
              {/* [핵심 수정] ongoingEvents 상태를 기반으로 이벤트 목록을 동적으로 렌더링 */}
              {ongoingEvents.length > 0 ? (
                cutOnGoingEvent.map((event) => (
                  <div key={`${event.type}-${event.id}`} className="event-item">
                    {/* 이벤트 타입에 따라 다른 링크 경로를 설정할 수 있습니다. */}
                    <Link to={`/eventdetail/${event.id}`}>
                      {/* imagePath가 배열이므로 첫 번째 이미지를 사용합니다. */}
                      <img
                        src={event.imagePath[0].replace('../public', '')}
                        alt={event.title}
                      />
                      <p className="event-title">
                        {event.movieName}
                        {` - ${
                          event.type === 'movie'
                            ? '시사회 이벤트'
                            : '굿즈 이벤트'
                        }`}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="no-events">진행중인 이벤트가 없습니다.</p>
              )}
            </div>
            <div className="event-plus">
              {/* <Link to="/eventlist">
                <img src="/icon/plus_128px.png" alt="더보기 버튼" />
                {cutOnGoingEvent.length === 4
                ? '진행중인 이벤트 더보기'
                : '이벤트 더보기'}
                </Link> */}
              <button onClick={handleClickPlus}>
                <img src="/icon/plus_128px.png" alt="해당 감독 더보기" />
                <p>
                  {cutOnGoingEvent.length === 4
                    ? '진행중인 이벤트 더보기'
                    : '이벤트 더보기'}
                </p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainPage;
