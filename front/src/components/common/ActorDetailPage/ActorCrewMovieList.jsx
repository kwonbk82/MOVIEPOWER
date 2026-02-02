// ActorCrewMovieList.jsx

import { useState, useMemo } from "react";
import ActorCrewMovieItem from "./ActorCrewMovieItem";
import "./ActorCrewMovieList.css";
const ActorCrewMovieList = ({ actor, movies }) => {
  const [select, setSelect] = useState("best");
  const [visibleCount, setVisibleCount] = useState(4);

  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
    setVisibleCount(4);
  };
  // 정렬은 state를 mutate하지 않도록 "복사 후 정렬" + useMemo
  const sortedMovies = useMemo(() => {
    const arr = [...movies];
    const dateVal = (d) => (d ? new Date(d).getTime() : 0);

    if (select === "best") {
      return arr.sort((a, b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
    }
    if (select === "latest") {
      return arr.sort(
        (a, b) => dateVal(b.release_date) - dateVal(a.release_date)
      );
    }
    // oldest
    return arr.sort(
      (a, b) => dateVal(a.release_date) - dateVal(b.release_date)
    );
  }, [movies, select]);

  // 화면에 보여줄 4개 단위 슬라이스
  const visibleMovies = useMemo(
    () => sortedMovies.slice(0, visibleCount),
    [sortedMovies, visibleCount]
  );

  const handleMore = () => {
    setVisibleCount((c) => Math.min(c + 4, sortedMovies.length));
  };

  return (
    <div id="ActorCrewMovieList">
      <p className="actor-movie">{actor.name} 제작 작품</p>
      <select value={select} onChange={handleChangeSelect}>
        <option value="best">인기순</option>
        <option value="latest">최신순</option>
        <option value="oldest">오래된순</option>
      </select>
      <ul>
        {visibleMovies.map((movie, idx) => (
          <ActorCrewMovieItem key={idx} movie={movie} />
        ))}
      </ul>
      <div className="btn">
        {visibleCount < sortedMovies.length && (
          <button className="moreBtn" onClick={handleMore}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default ActorCrewMovieList;
