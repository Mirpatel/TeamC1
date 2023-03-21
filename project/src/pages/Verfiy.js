import './style/confirmation.css';
import { useLocation } from 'react-router-dom';

function Verify() {
  const location = useLocation();
  const {state} = location;
  let total = state.from.total;
  return (
    <>
    <div className = "confirmation">
        <p>An account verification email has been sent to <u>jordynfulbright@gmail.com!</u></p>
 
    </div>
    </>
  );
}

export default Verify;