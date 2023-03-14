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
const [desc, setDesc] = useState("");

const submit = () => {

Axios.post('http://localhost:3001', {
   
   name: name, date: date, trailer: trailer, desc: desc});
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
<label>Password</label>
<input type="text" onChange={(event) => {setDesc(event.target.value)}}/>
<label>Rating</label>
<input type="text" />
<button className = "buttonReprise" onClick={submit}>Add Movie</button>
<p>Click below to delete or update Movies</p>
<a href={'./Search'}>Search for the Movie</a> 

</div>
 
);








}
export default Edit;