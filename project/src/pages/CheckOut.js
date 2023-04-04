import './style/checkOut.css';

// column 1: tickets, movie name, poster
// column 2: price of tickets, sales tax, online fees, total
import { Link } from 'react-router-dom';
function CheckOut() {
    let salesTax = 0.08 * 30.0;
    let totalSale = 30.0 + salesTax + 3.0;
    let movie = "Avengers"
    let noAdultTickets = 2;
    let noChildTickets = 0;
    const handlePromo = () => {
        //handle promo

    }

    return (
        <div class="checkout">
            <div class= "newCheckout">
            <div class ="row3">
                <div class="column">
                <p className='categoryChex'>ADULT TICKETS</p>
                    <div className='line6'/>
                    <p className='categoryChex'>CHILD TICKETS</p>
                    <div className='line6'/>
                    <p className='categoryChex'>MOVIE</p>
                    <div className='line6'/>
                    <p className='categoryChex'>DATE & TIME</p>
                    <div className='line6'/>


                </div>
    
                <div class="backdropChex">
                    <p className = "purple">SUBTOTAL: $30 <br />SALES TAX: ${salesTax} <br />ONLINE FEES: $3.00 <br />TOTAL: ${totalSale}</p>
                    <form onSubmit={handlePromo}>
                        <label for="promocode" className = "purple">PROMO CODE: </label>
                        <input type="text" id="promocode" name="promocode"></input>
                        <input type="submit" value="Submit" className='buttonReprise2'></input>
                    </form>
                </div>
            </div>
            <br />
            <Link className='buttonReprise2'to={{pathname :"/Payment"}} state={{from: { total: {totalSale},
        movie: {movie}, noAdultTickets: {noAdultTickets}, noChildTickets : {noChildTickets}}}} >Confirm</Link>
            <button className='buttonReprise2'>Cancel</button>
        </div>
        </div>
    );
}

export default CheckOut;