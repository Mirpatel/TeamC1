import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";


function ForgotPassword() {
    const [nameCon, setNameCon] = useState("");
    let navigate = useNavigate();
    
    const submit = () => {
        var element = document.getElementById("passwordEmail");
        var newDiv = document.createElement("div");
        newDiv.classList.add("input");
        var text = document.createElement("p");
        var back = document.createElement("a");
        back.innerHTML = "Back to sign in";
        back.setAttribute("href", "/signin");
        text.innerHTML = "Email sent to " + nameCon;
        newDiv.appendChild(text);
        newDiv.appendChild(back);
        element.appendChild(newDiv);
        
        Axios.post('http://localhost:3001', {
           
           name: nameCon}).then((response) => {
            if (response.data.message) {
                
            } else {
               


            }

           });

        };

return(
<div id = "passwordEmail">
    <div className="input">
    <label>Enter your email address</label>
    <input type="text" onChange={(event) => {setNameCon(event.target.value)}}/>
    

    <button className = "button"onClick={submit}>Submit</button>

    </div>
    </div>
//<h1> LoginStatus</h1>
);







}
export default ForgotPassword;