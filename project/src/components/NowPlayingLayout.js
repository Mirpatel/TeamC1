import { useState } from "react";
import NowPlayingCard from "./NowPlayingCard";
import "./style/layout.css";
import {RiArrowLeftSFill} from 'react-icons/ri';
import {RiArrowRightSFill} from 'react-icons/ri';
const NowPlayingLayout = (props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const items = props.items || [];

  const handleNext = () => {
    if (endIndex + 3 <= items.length) {
      setStartIndex(startIndex + 3);
      setEndIndex(endIndex + 3);
    }
  };

  const handlePrev = () => {
    if (startIndex >= 3) {
      setStartIndex(startIndex - 3);
      setEndIndex(endIndex - 3);
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
            <NowPlayingCard
              key={place.id}
              index = {place.id}
              Name={place.Name}
              Url={place.Url}
              description={place.description}
              rating={place.rating}
              trailer={place.trailer}
              genre={place.genre}
              movierating={place.movierating}
              producer = {place.producer}
              cast = {place.cast}
              director = {place.director}
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

export default NowPlayingLayout;