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


const submit = () => {

Axios.post('http://localhost:3003', {
   
   Rating: Rating,genre: genre, name: name, date: date, trailer: trailer, description: description, url: url});
   alert("Movie Added!");
   navigate('/Admin');


};

return (

<div className="input">
<label>name</label>
<input type="text" onChange={(event) => {setName(event.target.value)}}/>
<label>Date of Release</label>
<input type="text" onChange={(event) => {setDate(event.target.value)}}/>
<label>Trailer URL</label>
<input type="text" onChange={(event) => {setTrailer(event.target.value)}}/>
<label> Image URL</label>
<input type="text" onChange={(event) => {setUrl(event.target.value)}}/>
<label>Description</label>
<input type="text" onChange={(event) => {setDescription(event.target.value)}}/>

<label>Genre</label>
<input type="text" onChange={(event) => {setGenre(event.target.value)}}/>
<label>Rating</label>
<input type="text" onChange={(event) => {setRating(event.target.value)}}/>
<button className = "buttonReprise" onClick={submit}>Add Movie</button>
<p>Click below to delete or update Movies</p>
<a href={'./Search'}>Search for the Movie</a> 

</div>
 
);








}
export default Edit;