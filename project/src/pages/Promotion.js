import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const promos = [
    {
      Name: '50% Off daytime Movies',
      Information: 'Come to the theatre during the day time pls',
      code: '50OFF'
    
    },
    {
      Name: '50% Off daytime Movies',
      Information: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
      {
         Name: '50% Off daytime Movies',
         Information: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
      {
         Name: '50% Off daytime Movies',
         Information: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
  
      {
         Name: '50% Off daytime Movies',
         Information: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
  
  ];

function Promotion() {

   let navigate = useNavigate();

const [title, setTitle] = useState("");
const [text, setText] = useState("");
const [code, setCode] = useState("");
const [desc, setDesc] = useState("");
const [promos1, setPromos1] = useState(promos);
const submit = () => {
   Axios.post('http://localhost:8080/addPromo', {
   
      title: title, text: text, code: code });
      // navigate('/Admin');
   

   
Axios.post('http://localhost:8080/sendOutPromotion', {
   
   title: title, text: text, code: code });
console.log("emaillll");
   // navigate('/Admin');



navigate('/Admin');
};

const deletePromo = () => {
//vibes
};


useEffect(() => {

   Axios.post('http://localhost:8080/getPromos')
  .then(response => {
    // handle the response from the API
    console.log(response.data);
    setPromos1(response.data);
  })
  .catch(error => {
    console.log(error);
  });
   
}, []);

return (
<>
<div className="input">
<label>Title</label>
<input type="text" onChange={(event) => {setTitle(event.target.value)}}/>
<label>Content</label>
<input type="text" onChange={(event) => {setText(event.target.value)}}/>
<label>Code</label>
<input type="text" onChange={(event) => {setCode(event.target.value)}}/>
<button className = "button" onClick={submit}>Add Promotion</button>
</div>

<div className="container">
      <div className="row">
         <div className="col-md-12">
            <h5 className="mt-2">Promotions</h5>
            <table className="table table-bordered">
<thead>
   <tr>
      <th >Title</th>
      <th >content</th>
      <th >code</th>

   </tr>
</thead>
<tbody>
   { promos1.map( (promo, index)=>(  
   <tr key={index}>
      <td >{promo.Name}</td>
      <td >{promo.Information}</td>
      <td >{promo.code}</td>

      <td>
      {/* <Link to="/editPromo" className="btn btn-sucess">Edit</Link> */}
      {/* <Link to="/Promotion" on onClick={deletePromo} className="btn btn-danger">Delete</Link> */}

      </td>

   </tr>
   ))
}
</tbody>
</table>

         </div>
      </div>
   </div>
   <br/>
   </>

 
);








}
export default Promotion;