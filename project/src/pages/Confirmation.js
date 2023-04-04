import './style/confirmation.css';
import { useLocation } from 'react-router-dom';
function Confirmation() {
  const location = useLocation();
  const {state} = location;
  let total = state.from.total;
  return (
    <>
    <div className='checkout2'>
    <div className = "confirmation">
        <p className = "purple">Your tickets have been purchased! A confirmation email has been sent to <u>jordynfulbright@gmail.com!</u></p>
        <p className = "purple "><b>Booking Number:</b> 567089283</p>
        <div className='backdropConfirm'>
        <p className='purple'>ORDER DETAILS </p>
        <div className='line7'/>
 
        <p className = "purple anon firstT">Adult Ticket x2 </p><p className = "purple anon">The Avengers</p><p className = "purple anon">9:00 p.m.</p>
        <p className = "purple anon">ORDER TOTAL: $35.4</p>
        </div>
    </div>
    </div>
    </>
  );
}

export default Confirmation;