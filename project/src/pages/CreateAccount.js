import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function CreateAccount() {

let navigate = useNavigate();
const [fname, setfName] = useState("");
const [lname, setlName] = useState("");

const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [Password, setPassword] = useState("");

const [street, setStreet] = useState("");
const [city, setCity] = useState("");
const [adressState, setAdState] = useState("");
const [zipCode, setZip] = useState("");

const [promo, setPromo] = useState(false);

const submit = () => {
let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (fname == "" || email == "" || phone == "" || Password == "" || lname == "") {
   alert("Please enter all required fields");
}

else if ( !re.test(email) ) {
        alert("Please enter a valid email address");
     
}
else {
       
Axios.post('http://localhost:3001', {
   

   fname: fname,  lname: lname, email: email, phone: phone, Password: Password});

   Axios.post('http://localhost:8080/send-verify-email', {
   
      name: "gord", email: 'jordynfulbright@gmail.com'
   });

   navigate('/verify');

};


}

return (

<div className="input">

<p className = "req">*This field is required</p>
<label>First name</label>
<input type="text" onChange={(event) => {setfName(event.target.value)}}/>
<p className = "req">*This field is required</p>
<label> Last name</label>
<input type="text" onChange={(event) => {setlName(event.target.value)}}/>


<label>email</label>
<input type="text" onChange={(event) => {setEmail(event.target.value)}} required/>
<p className = "req">*This field is required</p>
<label>phone</label>
<input type="text" onChange={(event) => {setPhone(event.target.value)}} required/>
<p className = "reqPass">*This field is required</p>
<label>Password</label>
<input type="Password" onChange={(event) => {setPassword(event.target.value)}} required/>
<div className='Checkbox'>
<label for="promo">Sign up for Promotions?</label>
<input type="checkbox" id="promo" name="promo" onChange={(event) => {setPromo(event.target.value)}}/>
<br/>
<p>Adress (optional):<br/></p>
<label>Street Address</label>
<input type="text" onChange={(event) => {setStreet(event.target.value)}}/>
<label>City</label>
<input type="text" onChange={(event) => {setCity(event.target.value)}}/>
<label>State</label>
<input type="text" onChange={(event) => {setAdState(event.target.value)}}/>
<label>Zip code</label>
<input type="text" onChange={(event) => {setZip(event.target.value)}}/>
</div>
<button className = "buttonReprise" onClick={submit} >Submit</button>
<p>Don't have a payment information added?
</p>
<a href={'./Addpay'}>Add Payment</a> 

</div>
 
);








}
export default CreateAccount;