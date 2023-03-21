import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import {Link} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Addpay() {

    const navigate = useNavigate();
    
    const [number, setNumber] = useState("");
    const [exp_date, setExp_date] = useState("");
    
    const [ccv, setCCV] = useState("");
    const [name, setName] = useState("");
    const [exp_year , setExp_year] = useState("");


    const submit = () => {

        Axios.post('http://localhost:3050', {
           
           number: number, exp_date: exp_date,ccv: ccv, name: name, exp_year: exp_year});
           
          
           
            alert("Payment info added to your account");
            navigate("/Signin");
        
        };
    

return (

<div className="pay">
            <div className = "row">
                <label for="nameoncard">Name on Card: </label>
                <input type="text" onChange={(event) => {setName(event.target.value)}}/>
                <label for="cardnumber">Card Number: </label>
                <input type="text" onChange={(event) => {setNumber(event.target.value)}}/>
                </div>  
                <div className = "row">
                <label for="cvv">CVV: </label>
                <input type="text" onChange={(event) => {setCCV(event.target.value)}}/>
                <label for="expmon">Exp Month: </label>
                <input type="text" onChange={(event) => {setExp_date(event.target.value)}}/>
                <label for="expyear">Exp Year: </label>
                <input type="text" onChange={(event) => {setExp_year(event.target.value)}}/>
                    
                </div>
              <br/>
              <br/>
           

<button className='button' onClick={submit}>Add Payment information</button>



</div>
 
);








}
export default Addpay;