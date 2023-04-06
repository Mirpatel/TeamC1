
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signin() {
    const [nameCon, setNameCon] = useState("");
    const [promo, setPromo] = useState("");
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    let navigate = useNavigate();
    const [LoginStatus, setLoginStatus] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
   
    useEffect(()=> {
   console.log(promo);
        console.log(localStorage.getItem("token"));
        // localStorage.setItem("token", "beepboop");
           Axios.get('http://localhost:8080/api/auth/token', {
         headers: {
           'x-access-token': localStorage.getItem("token")
         }
       })
       .then(function (response) {
         console.log(response);
         if (response.status === 200) {
           navigate("/");
          setLoginStatus("true");
          console.log("worked");
         }
       })
       .catch(function (error) {
         console.log(error);
       });
        },[])

      
    const submit = () => {
       console.log("pressed submit");
 
  
        Axios.post('http://localhost:8080',{
           email: email, Password: Password, Promo: promo}).then((response) => {
             if (response.data.redirectTo) {
            navigate(response.data.redirectTo);
          } else {
            setLoginStatus(response.data[0]);
          }
          
            localStorage.setItem("token", response.data.accessToken);
  

           })
           .catch(function (error) {
            console.log(error);
          });
           
           
           
        };
        
return(
<div className = "signInContainer">
    <div className="input">
    <label className="purple">EMAIL</label>
    <input type="text" onChange={(event) => {setEmail(event.target.value)}}/>
    
    <label className="purple">PASSWORD</label>
    <input type="Password" onChange={(event) => {setPassword(event.target.value)}}/>
    <div className='Checkbox'>
<label for="promo" className="purple" >REMEMBER ME</label>
<input type="checkbox" id="promo" name="promo" onChange={(event) => {setPromo(event.target.checked)}}/>
</div>
    <a href={'./forgotPassword'} className = "purple anon">Forgot Password</a> 

    <br/>

    <button className = "buttonReprise" onClick={submit}>Submit</button>


        <p className="purple anon">Don't have an account?</p> 
        <a href={'./createAccount'} className="purple anon">Create one!</a> 
    </div>
    </div>
//<h1> LoginStatus</h1>
//
);







}
export default Signin;




