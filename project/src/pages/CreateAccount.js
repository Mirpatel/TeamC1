
import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function CreateAccount() {


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
const navigate = useNavigate();
const submit = () => {
console.log(promo);
let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if (fname == "" || email == "" || phone == "" || Password == "" || lname == "") {
   alert("Please enter all required fields");
}

else if ( !re.test(email) ) {
        alert("Please enter a valid email address");
     
}
else {
       
Axios.post('http://localhost:3001', {
   

street: street, city: city, adressState: adressState, zipCode: zipCode, fname: fname,  lname: lname, email: email, phone: phone, Password: Password, promo: promo});

// Axios.post('http://localhost:8080/send-verify-email',{
//         email: email, fname: fname}).then((response) => {
     


//         });

navigate('/verifyEmail', { state: { from: email } });

};



}

return (

<div className="input">

<p className = "reqPass2 purple" >*This field is required</p>
<label className='purple'>FIRST NAME</label>
<input type="text" onChange={(event) => {setfName(event.target.value)}}/>
<p className = "reqPass2 purple">*This field is required</p>
<label className='purple'> LAST NAME</label>
<input type="text" onChange={(event) => {setlName(event.target.value)}}/>


<label className='purple'>EMAIL</label>
<input type="text" onChange={(event) => {setEmail(event.target.value)}} required/>
<p className = "req purple">*This field is required</p>
<label className='purple'>PHONE</label>
<input type="text" onChange={(event) => {setPhone(event.target.value)}} required/>
<p className = "reqPass purple">*This field is required</p>
<label className='purple'>PASSWORD</label>
<input type="Password" onChange={(event) => {setPassword(event.target.value)}} required/>
<div className='Checkbox'>
<label for="promo" className='purple'>SIGN UP FOR PROMOTIONS?</label>
<input type="checkbox" id="promo" name="promo" onChange={(event) => {setPromo(event.target.checked)}}/>
</div>

<br/>
<p className='purple'>ADDRESS<br/></p>
<div className='line8'/>
<label className='purple'>STREET ADDRESS</label>
<input type="text" onChange={(event) => {setStreet(event.target.value)}}/>
<label className='purple'>CITY</label>
<input type="text" onChange={(event) => {setCity(event.target.value)}}/>
<label className='purple'>STATE</label>
<input type="text" onChange={(event) => {setAdState(event.target.value)}}/>
<label className='purple'>ZIP CODE</label>
<input type="text" onChange={(event) => {setZip(event.target.value)}}/>
<button className = "buttonReprise" onClick={submit} >Submit</button>
<p className='purple anon'>Don't have a payment information added?
</p>
<a href={'./Addpay'} className='purple anon'>Add Payment</a> 

</div>
 
);








}
export default CreateAccount;
