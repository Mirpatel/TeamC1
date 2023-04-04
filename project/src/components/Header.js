import './style/components.css';
import { Link } from 'react-router-dom';
import {BsSearch} from 'react-icons/bs';
import {BsPersonCircle} from 'react-icons/bs'
import { useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.png';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';

function Header({ onDisplaySearchChange, displaySearch}) {
  
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
        {!searchButton && !isAdmin &&(
        <div>

       <p className='login accType'>USER</p>
        </div>
        )}


        {!searchButton && isAdmin &&(
        <div>

       <p className='login accType'>ADMIN</p>
        </div>
        )}
        <div className='linkContainer'>
          {!isAdmin && (
            <>
        <Link to = '/' className = "logo3">DAWG</Link>
        <Link to = '/'>< img src={logo} className = "film" alt = "logo"/></Link>
        <Link to = '/' className = "logo3">THEATRE</Link>
        </>
          )
          }

          {isAdmin && (
            <div className = "logoBox">
            <Link to = '/admin' className = "logo3">Dawg</Link>
            <Link to = '/admin'>< img src={logo} className = "film" alt = "logo"/></Link>
            <Link to = '/admin' className = "logo3">Theatre</Link>
            </div>

          )}


      </div>
      <div className = "profileAndLogin">
{!isLoggedIn && (
      <Link to='/signin' className='login'>LOGIN</Link>
      )}
      {isLoggedIn && (
        <Link onClick = {loggingOut} to='/' className='login'>LOGOUT</Link>
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