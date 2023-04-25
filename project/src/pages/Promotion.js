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
const [percent, setPercent] = useState("");

const [promos1, setPromos1] = useState(promos);
const submit = () => {
   Axios.post('http://localhost:8080/addPromo', {
   
      title: title, text: text, code: code, percent: percent });
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
<label className='purple'>TITLE</label>
<input type="text" onChange={(event) => {setTitle(event.target.value)}}/>
<label className='purple'>CONTENT</label>
<input type="text" onChange={(event) => {setText(event.target.value)}}/>
<label className='purple'>CODE</label>
<input type="text" onChange={(event) => {setCode(event.target.value)}}/>
<label className='purple'>PERCENT OFF</label>
<input type="text" onChange={(event) => {setPercent(event.target.value)}}/>
<button className = "buttonReprise" onClick={submit}>Add Promotion</button>
</div>

<div className="container">
      <div className="row">
         <div className="col-md-12">
            <p className="purple">PROMOTIONS</p>
            <table className="table table-bordered tableStuff">
<thead>
   <tr>
      <th className='purple' >TITLE</th>
      <th className='purple'>CONTENT</th>
      <th className='purple'>CODE</th>
      <th className='purple'>PERCENT OFF</th>

   </tr>
</thead>
<tbody>
   { promos1.map( (promo, index)=>(  
   <tr key={index}>
      <td className='purple anon'>{promo.Name}</td>
      <td className='purple anon'>{promo.Information}</td>
      <td className='purple anon'>{promo.code}</td>
      <td className='purple anon'>{promo.percent}</td>

   

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