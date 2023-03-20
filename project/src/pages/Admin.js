import { useNavigate } from "react-router-dom";
import "./style/User.css";
import React from "react";
import { useState} from "react";
import Axios from 'axios';
function Admin() {
    const navigate = useNavigate();



return (
<>
<div className="biggest">
    <h1>Admin</h1>
<div className = "ad">
<h2>Options</h2>
<div className = "container">
   
<button  className = "button" onClick={() => navigate("/Edit")}>Manage Movies</button>
<button  className = "button" onClick={() => navigate("/User")}>Manage Users</button>
<button  className = "button" onClick={() => navigate("/Promotion")}>Manage Promotions</button>
<button  className = "button" onClick={() => navigate("/Addshowtime")}>Manage showtime</button>

</div>
</div>
</div>
 </>
);








}
export default Admin;