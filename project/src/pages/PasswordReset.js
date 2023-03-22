import './style/confirmation.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
function Password() {
  const location = useLocation();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  
  let navigate = useNavigate();
  const submit = () => {

    
//some change password api here
//should check if passwords match too
navigate('/signin');
  }

  useEffect(()=> {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    console.log(key);    
    },[])
  return (
    <>
    <div className = "confirmation">
    <form>
    <div class="input">

    <label for="pass">New password</label>
    <input type="password" placeholder="Enter New Password" name="pass" onChange={(event) => {setPassword(event.target.value)}} required/>

    <label for="RePass">Confirm New password</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" onChange={(event) => {setConfirm(event.target.value)}}required/>
  </div>
    </form>
    <button className='button' onClick={submit}>change password</button>
    </div>
    </>
  );
}

export default Password;