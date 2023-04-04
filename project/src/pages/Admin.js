import { useNavigate } from "react-router-dom";
import "./style/User.css";
import React from "react";
import { useState} from "react";
import Axios from 'axios';
function Admin() {
    const navigate = useNavigate();



return (
<>\
<div className = "adminFront">
<p className = "titleBox">Admin OPTIONS</p>
<div className="biggest">
  
<div className = "ad">
<div className = "container2">
<div className = "optionBlock" onClick={() => navigate("/Edit")}>
    <p className="purple">MANAGE MOVIES</p>
<div className = "InfoBlock">
<p className="anon purple smallFont">Add movies to be viewed at Dawg Theatre. They will show up on the front page of the site as soon as you add them. </p>
</div>
</div>
<div className = "optionBlock" onClick={() => navigate("/User")}>
<p className="purple">MANAGE USERS</p>
<div className = "InfoBlock">
<p className="anon purple smallFont">View users and suspend users or promote users to admin.</p>
</div>
</div>
<div className = "optionBlock" onClick={() => navigate("/Promotion")}>
<p className="purple">MANAGE PROMOTIONS</p>
<div className = "InfoBlock">
<p className="anon purple smallFont">View past promotions and send out new ones.</p>
</div>
</div>
<div className = "optionBlock" onClick={() => navigate("/Addshowtime")}>
<p className="purple">MANAGE SHOWTIMES</p>
<div className = "InfoBlock"> 
<p className="anon purple smallFont">View showtimes for individual movies and add or remove them.</p>
</div>
</div>
{/* <button  className = "button" onClick={() => navigate("/Edit")}>Manage Movies</button>
<button  className = "button" onClick={() => navigate("/User")}>Manage Users</button>
<button  className = "button" onClick={() => navigate("/Promotion")}>Manage Promotions</button>
<button  className = "button" onClick={() => navigate("/Addshowtime")}>Manage showtime</button> */}

</div>
</div>
</div>
</div>
 </>
);








}
export default Admin;