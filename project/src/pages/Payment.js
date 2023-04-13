import { Navigate } from 'react-router-dom';
import './style/payment.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from 'axios';
function Payment() {
    const [email, setEmail] = useState();
    const [cards, setCards] = useState();
    const [selectedCard, setSelectedCard] = useState();
    const location = useLocation();
    const { state } = location;
    const [user, setUser] = useState();
let total = state.from.total;
let movie = state.from.movie
let noAdultTickets = state.from.noAdultTickets;
let noChildTickets = state.from.noChildTickets;

const handleCardChange = (event) => {
    setSelectedCard(event.target.value);


  };

  const handleSubmit = () => {
   
    if (selectedCard === undefined || selectedCard === "") {
       //get payment info here to send
       Axios.post('http://localhost:3001/book', {
    
        movie: state.from.movieId, noChildTickets: state.from.noChildTickets, noAdultTickets: state.from.noAdultTickets, date: state.from.date, time: state.from.time, total: state.from.total, userId: user, cardId: 0
      }).then((response) => {
  
        console.log(response);

      });
    }
    else {
   
        Axios.post('http://localhost:3001/book', {
    
            movie: state.from.movieId, noChildTickets: state.from.noChildTickets, noAdultTickets: state.from.noAdultTickets, date: state.from.date, time: state.from.time, total: state.from.total, userId: user, cardId: selectedCard
          }).then((response) => {
      
            console.log(response);
    
          });

        const noTickets = state.from.noChildTickets + state.from.noAdultTickets;
        const dateTime = state.from.date + " " + state.from.time;
        
        Axios.post('http://localhost:8080/send-confirmation-booking', {
    
            movie: state.from.movie, noTickets: noTickets, dateTime: dateTime, email: email
          }).then((response) => {
      
            console.log(response);
    
          });
        //payment info is the card
    }
  }
  useEffect(() => {
    Axios.get('http://localhost:8080/api/auth/token', {
        headers: {
              'x-access-token': localStorage.getItem("token")
            }
          })
          .then(function (response) {
       
            if (response.status === 200) {
          
            //call api here to find out if admin
      
                console.log(response.data.email);
              setEmail(response.data.email);

              Axios.post('http://localhost:8080/profile', {
                email: response.data.email,
              }).then((response) => {
                console.log(response);
                setUser(response.data[0].Id);
                Axios.post('http://localhost:3050/payment', {
    
            id: response.data[0].Id,
          }).then((response) => {
            console.log("getpay");
            console.log(response);
          setCards(response.data);
          });
              });
                  // axios.post("http://localhost:3001/getCards")
    //   .then((response) =>{ 
    //      console.log(response.data);
    //     setCards(response.data)})
    //   .catch((error) => console.log(error));

    
    
            }
          })
          .catch(function (error) {
            console.log(error);
          });



  }, []);

    return (
        <div class="payment">
            <p className = "titleBox purple">Payment Info</p>
            <div className = "inputCard">
            <form onSubmit={<Navigate to="/login" />}>
                <label className = "purple" for="nameoncard">NAME ON CARD: </label>
                <input className = "purple" type="text" id="nameoncard" name="nameoncard"></input> <br />
                <label className = "purple" for="cardnumber">CARD NUMBER: </label>
                <input className = "purple" type="text" id="cardnumber" name="cardnumber"></input> <br />
                <label className = "purple" for="cvv">CVV: </label>
                <input className = "purple" type="text" id="cvv" name="cvv"></input>
                <label className = "purple" for="expmon">EXP MONTH: </label>
                <input className = "purple" type="text" id="expmon" name="expmon"></input>
                <label className = "purple" for="expyear">EXP YEAR: </label>
                <input className = "purple" type="text" id="expyear" name="expyear"></input>
              <br/>
              <br/>
            
            </form>
            </div>
            <br/>
           <p className='purple'>OR</p>
           <p className = "titleBox purple">CHOOSE EXISTING CARD</p>
           <div className='existingCard'>
           <label>
      {/* Movie: */}
      <select value={selectedCard} onChange={handleCardChange}>
        <option value="">SELECT A CARD</option>
        {cards && cards.map((card) => (
          <option key={card.id} value={card.id}>
            Card ending in {card.lastFour}
          </option>
        ))}
      </select>
    </label>
           </div>
           <Link className='buttonReprise marginTop ' onClick={handleSubmit} to={{pathname :"/confirmationPage"}}state={{from: { total: state.from.total,
        movie: state.from.movie, noAdultTickets: state.from.noAdultTickets, noChildTickets : state.from.noChildTickets, subtotal: state.from.subtotal, date: state.from.date, time: state.from.time, email: email}}} >Confirm</Link>
        </div>
    );
}

export default Payment