import { Navigate } from 'react-router-dom';
import './style/payment.css';
import { Link } from 'react-router-dom';
function Payment() {
    return (
        <div class="payment">
            <h4>Payment Info</h4>
            <form onSubmit={<Navigate to="/login" />}>
                <label for="nameoncard">Name on Card: </label>
                <input type="text" id="nameoncard" name="nameoncard"></input> <br />
                <label for="cardnumber">Card Number: </label>
                <input type="text" id="cardnumber" name="cardnumber"></input> <br />
                <label for="cvv">CVV: </label>
                <input type="text" id="cvv" name="cvv"></input>
                <label for="expmon">Exp Month: </label>
                <input type="text" id="expmon" name="expmon"></input>
                <label for="expyear">Exp Year: </label>
                <input type="text" id="expyear" name="expyear"></input>
              <br/>
              <br/>
                <Link className='buttonReprise'to={{pathname :"/confirmationPage"}} state={{from: "anything u wanna send"}} >Confirm</Link>
            </form>
           
        </div>
    );
}

export default Payment;