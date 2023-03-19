import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
function CreateAccount() {

const [fname, setfName] = useState("");
const [lname, setlName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [Password, setPassword] = useState("");

const submit = () => {

Axios.post('http://localhost:3001', {
   
   fname: fname,  lname: lname, email: email, phone: phone, Password: Password});
};

return (

<div className="input">
<label>First name</label>
<input type="text" onChange={(event) => {setfName(event.target.value)}}/>
<label> Last name</label>
<input type="text" onChange={(event) => {setlName(event.target.value)}}/>
<label>email</label>
<input type="text" onChange={(event) => {setEmail(event.target.value)}}/>
<label>phone</label>
<input type="text" onChange={(event) => {setPhone(event.target.value)}}/>
<label>Password</label>
<input type="Password" onChange={(event) => {setPassword(event.target.value)}}/>
<button onClick={submit}>Submit</button>
<p>Don't have a payment information added?
</p>
<a href={'./Addpay'}>Add Payment</a> 

</div>
 
);








}
export default CreateAccount;