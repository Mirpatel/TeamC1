import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";


function ForgotPassword() {
    const [nameCon, setNameCon] = useState("");
    const [verify, setVerify] = useState(false);
    let navigate = useNavigate();
    
    const submit = () => {

        setVerify(true);
        Axios.post('http://localhost:3001', {
           
           name: nameCon}).then((response) => {
            if (response.data.message) {
                
            } else {
               


            }

           });

           Axios.post('http://localhost:8080/send-password-reset-email', {
           
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