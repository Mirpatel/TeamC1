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
    






return (

<div className="pay">
            <div className = "row">
                <label for="nameoncard">Name on Card: </label>
                <input type="text" id="nameoncard" name="nameoncard"></input> <br />
                <label for="cardnumber">Card Number: </label>
                <input type="text" id="cardnumber" name="cardnumber"></input> <br />
                </div>  
                <div className = "row">
                <label for="cvv">CVV: </label>
                <input type="text" id="cvv" name="cvv"></input>
                <label for="expmon">Exp Month: </label>
                <input type="text" id="expmon" name="expmon"></input>
                <label for="expyear">Exp Year: </label>
                <input type="text" id="expyear" name="expyear"></input>
                </div>
              <br/>
              <br/>
           

<button className='button' onClick={() => {
    alert("Payment info added to your account");
    navigate("/Signin");}}>Add Payment information</button>


</div>
 
);








}
export default Addpay;