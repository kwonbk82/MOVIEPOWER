// SearchActorItem.jsx
import { Link } from "react-router-dom";
import "./SearchActorItem.css";
const SearchActorItem = ({ actor, tDept }) => {
  return (
    <li className="search-item">
      <Link to={`/actorDetail/${actor.id}`}>
        <img
          src={
            actor.profile_path
              ? `http://image.tmdb.org/t/p/w342/${actor.profile_path}`
              : "/img/img_loading.png"
          }
          alt={actor.name}
        />
        <div className="item-name-job">
          <p className="item-name">{actor.name}</p>
          <p className="item-job">{tDept(actor.known_for_department)}</p>
        </div>
      </Link>
    </li>
  );
};
export default SearchActorItem;
