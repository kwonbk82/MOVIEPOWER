// SearchResultPage.jsx

import { useState, useRef, useEffect, use } from "react";
import { useSearchParams } from "react-router-dom";
import SearchMovieListPage from "./SearchMovieListPage";
import SearchActorListPage from "./SearchActorListPage";
import "./SearchResultPage.css";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [page, setPage] = useState("movie");

  const movieRef = useRef();
  const actorRef = useRef();

  const handleClickPage = (e) => {
    setPage(e.target.value);
  };
  useEffect(() => {
    if (page === "movie") {
      movieRef.current.classList.add("active");
      actorRef.current.classList.remove("active");
    } else {
      actorRef.current.classList.add("active");
      movieRef.current.classList.remove("active");
    }
  }, [page]);

  return (
    <div id="SearchResult">
      <div className="search-result">
        <h1>
          "<span>{query}</span>" 검색 결과입니다.
        </h1>
      </div>
      <div className="search-movie-actor">
        <div className="page-btn">
          <button
            className="search-movie-btn active"
            value="movie"
            onClick={handleClickPage}
            ref={movieRef}
          >
            영화
          </button>
          <button
            className="search-actor-btn"
            value="actor"
            onClick={handleClickPage}
            ref={actorRef}
          >
            인물
          </button>
        </div>
        {page === "movie" ? (
          <SearchMovieListPage query={query} />
        ) : (
          <SearchActorListPage query={query} />
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
