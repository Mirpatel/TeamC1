import './style/confirmation.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
function Confirmation() {
  const location = useLocation();
  const {state} = location;
  let total = state.from.total;
  const [totalSale, setTotalSale] = useState();
  const [salesTax, setSalesTax] = useState();
  const [subtotal, setSubtotal] = useState();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const [movie, setMovie] = useState();
  const [noAdultTickets, setNoAdultTickets] = useState();
  const [noChildTickets, setNoChildTickets] = useState();
  const [email, setEmail] = useState();
  useEffect(()=> {
//get userID to get email
 
    setMovie(state.from.movie.movie);
    setNoAdultTickets(state.from.noAdultTickets.noAdultTickets);
    setNoChildTickets(state.from.noChildTickets.noChildTickets);
    setDate(state.from.date.date);
    setTime(state.from.time.time);
    setSubtotal(state.from.subtotal.subtotal);
    // setSalesTax(state.from.salestax.salesTax);
    setTotalSale(state.from.total.totalSale);
    console.log(state);
setEmail(state.from.email);
        

  },[])

  return (
    <>
    <div className='checkout2'>
    <div className = "confirmation">
        <p className = "purple">Your tickets have been purchased! A confirmation email has been sent to <u>{email}!</u></p>
        <p className = "purple "><b>Booking Number:</b> 567089283</p>
        <div className='backdropConfirm'>
        <p className='purple'>ORDER DETAILS </p>
        <div className='line7'/>
 
        <p className = "purple anon firstT">Adult Ticket x{noAdultTickets} </p>
        <p className = "purple anon firstT">Child Ticket x{noChildTickets} </p>
        <p className = "purple anon">{movie}</p>
        <p className = "purple anon">{date} {time}</p>
        <p className = "purple anon">ORDER TOTAL: ${totalSale}</p>
        </div>
    </div>
    </div>
    </>
  );
}

export default Confirmation;