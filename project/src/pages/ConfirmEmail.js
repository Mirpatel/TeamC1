import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
function ConfirmEmail() {
  const navigate = useNavigate();
const [verify, setVerify] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    console.log(key);    
    setVerify(key);
    Axios.post('http://localhost:8080/verify-email/confirm', {token: key})
    .then(response => {
      // handle the response from the API
      console.log(response.data);
  navigate('/');
    })
    .catch(error => {
      console.log(error);
    });

  }, []);

  return <div>Confirmation page</div>;
}

export default ConfirmEmail;
