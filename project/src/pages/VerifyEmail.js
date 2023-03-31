import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
function VerifyEmail() {
  const navigate = useNavigate();
   const location = useLocation();
   const { state } = location;
console.log(state);
const [verify, setVerify] = useState();

  return <div className="input">Verification Email sent to <u>{state.from}</u></div>;
}

export default VerifyEmail;
