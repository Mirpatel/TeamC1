import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { useNavigate } from "react-router-dom";


function Edit() {

   let navigate = useNavigate();

const [name, setName] = useState("");
const [date, setDate] = useState("");
const [trailer, setTrailer] = useState("");
const [description, setDescription] = useState("");
const [url, setUrl] = useState("");
const [Rating, setRating] = useState("");
const [genre, setGenre] = useState("");
const [movierating, setMovieRating] = useState("");


const submit = () => {
if ( movierating === "" || Rating === "" || genre === "" || name === "" || date === "" || trailer === "" || description === "" || url === "") {
   alert("Please enter all fields");
}
else {
Axios.post('http://localhost:3003', {
   
   movierating: movierating, Rating: Rating,genre: genre, name: name, date: date, trailer: trailer, description: description, url: url});
   alert("Movie Added!");
   navigate('/Admin');

}
};

return (

<div className="input">
<label className= "purple">NAME</label>
<input type="text" onChange={(event) => {setName(event.target.value)}}/>
<label className= "purple">DATE OF RELEASE</label>
<input type="text" onChange={(event) => {setDate(event.target.value)}}/>
<label className= "purple">TRAILER URL</label>
<input type="text" onChange={(event) => {setTrailer(event.target.value)}}/>
<label className= "purple"> IMAGE URL</label>
<input type="text" onChange={(event) => {setUrl(event.target.value)}}/>
<label className= "purple">DESCRIPTION</label>
<input type="text" onChange={(event) => {setDescription(event.target.value)}}/>

<label className= "purple">GENRE</label>
<input type="text" onChange={(event) => {setGenre(event.target.value)}}/>
<label className= "purple">RATING</label>
<input type="text" onChange={(event) => {setRating(event.target.value)}}/>
<label className= "purple">MPAA MOVIE RATING</label>
<input type="text" onChange={(event) => {setMovieRating(event.target.value)}}/>
<button className = "buttonReprise" onClick={submit}>Add Movie</button>
<p className= "anon purple">Click below to delete or update Movies</p>
<a href={'./Search'} className= "anon purple">Search for the Movie</a> 

</div>
 
);








}
export default Edit;