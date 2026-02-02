// EventListPage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { EventMovieList, EventMdList } from '../common/EventListPage/index';

import './EventListPage.css';

const EventListPage = () => {
  const [isReady, setIsReady] = useState(false);
  const [evMovie, setEvMovie] = useState([]);
  const [evMd, setEvMd] = useState([]);
  const [text, setText] = useState('');
  const [today, setToday] = useState(new Date());
  const [showAllEvents, setShowAllEvents] = useState(false);
  const location = useLocation();

  const handleChangeText = (e) => setText(e.target.value);
  const handleShowMore = () => setShowAllEvents(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const movieRes = await axios.get('/data/eventMovieData.json');
      setEvMovie(movieRes.data);

      const mdRes = await axios.get('/data/eventMdData.json');
      setEvMd(mdRes.data);
    } catch (e) {
      console.error('data loading error', e);
    } finally {
      setIsReady(true);
    }
  };
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();

  const firstDay = new Date(thisYear, thisMonth, 1).toISOString().slice(0, 10);
  const lastDay = new Date(thisYear, thisMonth + 1, 0)
    .toISOString()
    .slice(0, 10);

  const handleClickPrev = () => {
    setToday(new Date(thisYear, thisMonth - 1, 1));
    setFilter('all');
  };
  const handleClickNext = () => {
    setToday(new Date(thisYear, thisMonth + 1, 1));
    setFilter('all');
  };

  const [filter, setFilter] = useState('nowEvent');

  const handleFilterChange = (e) => setFilter(e.target.value);

  const todayFormatted = today.toISOString().slice(0, 10);

  const filterAndSortEvents = (data) => {
    const textFilteredData = data.filter((item) =>
      item.movieName.includes(text)
    );

    let finalFilteredData = textFilteredData;

    if (filter === 'nowEvent') {
      finalFilteredData = textFilteredData.filter(
        (item) =>
          todayFormatted >= item.startDate && todayFormatted <= item.endDate
      );
    } else if (filter === 'startEvent') {
      finalFilteredData = textFilteredData.filter(
        (item) => todayFormatted < item.startDate
      );
    } else if (filter === 'endEvent') {
      finalFilteredData = textFilteredData.filter(
        (item) => todayFormatted > item.endDate
      );
    } else if (filter === 'all') {
      finalFilteredData = textFilteredData.filter(
        (item) =>
          (item.startDate >= firstDay && item.startDate <= lastDay) ||
          (item.endDate >= firstDay && item.endDate <= lastDay)
      );
    }
    return finalFilteredData.sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );
  };

  const filteredEvMovie = filterAndSortEvents(evMovie);
  const filteredEvMd = filterAndSortEvents(evMd);

  const displayedEvMovie = showAllEvents
    ? filteredEvMovie
    : filteredEvMovie.slice(0, 6);
  const displayedEvMd = showAllEvents ? filteredEvMd : filteredEvMd.slice(0, 6);

  if (!isReady) {
    return <div>데이터 로딩 중,,,</div>;
  }

  const showAll = location.pathname === '/eventlist';
  const showMovies = location.pathname.includes('/events/premieres');
  const showMds = location.pathname.includes('/events/goods');

  return (
    <div id="EventListPage">
      <div className="date-control">
        <p className="btnLeft">
          <button onClick={handleClickPrev}>
            <span>이전 달</span>
          </button>
        </p>
        <div className="thismonth">
          {today.toISOString().slice(5, 7)}월 이벤트
        </div>
        <p className="btnRight">
          <button onClick={handleClickNext}>
            <span>다음 달</span>
          </button>
        </p>
      </div>
      <div className="event-top">
        <div className="event-filter">
          <select value={filter} onChange={handleFilterChange}>
            <option value="nowEvent">진행중인 이벤트</option>
            <option value="startEvent">다가오는 이벤트</option>
            <option value="endEvent">끝난 이벤트</option>
            <option value="all">전체</option>
          </select>
        </div>
        <div className="event-search">
          <input
            type="text"
            placeholder="영화 제목을 입력해주세요."
            value={text}
            onChange={handleChangeText}
          />
        </div>
      </div>
      {(showAll || showMovies) && (
        <div className="EventMovie">
          <h3>시사회 이벤트</h3>
          <EventMovieList filteredEvMovie={displayedEvMovie} />
          {!showAllEvents && filteredEvMovie.length > 6 && (
            <button className="morebtn" onClick={handleShowMore}>
              시사회 더보기
            </button>
          )}
        </div>
      )}
      {(showAll || showMds) && (
        <div className="EventMd">
          <h3>굿즈 이벤트</h3>
          <EventMdList filteredEvMd={displayedEvMd} />
          {!showAllEvents && filteredEvMd.length > 6 && (
            <button className="morebtn" onClick={handleShowMore}>
              굿즈 더보기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventListPage;
