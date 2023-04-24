
import { useState, useEffect } from "react";
import axios from "axios";

function Addshowtime() {
  const [movies, setMovies] = useState();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [time1, setTime1] = useState();
  const [time, setTime] = useState(['']);
  const [date, setDate] = useState();
const [addTime, setAddTime] = useState(false);
const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    axios.post("http://localhost:3001/getMovies")
      .then((response) =>{ 
         console.log(response.data);
        setMovies(response.data)})
      .catch((error) => console.log(error));

      console.log(movies);
  }, [refresh]);

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
    
   
    setTime1(event.target.value);
  };

  const handleShowDateChange = (event, index) => {

   
    setDate(event.target.value);
  };

  const handleAddShowtime = () => {
    //need to check if already exists first
    console.log(time1);
    console.log(date);
    axios.post('http://localhost:3001/showtime-exists', {
     time: time1, date: date
     })
     .then((response) => {
      console.log(response.data);
      if (response.data === true) {

        alert("This date and time is taken!");
      }
      else {
            axios.post('http://localhost:3001/add-showtime', {
      mId : selectedMovieId, time: time1, date: date
     })
     .then((response) => {
      
      console.log(response)
      
    })
     .catch((error) => console.log(error));
     alert("Time added!");
      }
      //if response.data = exists or whatever then alert(movie time taken)
      //else put api call here
    })
     .catch((error) => console.log(error));

    // axios.post('http://localhost:3001/add-showtime', {
    //   mId : selectedMovieId, time: time1, date: date
    //  })
    //  .then((response) => console.log(response))
    //  .catch((error) => console.log(error));
 
    setRefresh(!refresh);
   
    // setAddTime(false);
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
  
  const handleRemoveClick = (timeId) => {
    //delete API call here then remount
    console.log(timeId);
    axios.post('http://localhost:3001/delete-showtime', {
     timeId: timeId
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

   setRefresh(!refresh);
   alert("Time removed!");
  };
  
  const handleAddClick = () => {
   setAddTime(true);
    // setTime([...time, ""]);
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
    <label className="margin0">
      <p className="purple">SHOWTIMES</p>
      <div className="line8"/>
      {time.map((time, index) => (
        <div className = "timeHolder" key={index}>
         <div className = "labelStuff"> 
         <p className="purple anon">DATE</p>
        
         <p className="purple anon">TIME</p></div>
        <div>
          <div className="line9"/>
        <div className = "labelStuff"> 
        <p>{time.date && time.date.slice(0, 10)}</p>
        <p className="timeMapped">{time.time}</p>
        </div>
          </div>
          <button type="button" className="buttonReprise2" onClick={() => handleRemoveClick(time.sid)}>Remove</button>
        </div>
      ))}
      <button type="button" className="buttonReprise2"  onClick={handleAddClick}>NEW TIME</button>
      {addTime && (
                <div className = "timeHolder">
                <div className = "labelStuff"> 
                <p className="purple anon">DATE</p>
               
                <p className="purple anon">TIME</p></div>
               <div>
               <div className = "labelStuff"> 
                 <input
                   type="text"
                   className = "timeInp"
                   onChange={(event) => handleShowDateChange(event)}
                 />
                 <input
                   type="text"
                    className = "timeInp"
                   onChange={(event) => handleShowtimeChange(event)}
                 />
                 </div>
                 </div>
                 <button type="button" className="buttonReprise2" onClick={handleAddShowtime}>ADD TIME</button>
               </div>
      )}
    </label>
    </div>
    <br />
  </form>
  </div>
  </div>
  );
}

export default Addshowtime;


