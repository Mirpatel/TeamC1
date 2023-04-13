import './style/checkOut.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
// column 1: tickets, movie name, poster
// column 2: price of tickets, sales tax, online fees, total
import { Link } from 'react-router-dom';
function CheckOut() {
    const state = useLocation();

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
   const [isReadOnly, setIsReadOnly] = useState(false);
   
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
    const [code, setCode] = useState();
    const [codeActive, setCodeActive] = useState(false);
    const [subtraction, setSubtraction] = useState();

    const handlePromo = () => {
        //handle promo
        //check if promo exists
setIsButtonDisabled(true);
setIsReadOnly(true);
        Axios.post("http://localhost:8080/verifyPromo", {code : code })
    .then((response) =>{ 
       console.log(response.data);
       if (response.data.length === 0) {
        alert("Promotion code does not exist.");
       }
       else {
       let percentOff = response.data[0].percent/100;
       percentOff = 1 - percentOff;
        console.log(percentOff);
        subTotal = subtotal* percentOff;
        setSubtotal(subTotal.toFixed(2));
        let salestax = 0.08*subTotal;
        setSalesTax(salestax.toFixed(2));
        let total = salestax + subTotal + 3.0;
        setSubtraction((totalSale-total).toFixed(2));
        setTotalSale(total.toFixed(2));
        console.log(total);
        setCodeActive(true);
  
       }
   })
    .catch((error) => console.log(error));
  
        //recalculate totals


    };

    const confirm = () => {
   //add to booking table with userID etc...
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
        setSubtotal(subTotal.toFixed(2));
        let salestax = 0.08*subTotal;
        setSalesTax(salestax.toFixed(2));
        let total = salestax + subTotal + 3.0;
        setTotalSale(total.toFixed(2));
        console.log(total);

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
                    {codeActive && (
                        <p className = "pink">{code}: - {subtraction}</p>
                    )}
                    <form>
                        <label for="promocode" className = "purple">PROMO CODE: </label>
                        <input type="text" id="promocode" readOnly = {isReadOnly} name="promocode" onChange={(event) => {setCode(event.target.value)}}></input>     
                        <button type="button" className='buttonReprise2' id = "submit" disabled = {isButtonDisabled} onClick={handlePromo}>Submit</button>                  
                    </form>
                    

                </div>
            </div>
            <br />
            <Link className='buttonReprise2'to={{pathname :"/Payment"}} state={{from: { total: {totalSale},
        movie: {movie}, noAdultTickets: {noAdultTickets}, noChildTickets : {noChildTickets}, subtotal: {subtotal}, date: {date}, time: {time}, movieId: state.state.movieId}}} >Confirm</Link>
            <button className='buttonReprise2'>Cancel</button>
        </div>
        </div>
    );
}

export default CheckOut;