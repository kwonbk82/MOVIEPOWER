// EventMdList.jsx

import EventListItem from './EventListItem';

import './EventList.css';

const EventMdList = ({ filteredEvMd }) => {
  return (
    <div className="EventList">
      <ul>
        {filteredEvMd.length > 0 ? (
          filteredEvMd.map((item) => (
            <EventListItem key={item.id} data={item} type="md" />
          ))
        ) : (
          <p>이벤트가 없습니다.</p>
        )}
      </ul>
    </div>
  );
};

export default EventMdList;
