/*
import { useState, useEffect } from "react";
import { Axios } from "axios";

function Addshowtime ()  {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showtime, setShowtime] = useState('');

  useEffect(() => {
    fetch("http://localhost:4500/")
      .then((response) => response.json())
      .then((data) => setMovies(data.data));
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovieId(event.target.value);
  };

  const handleShowtimeChange = (event) => {
    setShowtime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    Axios.post('http://localhost:4500',{
        movies: movies, selectedMovieId: selectedMovieId})
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Movie:
        <select value={selectedMovieId} onChange={handleMovieChange}>
          <option value="">Select a movie</option>
          {movies && movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.Name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Showtime:
        <input type="text" value={showtime} onChange={handleShowtimeChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
export default Addshowtime;
*/
import { useState, useEffect } from "react";
import axios from "axios";

function Addshowtime() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [time, setTime] = useState(['']);

  useEffect(() => {
    axios.get("http://localhost:4500")
      .then((response) => setMovies(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovieId(event.target.value);
  };

  const handleShowtimeChange = (event, index) => {
    const newTime = [...time];
    newTime[index] = event.target.value;
    setTime(newTime);
  };

  const handleAddShowtime = () => {
    setTime([...time, '']);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:4500', {
      movies: movies,
      selectedMovieId: selectedMovieId,
      time: time.filter(time => time.trim() !== '')
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
  };
  
  const handleRemoveClick = (index) => {
    const list = [...time];
    list.splice(index, 1);
    setTime(list);
  };
  
  const handleAddClick = () => {
    setTime([...time, ""]);
  };
  
  return (
    <form onSubmit={handleSubmit}>
    <label>
      Movie:
      <select value={selectedMovieId} onChange={handleMovieChange}>
        <option value="">Select a movie</option>
        {movies && movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.Name}
          </option>
        ))}
      </select>
    </label>
    <br />
    <label>
      Showtime:
      {time.map((time, index) => (
        <div key={index}>
          <input
            type="text"
            value={time}
            onChange={(event) => handleShowtimeChange(event, index)}
          />
          <button type="button" onClick={() => handleRemoveClick(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddClick}>Add time</button>
    </label>
    <br />
    <button type="submit">Submit</button>
  </form>
  
  );
}

export default Addshowtime;
