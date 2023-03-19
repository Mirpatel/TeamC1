import './style/home.css';
import React from "react";
import {Link} from "react-router-dom";
import { useEffect, useState} from "react";
import Axios from 'axios';
// import '../Signin.css'
import './style/User.css';

function User() {


   const[userData, setUserdata]= useState([]);
   useEffect( ()=> {
      const getUserdata= async()=>{
         const reqData= await fetch("http://localhost:7000/api/user");
         const resData= await reqData.json();
         setUserdata(resData);
         console.log(resData);
      }
      getUserdata();
   },[]);

return (

<React.Fragment>
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <h5 className="mt-2">Active Users</h5>
            <table className="table table-bordered">
<thead>
   <tr>
      <th >Id</th>
      <th > First Name</th>
      <th >Last Name</th>
      <th >Email</th>
      <th >Phone</th>
      <th>Password</th>
      <th >Action</th>

   </tr>
</thead>
<tbody>
   { userData.map( (userData, index)=>(  
   <tr key={index}>
      <td>{index+1}</td>
      <td >{userData.fname}</td>
      <td >{userData.lname}</td>
      <td >{userData.Email}</td>
      <td >{userData.phone}</td>
      <td >{userData.Password}</td>
      <td>
      <Link to="/editUser" className="btn btn-sucess">Edit</Link>
      <Link to="/editUser" className="btn btn-danger">Suspend</Link>

      </td>

   </tr>
   ))
}
</tbody>
</table>

         </div>
      </div>
   </div>
</React.Fragment>

);








}
export default User;