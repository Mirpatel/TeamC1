import './style/checkOut.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
// column 1: tickets, movie name, poster
// column 2: price of tickets, sales tax, online fees, total
import { Link } from 'react-router-dom';
function CheckOut() {
    const state = useLocation();


   
   
    let subTotal;
    let adultTicketPrice = 14;
    let childTicketPrice = 10;

    
    const [totalSale, setTotalSale] = useState();
    const [salesTax, setSalesTax] = useState();
    const [subtotal, setSubtotal] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [movie, setMovie] = useState();
    const [noAdultTickets, setNoAdultTickets] = useState();
    const [noChildTickets, setNoChildTickets] = useState();

    const handlePromo = () => {
        //handle promo

    }

    const calculate = () => {
        subTotal = ((noAdultTickets*adultTicketPrice)+(noChildTickets * childTicketPrice));
        setSubtotal(subTotal);
        console.log(subTotal);
    }

    useEffect(()=> {
        console.log(state);
        console.log(state.state.movie);
         setMovie(state.state.movie);
        setNoAdultTickets(state.state.noAdultTickets);
        setNoChildTickets(state.state.noChildTickets);
         setDate(state.state.date);
         setTime(state.state.time);
         subTotal = ((state.state.noAdultTickets * adultTicketPrice)+(state.state.noChildTickets * childTicketPrice));
         setSubtotal(subTotal);
         let salestax = 0.08*subTotal;
         setSalesTax(salestax);

         let total = salestax + subtotal + 3.0
         setTotalSale(total);
         console.log(subTotal);

             },[])

    return (
        <div class="checkout">
            <div class= "newCheckout">
            <div class ="row3">
                <div class="column">
                <p className='categoryChex'>ADULT TICKETS</p>
                    <div className='line6'/>
                    <p className='answerChex'>{noAdultTickets}</p>
                    <p className='categoryChex'>CHILD TICKETS</p>
                    <div className='line6'/>
                    <p className='answerChex'>{noChildTickets}</p>
                    <p className='categoryChex'>MOVIE</p>
                    <div className='line6'/>
                    <p className='answerChex'>{movie}</p>
                    <p className='categoryChex'>DATE & TIME</p>
                    <div className='line6'/>
                    <p className='answerChex'>{date} {time}</p>


                </div>
    
                <div class="backdropChex">
                    <p className = "purple">SUBTOTAL: ${subtotal} <br />SALES TAX: ${salesTax} <br />ONLINE FEES: $3.00 <br />TOTAL: ${totalSale}</p>
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