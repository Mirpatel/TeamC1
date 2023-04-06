import { useState } from "react";
import NowPlayingCard from "./NowPlayingCard";
import "./style/layout.css";
import {RiArrowLeftSFill} from 'react-icons/ri';
import {RiArrowRightSFill} from 'react-icons/ri';
import MovieCard from "./MovieCard";
const Layout = (props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  const items = props.items || [];

  const handleNext = () => {
    if (endIndex + 4 <= items.length) {
      setStartIndex(startIndex + 4);
      setEndIndex(endIndex + 4);
    }
  };

  const handlePrev = () => {
    if (startIndex >= 4) {
      setStartIndex(startIndex - 4);
      setEndIndex(endIndex - 4);
    }
  };

  return (
    <>
    <div className = "layoutContainer">
      <div className="movieList-arrows">
        <RiArrowLeftSFill className="arrows" onClick={handlePrev} />
      </div>

      <div className="movieList-container">
        <ul className="movieList">
          {items.slice(startIndex, endIndex + 1).map((place) => (
            <MovieCard
              key={place.id}
              Name={place.Name}
              Url={place.Url}
              description={place.description}
              rating={place.rating}
              trailer={place.trailer}
              genre={place.genre}
              movierating={place.movierating}
            />
          ))}
        </ul>
      </div>

      <div className="movieList-arrows">
        <RiArrowRightSFill className="arrows" onClick={handleNext} />
      </div>
      </div>
    </>
  );
};

export default Layout;