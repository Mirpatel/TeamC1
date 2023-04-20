import './style/confirmation.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
function Password() {
  const location = useLocation();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [passkey, setPasskey] = useState();
  let navigate = useNavigate();
  const submit = () => {
if (password !== confirm) {
  alert("passwords do not match");
}
else {
  //api call

  Axios.post('http://localhost:8080/reset-password/confirm', {password:password, token: passkey})
  .then(response => {
    // handle the response from the API
    console.log(response.data);

  })
  .catch(error => {
    console.log(error);
  });

}
    
//some change password api here
//should check if passwords match too

  }

  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    console.log(key);    
    setPasskey(key);
    },[])
    
  return (
    <div className = "passwordConfirmationPage">
    <div className = "confirmation2">
    <form>
    <div class="inputConfirm">

    <label for="pass">New password</label>
    <input type="password" placeholder="Enter New Password" name="pass" onChange={(event) => {setPassword(event.target.value)}} required/>

    <label for="RePass">Confirm New password</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" onChange={(event) => {setConfirm(event.target.value)}}required/>
  </div>
    </form>
    <button className='buttonReprise' onClick={submit}>change password</button>
    </div>
    </div>
  );
}

export default Password;