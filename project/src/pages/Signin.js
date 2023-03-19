import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Navigate, useNavigate } from "react-router-dom";


function Signin() {
    const [nameCon, setNameCon] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    let navigate = useNavigate();
    const [LoginStatus, setLoginStatus] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
   
   

      
   
    
    const submit = () => {
       
        Axios.post('http://localhost:5000',{
           email: email, Password: Password}).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0]);


            }
            if (isAdmin) {
                navigate('/admin')
               }
               else {
               navigate('/');
               }

           });
         
           
        };
        

return(

    <div className="input">
    <label>Email</label>
    <input type="text" onChange={(event) => {setEmail(event.target.value)}}/>
    
    <label>Password</label>
    <input type="Password" onChange={(event) => {setPassword(event.target.value)}}/>
    <div className='Checkbox'>
<label for="promo">Remember me</label>
<input type="checkbox" id="promo" name="promo" />
</div>
    <a href={'./forgotPassword'}>Forgot Password</a> 

    <br/>

    <button className = "button"onClick={submit}>Submit</button>


        <p>Don't have an account?</p> 
        <a href={'./createAccount'}>Create one!</a> 
    </div>
//<h1> LoginStatus</h1>
//
);







}
export default Signin;



