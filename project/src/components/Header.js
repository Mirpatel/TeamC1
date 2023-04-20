import './style/components.css';
import { Link, Navigate } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import {BsPersonCircle} from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.png';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Header({ onDisplaySearchChange, displaySearch}) {
  let navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const handleSearchClick = () => {
    onDisplaySearchChange(!displaySearch);
  };

  const [isAdmin, setIsAdmin] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(true);
const [searchButton, setSearchButton] = useState();
const loggingOut = () => {
setIsLoggedIn(false);
localStorage.clear(); //some way to make sure user is logged out across whole profile
navigate('/signin');
};
useEffect(()=> {
  
  
  if (pathname === '/') {
setSearchButton(true);
console.log("search true");
  }
  else {
    setSearchButton(false);
    console.log("no more search pls");
  }
       console.log(localStorage.getItem("token"));
       // localStorage.setItem("token", "beepboop");
          Axios.get('http://localhost:8080/api/auth/token', {
        headers: {
          'x-access-token': localStorage.getItem("token")
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
        setIsLoggedIn(true);
        //call api here to find out if admin
          console.log(response.data.email);
          Axios.post('http://localhost:3001/isAdmin', {
            email: response.data.email
           })
           .then((response) => {
            console.log(response.data[0].role);
            if (response.data[0].role === "admin") {
              console.log("yes is an admin");
              setIsAdmin(true);
              setSearchButton(false);
             
            }
          
          })
           .catch((error) => console.log(error));



        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoggedIn(false);
      });
       },[pathname])
    return (
      <>
      <div className='navBar'>
        {!isAdmin && searchButton && (
        <div>

       <BsSearch className = "searchIcon" onClick={handleSearchClick}/>
        </div>

        )}

        {!searchButton && !isAdmin && isLoggedIn &&(
        <div>

       <p className='login2 accType'>USER</p>
        </div>
        )}


        {!searchButton && isAdmin && isLoggedIn &&(
        <div>

       <Link to = '/admin' className='login2 accType'>ADMIN</Link>
        </div>
        )}

        <div className='linkContainer'>
         
            <>
        <Link to = '/' className = "logo3">DAWG</Link>
        <Link to = '/'>< img src={logo} className = "film" alt = "logo"/></Link>
        <Link to = '/' className = "logo3">THEATRE</Link>
        </>
        
     


      </div>
      <div className = "profileAndLogin">
{!isLoggedIn && (
      <Link to='/signin' className='login2'>LOGIN</Link>
      )}
      {isLoggedIn && !isAdmin && (
        <Link onClick = {loggingOut} to='/' className='login'>LOGOUT</Link>
      )}
            {isLoggedIn && isAdmin && (
        <Link onClick = {loggingOut} to='/' className='loginAdminStyle'>LOGOUT</Link>
      )}
      {!isAdmin && isLoggedIn &&(
      <Link to = '/profile'><BsPersonCircle className = "logo2"/></Link>
      )}
   
      </div>

      </div>
      
      </>
    );
  }
  
  export default Header;