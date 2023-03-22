import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [verify, setVerify] = useState(false);
    let navigate = useNavigate();
    
    const submit = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( !re.test(email) ) {
            alert("Please enter a valid email address");
         
        }
        else {
            setVerify(true);
        }
       
        Axios.post('http://localhost:3001', {
           
           email: email}).then((response) => {
            if (response.data.message) {
                
            } else {
               


            }

           });

           Axios.post('http://localhost:8080/send-password-reset-email', {
           
            name: 'gord', email: 'jordynfulbright@gmail.com'}).then((response) => {
             if (response.data.message) {
                 
             } else {
                
 
 
             }
             
            });

        };

        

return(
<div id = "passwordEmail">
    <div className="input">
    <label>Enter your email address</label>
    <input type="text" onChange={(event) => {setEmail(event.target.value)}}/>
    

    <button className = "button"onClick={submit}>Submit</button>
    {verify && (
    <div className = "container">
        <p>Password reset email sent to <u>{email}</u> </p>
    </div>

    )}


    </div>
    </div>
//<h1> LoginStatus</h1>
);







}
export default ForgotPassword;