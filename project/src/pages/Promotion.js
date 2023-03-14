import './style/home.css';
import React from "react";
import { useState} from "react";
import Axios from 'axios';
import './style/signin.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const promos = [
    {
      title: '50% Off daytime Movies',
      content: 'Come to the theatre during the day time pls',
      code: '50OFF'
    
    },
    {
        title: '50% Off daytime Movies',
        content: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
      {
        title: '50% Off daytime Movies',
        content: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
      {
        title: '50% Off daytime Movies',
        content: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
  
      {
        title: '50% Off daytime Movies',
        content: 'Come to the theatre during the day time pls',
        code: '50OFF'
      
      },
  
  ];

function Promotion() {

   let navigate = useNavigate();

const [title, setTitle] = useState("");
const [text, setText] = useState("");
const [code, setCode] = useState("");
const [desc, setDesc] = useState("");

const submit = () => {

// Axios.post('http://localhost:3001', {
   
//    name: name, date: date, trailer: trailer, desc: desc});
//    alert("Movie Added!");
//    navigate('/Admin');


// };
navigate('/Admin');
};

const deletePromo = () => {
//vibes
};
return (
<>
<div className="input">
<label>name</label>
<input type="text" onChange={(event) => {setTitle(event.target.value)}}/>
<label>Title</label>
<input type="text" onChange={(event) => {setText(event.target.value)}}/>
<label>Content</label>
<input type="text" onChange={(event) => {setCode(event.target.value)}}/>
<label>Code</label>
<input type="text" />
<button onClick={submit}>Add Promotion</button>
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
   { promos.map( (promo, index)=>(  
   <tr key={index}>
      <td >{promo.title}</td>
      <td >{promo.content}</td>
      <td >{promo.code}</td>

      <td>
      <Link to="/editPromo" className="btn btn-sucess">Edit</Link>
      <Link to="/Promotion" on onClick={deletePromo} className="btn btn-danger">Delete</Link>

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