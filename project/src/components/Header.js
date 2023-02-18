import './style/components.css';
import { Link } from 'react-router-dom';
import {FaStumbleuponCircle} from 'react-icons/fa';
import {BsPersonCircle} from 'react-icons/bs'
function Header() {
    return (
      <>
      <div className='navBar'>
        
        <div className = "linkContainer">
        <Link to = '/' className = "logo3">Dawg</Link>
        <Link to = '/'><FaStumbleuponCircle className = "logo"/></Link>
        <Link to = '/' className = "logo3">Theatre</Link>
      </div>
      <Link to = '/admin' className = "admin">Admin</Link>
      <Link to='/signin' className='login'>Login</Link>
      <Link to = '/profile'><BsPersonCircle className = "logo2"/></Link>
      </div>
      
      </>
    );
  }
  
  export default Header;