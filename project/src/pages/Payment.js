import { Navigate } from 'react-router-dom';
import './style/payment.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Payment() {
    const location = useLocation();
    const { state } = location;
let total = state.from.total;
let movie = state.from.movie
let noAdultTickets = state.from.noAdultTickets;
let noChildTickets = state.from.noChildTickets;
    return (
        <div class="payment">
            <p className = "titleBox">Payment Info</p>
            <form onSubmit={<Navigate to="/login" />}>
                <label className = "purple" for="nameoncard">Name on Card: </label>
                <input className = "purple" type="text" id="nameoncard" name="nameoncard"></input> <br />
                <label className = "purple" for="cardnumber">Card Number: </label>
                <input className = "purple" type="text" id="cardnumber" name="cardnumber"></input> <br />
                <label className = "purple" for="cvv">CVV: </label>
                <input className = "purple" type="text" id="cvv" name="cvv"></input>
                <label className = "purple" for="expmon">Exp Month: </label>
                <input className = "purple" type="text" id="expmon" name="expmon"></input>
                <label className = "purple" for="expyear">Exp Year: </label>
                <input className = "purple" type="text" id="expyear" name="expyear"></input>
              <br/>
              <br/>
                <Link className='buttonReprise'to={{pathname :"/confirmationPage"}} state={{from: { total: {total},
        movie: {movie}, noAdultTickets: {noAdultTickets}, noChildTickets : {noChildTickets}}}} >Confirm</Link>
            </form>
           
        </div>
    );
}

export default Payment;