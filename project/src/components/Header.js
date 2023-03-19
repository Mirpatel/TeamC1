import './style/components.css';
import { Link } from 'react-router-dom';
import {FaStumbleuponCircle} from 'react-icons/fa';
import {BsPersonCircle} from 'react-icons/bs'
import { useState } from 'react';
function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(true);

const loggingOut = () => {
setIsLoggedIn(false);
localStorage.clear(); //some way to make sure user is logged out across whole profile
};
    return (
      <>
      <div className='navBar'>
        
        <div className = "linkContainer">
          {!isAdmin && (
            <>
        <Link to = '/' className = "logo3">Dawg</Link>
        <Link to = '/'><FaStumbleuponCircle className = "logo"/></Link>
        <Link to = '/' className = "logo3">Theatre</Link>
        </>
          )
          }

          {isAdmin && (
            <>
            <Link to = '/admin' className = "logo3">Dawg</Link>
            <Link to = '/admin'><FaStumbleuponCircle className = "logo"/></Link>
            <Link to = '/admin' className = "logo3">Theatre</Link>
            </>

          )}
      </div>
      {/* <Link to = '/admin' className = "admin">Admin</Link> */}
      {!isLoggedIn && (
      <Link to='/signin' className='login'>Login</Link>
      )}
      {isLoggedIn && (
        <Link onClick = {loggingOut} to='/' className='login'>Logout</Link>
      )}

      {!isAdmin && isLoggedIn &&(
      <Link to = '/profile'><BsPersonCircle className = "logo2"/></Link>
      )}
      </div>
      
      </>
    );
  }
  
  export default Header;