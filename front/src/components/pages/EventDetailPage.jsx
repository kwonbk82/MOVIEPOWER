// EventDetailPage.jsx

import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseApi from '/public/data/api/api';
import './EventDetailPage.css';

const EventDetailPage = () => {
  const { id } = useParams();
  const numId = Number(id);

  const [isReady, setIsReady] = useState(false);
  const [evMovie, setEvMovie] = useState([]);
  const [evMd, setEvMd] = useState([]);

  const [imgIdx, setimgIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const foundMovie = evMovie.find((item) => item.id === numId);
  const foundMd = evMd.find((item) => item.id === numId);
  const foundData = foundMovie || foundMd;

  useEffect(() => {
    if (foundData && foundData.movieId) {
      fetchMovie();
    }
  }, [foundData]);

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

  const fetchMovie = async () => {
    setIsReady(false);
    try {
      const res1 = await baseApi.get(`/movie/${foundData.movieId}`);
      const data = await res1.data;
      const res3 = await baseApi.get(`/movie/${foundData.movieId}/credits`);

      const castData = await res3.data.cast;
      const crewData = await res3.data.crew;

      setMovie(data);
      setCast(castData);
      setCrew(crewData);
    } catch (e) {
      console.error('데이터 로딩 실패 :', e);
    }
  };

  const director = crew.filter((item) => item.job === 'Director');

  if (!isReady) {
    return <div>데이터 로딩 중,,,</div>;
  }

  if (!foundData) {
    return (
      <div className="EventDetailPageNone">
        <div className="event-none">
          <h1>데이터를 찾을 수 없습니다. 😢</h1>
          <p>존재하지 않는 이벤트 페이지 입니다.</p>
        </div>
      </div>
    );
  }

  const isMovieEvent = !!foundMovie;
  const eventTitleText = `${foundData.movieName}${'\u00A0'} -${'\u00A0'} ${
    isMovieEvent ? '시사회 이벤트' : '굿즈 이벤트'
  }`;

  const images = foundData.imagePath;

  const goToPrev = () => {
    setimgIdx((prevIdx) => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
  };

  const goToNext = () => {
    setimgIdx((prevIdx) => (prevIdx === images.length - 1 ? 0 : prevIdx + 1));
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalImgIdx(imgIdx);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevModal = () => {
    setModalImgIdx((prevIdx) =>
      prevIdx === 0 ? images.length - 1 : prevIdx - 1
    );
  };

  const goToNextModal = () => {
    setModalImgIdx((prevIdx) =>
      prevIdx === images.length - 1 ? 0 : prevIdx + 1
    );
  };

  const cutCast = cast.slice(0, 4);
  const people = [...director, ...cutCast];

  // console.log(movie.genres[0].name)

  return (
    <div id="EventDetailPage">
      <div className="event-name">{eventTitleText}</div>
      <div className="event-container">
        <div className="event-img-gallery">
          <button className="nav-button prev" onClick={goToPrev}>
            &lt;
          </button>
          <img
            src={images[imgIdx]}
            alt={foundData.movieName}
            onClick={openModal}
          />
          <button className="nav-button next" onClick={goToNext}>
            &gt;
          </button>
        </div>
        <div className="event-information">
          <div className="event-actor">
            <h3>참여 출연진 및 MC</h3>
            <div className="event-people">
              {people.map((item, idx) => (
                <li key={idx}>
                  <Link to={`/actordetail/${item.id}`}>
                    <img
                      className="detail-actor-img"
                      src={
                        item.profile_path
                          ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
                          : '/img/img_loading.png'
                      }
                      alt="배우사진"
                    />
                    <p className="detail-actor-name">{item.name}</p>
                    <p className="detail-actor-job">
                      {item.known_for_department}
                    </p>
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <div className="event-date">
            <h3>이벤트 날짜</h3>
            <p>
              {foundData.startDate} ~ {foundData.endDate}
            </p>
          </div>
          <div className="event-reference">
            <h3>이벤트 참여 방법</h3>
            <div className="reference">
              <p>{foundData.reference}</p>
              <a
                className="event-url"
                href={foundData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                {foundData.url}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="event-content">
        <h3>이벤트 내용</h3>
        <p>{foundData.subContent}</p>
        <p>{foundData.content}</p>
      </div>
      <div className="movie">
        <h2>영화에 대한 정보</h2>
        <div className="movie-container">
          <Link to={`/moviedetail/${movie.id}`}>
            <div className="movie-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          </Link>
          <div className="movie-info">
            <div>
              <h3>장르</h3>
              <span>{movie.genres && movie.genres[0].name}</span>
            </div>
            <div>
              <h3>개봉일</h3>
              <span>{movie.release_date}</span>
            </div>
            <div className='movie-content'>
              <h3>줄거리</h3>
              <span>{movie.overview ? movie.overview : '...'}</span>
            </div>
            <Link to={`/moviedetail/${movie.id}`}>
              <button className="morebtn">영화 정보 더보기</button>
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
            <button className="modal-nav-button prev" onClick={goToPrevModal}>
              &lt;
            </button>
            <img src={images[modalImgIdx]} alt={foundData.movieName} />
            <button className="modal-nav-button next" onClick={goToNextModal}>
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EventDetailPage;
