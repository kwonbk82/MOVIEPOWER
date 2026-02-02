// SearchMovieListPage.jsx

import { useState, useEffect } from "react";
import baseApi from "/public/data/api/api";
import { SearchMovieList } from "../common/SearchListPage";
import "./SearchMovieListPage.css";
const SearchMovieListPage = ({ query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const [current, setCurrent] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setCurrent(1);
  }, [query]);

  useEffect(() => {
    fatchData();
  }, [query, current]);

  const fatchData = async () => {
    try {
      if (!query) {
        setSearchMovies([]);
        setTotalPage(0);
        return;
      }
      setIsLoading(true);

      const respones = await baseApi.get(
        `/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${current}`
      );
      const data = respones.data.results;
      const totalPages = Math.min(respones.data.total_pages ?? 0, 500);
      setSearchMovies(data);
      setTotalPage(totalPages);
    } catch (e) {
      console.error("데이터 로딩 실패 : ", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickPage = (page) => {
    // 혹시 문자열이 들어와도 숫자로 보정
    const next = Number(page) || 1;
    if (next !== current) setCurrent(next);
  };

  const getPaginationPages = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const currentNum = Number(current);

    // 첫 페이지와 생략 기호
    if (currentNum > 5) {
      pageNumbers.push(1);
      if (currentNum > 6) {
        pageNumbers.push("...");
      }
    }

    // 현재 페이지 주변의 페이지들
    let startPage = Math.max(1, currentNum - 4);
    let endPage = Math.min(totalPage, currentNum + 5);

    // 만약 끝 페이지가 총 페이지 수와 너무 가깝다면
    if (
      endPage - startPage < maxPagesToShow - 1 &&
      totalPage > maxPagesToShow
    ) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 마지막 페이지와 생략 기호
    if (currentNum < totalPage - 5) {
      if (currentNum < totalPage - 6) {
        pageNumbers.push("...");
      }
      if (!pageNumbers.includes(totalPage)) {
        pageNumbers.push(totalPage);
      }
    }

    return pageNumbers;
  };

  if (isLoading) return <div>데이터 로딩중...</div>;
  return (
    <div id="SearchMovieListPage">
      {searchMovies.length !== 0 ? (
        <SearchMovieList searchMovies={searchMovies} />
      ) : (
        <h1>검색 결과가 없습니다.</h1>
      )}

      {totalPage > 1 && (
        <div className="pagination">
          {current > 1 && (
            <button onClick={() => handleClickPage(current - 1)}>이전</button>
          )}

          {getPaginationPages().map((pageNum) =>
            pageNum === "..." ? (
              <span key={pageNum} className="pagination-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={pageNum}
                onClick={() => handleClickPage(pageNum)}
                style={{
                  fontWeight: pageNum === Number(current) ? "bold" : "normal",
                }}
              >
                {" "}
                {pageNum}
              </button>
            )
          )}

          {current < totalPage && (
            <button onClick={() => handleClickPage(current + 1)}>다음</button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovieListPage;
