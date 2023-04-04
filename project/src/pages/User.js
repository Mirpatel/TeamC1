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
   <div className = "usersCover">
   <div className="container">
      <div className="row">
         <div className="col-md-12">
            <h5 className="purple">ACTIVE USERS</h5>
            <table className="table table-bordered">
<thead>
   <tr>
      <th className="purple">ID</th>
      <th className="purple"> FIRST NAME</th>
      <th className="purple">LAST NAME</th>
      <th className="purple">EMAIL</th>
      <th className="purple">PHONE</th>
      <th className="purple">PASSWORD</th>
      <th className="purple">ACTION</th>

   </tr>
</thead>
<tbody>
   { userData.map( (userData, index)=>(  
   <tr key={index}>
      <td className="purple anon">{index+1}</td>
      <td lassName="purple anon">{userData.fname}</td>
      <td lassName="purple anon">{userData.lname}</td>
      <td lassName="purple anon">{userData.Email}</td>
      <td lassName="purple anon">{userData.phone}</td>
      <td lassName="purple anon">{userData.Password}</td>
      
      <td>
      <Link to="/editUser" className="buttonReprise2">Edit</Link>
      <Link to="/editUser" className="buttonReprise2">Suspend</Link>

      </td>

   </tr>
   ))
}
</tbody>
</table>

         </div>
      </div>
   </div>
   </div>
</React.Fragment>

);








}
export default User;