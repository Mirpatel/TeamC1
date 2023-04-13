import { useState } from "react";
import MovieCard from "./MovieCard";
import "./style/layout.css";
import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

const Layout = (props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);
  const items = props.items || [];

  const handleNext = () => {
    const remainingItems = items.length - endIndex - 1;
    if (remainingItems > 0) {
      const newStartIndex = startIndex + 4;
      const newEndIndex = Math.min(endIndex + 4, items.length - 1);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const handlePrev = () => {
    if (startIndex >= 4) {
      const newStartIndex = Math.max(startIndex - 4, 0);
      const newEndIndex = newStartIndex + 3;
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    } else if (startIndex === 0 && endIndex === 3) {
      // Do nothing if we're already on the first page
    } else {
      // Display the first three items if we're on the second page
      setStartIndex(0);
      setEndIndex(2);
    }
  };

  return (
    <>
      <div className="layoutContainer">
        <div className="movieList-arrows">
          <RiArrowLeftSFill className="arrows" onClick={handlePrev} />
        </div>

        <div className="movieList-container">
          <ul className="movieList">
            {items
              .slice(startIndex, Math.min(endIndex + 1, startIndex + 4))
              .map((place) => (
                <MovieCard
                  key={place.id}
                  index={place.id}
                  Name={place.Name}
                  Url={place.Url}
                  description={place.description}
                  rating={place.rating}
                  trailer={place.trailer}
                  genre={place.genre}
                  movierating={place.movierating}
                  producer={place.producer}
                  cast={place.cast}
                  director={place.director}
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
