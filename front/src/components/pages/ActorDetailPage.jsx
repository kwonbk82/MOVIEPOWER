// ActorDetailPage.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import baseApi from "/public/data/api/api";
import {
  ActorInfo,
  ActorMovieList,
  ActorCrewMovieList,
} from "../common/ActorDetailPage";
import "./ActorDetailPage.css";

const DEPT_KO = {
  Acting: "배우",
  Directing: "감독",
  Writing: "각본",
  Production: "제작",
  Editing: "편집",
  Camera: "촬영",
  Art: "미술",
  Sound: "사운드",
  Lighting: "조명",
  "Visual Effects": "시각효과",
  "Costume & Make-Up": "의상·분장",
  Crew: "스태프",
};

const ActorDetailPage = () => {
  const { id } = useParams();

  const [isLoding, setIsLoding] = useState(false);
  const [actor, setActor] = useState({});
  const [castMovies, setCastMovies] = useState([]);
  const [crewMovies, setCrewMovies] = useState([]);

  const tDept = (dept) => (dept && DEPT_KO[dept]) || dept || "";

  useEffect(() => {
    fahctData();
  }, [id]);
  const fahctData = async () => {
    try {
      const res = await baseApi.get(`/person/${id}?language=ko-KR`);
      const data = res.data;
      setActor(data);

      const respones = await baseApi.get(`/person/${id}/movie_credits`);
      if (respones.data.cast.length !== 0) {
        const castMovieData = respones.data.cast;
        const crewMovieData = respones.data.crew;
        const uniqueTitles = new Set();

        setCastMovies(castMovieData);

        const unqueCrewMoves = crewMovieData.filter((movie) => {
          if (!uniqueTitles.has(movie.title)) {
            uniqueTitles.add(movie.title);
            return true;
          }
          return false;
        });
        setCrewMovies(unqueCrewMoves);
      } else {
        const crewMovieData = respones.data.crew;
        const uniqueTitles = new Set();

        const unqueCrewMoves = crewMovieData.filter((movie) => {
          if (!uniqueTitles.has(movie.title)) {
            uniqueTitles.add(movie.title);
            return true;
          }
          return false;
        });
        setCrewMovies(unqueCrewMoves);
      }
    } catch (e) {
      console.error("데이터 로딩 실패 : ", e);
    } finally {
      setIsLoding(true);
    }
  };

  if (!isLoding) return <div>데이터 로딩중...</div>;
  return (
    <div id="ActorDetailPage">
      <ActorInfo actor={actor} tDept={tDept} />
      <div className="actorWork">
        {castMovies.length && (
          <ActorMovieList actor={actor} movies={castMovies} />
        )}
        {crewMovies.length && (
          <ActorCrewMovieList actor={actor} movies={crewMovies} />
        )}
      </div>
    </div>
  );
};

export default ActorDetailPage;
