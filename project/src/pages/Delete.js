

import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Delete() {

const [name, setName] = useState("");
const [date, setDate] = useState("");
const [trailer, setTrailer] = useState("");
const [desc, setDesc] = useState("");
const navigate = useNavigate();


const submit = () => {

Axios.post('http://localhost:3001', {
   
name: name, date: date, trailer: trailer, desc: desc});
};

const update = () => {
   alert("Movie Updated!");
   navigate('/Admin');
}
const del = () => {
   alert("Movie Deleted!");
   navigate('/Admin');
}
   
   
return (

<div className="input">
<label>name</label>
<input type="text" placeholder='Avatar' onChange={(event) => {setName(event.target.value)}}/>
<label>Date of Release</label>
<input type="text" placeholder='12/25/2023' onChange={(event) => {setDate(event.target.value)}}/>
<label>Trailer URL</label>
<input type="text" placeholder='https://www.youtube.com/watch?v=d9MyW72ELq0' onChange={(event) => {setTrailer(event.target.value)}}/>
<label>Description</label>
<input type="text" placeholder='A Movie about people on a different planet' onChange={(event) => {setDesc(event.target.value)}}/>
<label>Rating</label>
<input type="text" placeholder='4.2/5'/>
<button className = "buttonReprise" onClick={del}>Delete</button>
<button  className = "buttonReprise" onClick={update}>Update</button>



</div>
 
);








}
export default Delete;