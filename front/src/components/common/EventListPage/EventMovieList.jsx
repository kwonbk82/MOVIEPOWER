// EventMovieList.jsx

import EventListItem from './EventListItem';

import './EventList.css';

const EventMovieList = ({ filteredEvMovie }) => {
  return (
    <div className="EventList">
      <ul>
        {filteredEvMovie.length > 0 ? (
          filteredEvMovie.map((item) => (
            <EventListItem key={item.id} data={item} type="movie" />
          ))
        ) : (
          <p>이벤트가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default EventMovieList;
