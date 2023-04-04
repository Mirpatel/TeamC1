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
  const [movies, setMovies] = useState();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [time, setTime] = useState(['']);

  useEffect(() => {
    axios.post("http://localhost:3001/getMovies")
      .then((response) =>{ 
         console.log(response.data);
        setMovies(response.data)})
      .catch((error) => console.log(error));

      console.log(movies);
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovieId(event.target.value);
    console.log("movie changed");
    console.log(selectedMovieId);


    //call api to get movie times --
    axios.post("http://localhost:3001/get-movie-times", {mId : event.target.value })
    .then((response) =>{ 
       console.log(response.data);
      setTime(response.data)})
    .catch((error) => console.log(error));
  };

  const handleShowtimeChange = (event, index) => {
    const newTime = [...time];
    newTime[index] = event.target.value;
    setTime(newTime);
  };

  const handleShowDateChange = (event, index) => {
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
    <div className = "containerShowTime">
      <p>MANAGE SHOWTIMES</p>
    <div className="mainDivShow">
    <form onSubmit={handleSubmit}>
      <div className = "addShow1">
    <label>
      {/* Movie: */}
      <select value={selectedMovieId} onChange={handleMovieChange}>
        <option value="">SELECT A MOVIE</option>
        {movies && movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.Name}
          </option>
        ))}
      </select>
    </label>
    <br />
    <label>
      <p className="purple">SHOWTIMES</p>
      <div className="line8"/>
      {time.map((time, index) => (
        <div className = "timeHolder" key={index}>
         <div className = "labelStuff"> 
         <p className="purple anon">DATE</p>
        
         <p className="purple anon">TIME</p></div>
        <div>
          <input
            type="text"
            value={time.date}
            onChange={(event) => handleShowDateChange(event, index)}
          />
          <input
            type="text"
            value={time.time}
            onChange={(event) => handleShowtimeChange(event, index)}
          />
          </div>
          <button type="button" className="buttonReprise2" onClick={() => handleRemoveClick(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="buttonReprise2"  onClick={handleAddClick}>Add time</button>
    </label>
    </div>
    <br />
    <button type="submit" className="buttonReprise" >Submit</button>
  </form>
  </div>
  </div>
  );
}

export default Addshowtime;
