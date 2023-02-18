import './style/checkOut.css';

// column 1: tickets, movie name, poster
// column 2: price of tickets, sales tax, online fees, total
import { Link } from 'react-router-dom';
function CheckOut() {
    let salesTax = 0.08 * 30.0;
    let totalSale = 30.0 + salesTax + 3.0;
    const handlePromo = () => {
        //handle promo

    }

    return (
        <div class="checkout">
            <div class ="row">
                <div class="column">
                    <p>Adult Ticket x2 <br />The Avengers<br />9:00 p.m.</p>
                </div>
                <div class="column">
                    <img src='https://flxt.tmsimg.com/assets/p8815512_p_v8_ax.jpg' alt="smth"></img>
                </div>
                <div class="column">
                    <p>Subtotal: $30 <br />Sales Tax: ${salesTax} <br />Online fees: $3.00 <br />Total: ${totalSale}</p>
                    <form onSubmit={handlePromo}>
                        <label for="promocode">Promo Code: </label>
                        <input type="text" id="promocode" name="promocode"></input>
                        <input type="submit" value="Submit" className='buttonReprise'></input>
                    </form>
                </div>
            </div>
            <br />
            <Link className='buttonReprise'to={{pathname :"/Payment"}} state={{from: "anything u wanna send"}} >Confirm</Link>
            <button className='buttonReprise'>Cancel</button>
        </div>
    );
}

export default CheckOut;