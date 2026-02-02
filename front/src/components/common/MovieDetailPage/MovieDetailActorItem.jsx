// MovieDetailActorItem.jsx
import { Link } from 'react-router-dom';
import "./MovieDetailActorItem.css";

const MovieDetailActorItem = ({people,genre}) => {
    const distribute = genre.id === 16 ? '성우' : '배우';
    return (
        <div id="MovieDetailActorItem">
            <Link to={`/actordetail/${people.id}`}>
                <img className='detail-actor-img' src={people.profile_path ?`https://image.tmdb.org/t/p/w185${people.profile_path}` :"/img/img_loading.png"} alt="배우사진" />
                <p className='detail-actor-name'>{people.name}</p>
                <p className='detail-actor-job'>{people.job ? '감독' : distribute}</p>
            </Link>
        </div>
    );
};
export default MovieDetailActorItem;
