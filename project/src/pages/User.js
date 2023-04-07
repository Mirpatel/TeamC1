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
         const reqData= await fetch("http://localhost:3001/api/user");
         const resData= await reqData.json();
         setUserdata(resData);
         console.log(resData);
      }
      getUserdata();
   },[]);
// unsuspend
//      <Link to="/editUser" className="buttonReprise2">Suspend</Link>

const suspend = (Id) => {
 //  const Id = user.Id; // Replace with the actual user ID
 
   Axios.post('http://localhost:3001/suspend', {
     Id: Id,
     suspend: 1 // Set suspend column to 1
   })
   .then((response) => {
     console.log(response.data);
   })
   .catch((error) => {
     console.log(error);
   });
 };
 
 const unsuspend = (Id) => {
 //  const Id = user.Id; // Replace with the actual user ID
 
   Axios.post('http://localhost:3001/unsuspend', {
    Id: Id,
     suspend: 0 // Set suspend column to 0
   })
   .then((response) => {
     console.log(response.data);
   })
   .catch((error) => {
     console.log(error);
   });
 };

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
   { userData.map( (user, index)=>(  
   <tr key={index}>
      <td className="purple anon">{user.Id}</td>
      <td lassName="purple anon">{user.fname}</td>
      <td lassName="purple anon">{user.lname}</td>
      <td lassName="purple anon">{user.Email}</td>
      <td lassName="purple anon">{user.phone}</td>
      <td lassName="purple anon">{user.Password}</td>
      
      <td>
      <Link to="/editUser" className="buttonReprise2">Edit</Link>
      <button
          className="buttonReprise"
          onClick={() => suspend(user.Id)}
        >
          Suspend
        </button>
        <button
          className="buttonReprise"
          onClick={() => unsuspend(user.Id)}
        >
          Unsuspend
        </button>

                      
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




/*
  <button className = "buttonReprise" onClick={suspend} >Suspend</button>
      <button className = "buttonReprise" onClick={unsuspend} >Unsuspend</button>


*/



}
export default User;