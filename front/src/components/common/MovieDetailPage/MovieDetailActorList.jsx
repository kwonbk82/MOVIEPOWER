// MovieDetailActorList.jsx

import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

import MovieDetailActorItem from './MovieDetailActorItem';

import './MovieDetailActorList.css';

const MovieDetailActorList = ({ genre, cast, director }) => {
    const cutCast = cast.slice(0, 20);
    const people = [...director, ...cutCast];
    
    return (
        <div id="MovieDetailActorList">
            <Swiper
                modules={[Virtual]}
                spaceBetween={10}
                slidesPerView={5}
                virtual
            >
                {people.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <MovieDetailActorItem genre={genre} people={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieDetailActorList;
