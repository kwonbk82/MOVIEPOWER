// MovieListPage.jsx
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MovieListTop3, SortedMovieList } from '../common/MovieListPage';
import { useEffect, useState } from 'react';
import baseApi from '/public/data/api/api';
import './MovieListPage.css';

const movieGenre = [
    { id: 28, name: '액션' },
    { id: 12, name: '모험' },
    { id: 16, name: '애니메이션' },
    { id: 35, name: '코미디' },
    { id: 80, name: '범죄' },
    { id: 99, name: '다큐멘터리' },
    { id: 18, name: '드라마' },
    { id: 10751, name: '가족' },
    { id: 14, name: '판타지' },
    { id: 36, name: '역사' },
    { id: 27, name: '공포' },
    { id: 10402, name: '음악' },
    { id: 9648, name: '미스터리' },
    { id: 10749, name: '로맨스' },
    { id: 878, name: 'SF' },
    { id: 10770, name: 'TV 영화' },
    { id: 53, name: '스릴러' },
    { id: 10752, name: '전쟁' },
    { id: 37, name: '서부' },
];
const MovieListPage = () => {
    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const genre = searchParams.get('genre');
    const currentPage = searchParams.get('page') || '1';
    const numGenre = Number(genre);
    const [movieSort, setMovieSort] = useState('primary_release_date.desc');
    const [isReady, setIsReady] = useState(false);
    const [movie, setMovie] = useState([]);
    const [movieTop, setMovieTop] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const filteredGenreId = movieGenre.filter((gen) => gen.id === numGenre);

    useEffect(() => {
        if (!searchParams.has('page')) {
            setSearchParams({ genre, page: '1' });
        }
        fetchMovie();
    }, [currentPage, genre, movieSort]);
    useEffect(() => {
        fetchTopMovie();
    }, [genre]);

    const fetchMovie = async () => {
        setIsReady(false);
        try {
            const res = await baseApi.get(
                `/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${currentPage}&sort_by=${movieSort}&with_genres=${genre}&vote_count.gte=200`
            );

            const data = await res.data.results;
            const total =
                res.data.total_pages > 500 ? 500 : res.data.total_pages;
            setMovie(data);
            setTotalPage(total);
        } catch (e) {
            console.error('데이터 로딩 실패 :', e);
        } finally {
            setIsReady(true);
        }
    };
    const fetchTopMovie = async () => {
        try {
            const res1 = await baseApi.get(
                `/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=vote_average.desc&with_genres=${genre}&vote_count.gte=200`
            );
            const topData = res1.data.results;
            setMovieTop(topData);
        } catch (e) {
            console.error('상위 영화 데이터 로딩 실패 :', e);
        }
    };

    // 페이지 이동 핸들러
    const handlePageChange = (newPage) => {
        nav(`/movielist?genre=${genre}&page=${newPage}`);
    };
    // 정렬 변경 핸들러

    const handleSortChange = (e) => {
        setMovieSort(e.target.value);
    };
    //페이지 내비게이션 로직
    const getPaginationPages = () => {
        const pageNumbers = [];
        const maxPagesToShow = 10;
        const current = Number(currentPage);

        // 첫 페이지와 생략 기호
        if (current > 5) {
            pageNumbers.push(1);
            if (current > 6) {
                pageNumbers.push('...');
            }
        }

        // 현재 페이지 주변의 페이지들
        let startPage = Math.max(1, current - 4);
        let endPage = Math.min(totalPage, current + 5);

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
        if (current < totalPage - 5) {
            if (current < totalPage - 6) {
                pageNumbers.push('...');
            }
            if (!pageNumbers.includes(totalPage)) {
                pageNumbers.push(totalPage);
            }
        }

        return pageNumbers;
    };

    if (!isReady) {
        return <div>데이터 로딩 중 ...</div>;
    }
    return (
        <div id="MovieListPage">
            <div className="movielist-top">
                <h2>
                    {filteredGenreId.length > 0 &&
                        `${filteredGenreId[0].name}`}
                </h2>

                <div className="nav">
                    <p>장르</p>
                    <p> &gt; </p>
                    <p>
                        {filteredGenreId.length > 0 && filteredGenreId[0].name}
                    </p>
                </div>
            </div>
            <MovieListTop3 movie={movieTop} />
            <select
                name="sort"
                id="sort"
                onChange={handleSortChange}
                value={movieSort}
            >
                <option value="vote_average.desc">인기순</option>
                <option value="primary_release_date.desc">최신순</option>
            </select>
            <SortedMovieList movie={movie} />
            <div className="pagination">
                {Number(currentPage) > 1 && (
                    <button
                        onClick={() => {
                            if (Number(currentPage) > 10) {
                                handlePageChange(Number(currentPage) - 10);
                            } else {
                                
                                handlePageChange(1);
                            }
                        }}
                        disabled={Number(currentPage) <= 1} 
                    >
                        이전
                    </button>
                )}

                {getPaginationPages().map((pageNum) =>
                    pageNum === '...' ? (
                        <span key={pageNum} className="pagination-ellipsis">
                            ...
                        </span>
                    ) : (
                        <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            style={{
                                fontWeight:
                                    pageNum === Number(currentPage)
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            {' '}
                            {pageNum}
                        </button>
                    )
                )}

                {Number(currentPage) < totalPage && (
                    <button
                        onClick={() => {
                            if (Number(currentPage) < totalPage - 9) {
                                handlePageChange(Number(currentPage) + 10);
                            } else {
                                
                                handlePageChange(totalPage);
                            }
                        }}
                        disabled={Number(currentPage) >= totalPage} 
                    >
                        다음
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieListPage;
