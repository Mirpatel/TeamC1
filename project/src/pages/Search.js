import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { useNavigate } from "react-router-dom";


function Search() {

    const navigate = useNavigate();
    ;






return (

<div className="input">
<label>Search for the Movie Name</label>
<input type="text" />

<button onClick={() => navigate("/Delete")}>Search</button>


</div>
 
);








}
export default Search;