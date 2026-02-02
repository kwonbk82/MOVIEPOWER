// EventListItem.jsx

import { Link } from 'react-router-dom';

import './EventListItem.css'

const EventListItem = ({ data }) => {
  return (
    <li className="EventListItem">
      <Link to={`/eventdetail/${data.id}`}>
      <p className='event-img'>
        <img src={data.imagePath[0]} alt={data.movieName} />
      </p>
        <p className="movieName">{data.movieName}</p>
        <p className='title'>{data.title}</p>
      </Link>
    </li>
  );
};

export default EventListItem;
