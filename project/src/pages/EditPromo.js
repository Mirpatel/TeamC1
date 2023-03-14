
import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function EditPromo() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [code, setCode] = useState("");
const navigate = useNavigate();


const submit = () => {

// Axios.post('http://localhost:3001', {
   
// name: name, date: date, trailer: trailer, desc: desc});
};

const update = () => {
   alert("Promotion Updated!");
   navigate('/Admin');
}
const del = () => {
   alert("Promotion Deleted!");
   navigate('/Admin');
}
   
   
return (

<div className="input">
<label>Title</label>
<input type="text" placeHolder = "50% off smth" onChange={(event) => {setTitle(event.target.value)}}/>
<label>Text</label>
<input type="text"  placeHolder = "some stufffff about promos here should be relatively long" onChange={(event) => {setText(event.target.value)}}/>
<label>Code</label>
<input type="text" placeHolder = "50OFF" onChange={(event) => {setCode(event.target.value)}}/>
<button className = "buttonReprise" onClick={del}>Delete</button>
<button className = "buttonReprise" onClick={update}>Update</button>



</div>
 
);








}
export default EditPromo;