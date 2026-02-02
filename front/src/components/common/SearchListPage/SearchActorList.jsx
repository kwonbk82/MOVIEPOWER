// SearchActorList.jsx

import SearchActorItem from "./SearchActorItem";
import "./SearchActorList.css";
const SearchActorList = ({ actors, tDept }) => {
  return (
    <div id="SearchActorList">
      <ul className="search-list">
        {actors.map((actor) => (
          <SearchActorItem key={actor.id} actor={actor} tDept={tDept} />
        ))}
      </ul>
    </div>
  );
};

export default SearchActorList;
