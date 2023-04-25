import './style/profile.css';
import { useState } from 'react';
import {FaEdit} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';

const ordersHardCode = [
    {
      title: 'The Avengers',
      noTickets: 3,
      price: 45.01,
    
    },
    {
      title: 'The Texas Chainsaw Massacre',
      noTickets: 1,
      price: 8.39
    },
    {
      title: 'Parasite',
      noTickets: 4,
      price: 60.82
    },
    {
      title: 'The Little Mermaid',
      noTickets: 2,
      price: 16.23
    },
  
    {
      title: 'The Avengers',
      noTickets: 3,
      price: 30.99,
    
    },

  
  ];

function Profile() {
  const [orders, setOrders] = useState(ordersHardCode);
    const [promo, setPromo] = useState(false);
    const [pass, setPass] = useState(false);
    const [edit, setEdit] = useState(false);
      const [ccv, setCCV] = useState();
      const [number, setNumber] = useState();
      const [exp_date, setExp_date] = useState();
      const [exp_year, setExp_year] = useState();
      const [name, setName] = useState();



    const [userEmail, setUserEmail] = useState();
    const [fname, setFname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetAddress, setStreetAddress] = useState("  ");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [newCard, setNewCard] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newStreetAddress, setNewStreetAddress] = useState(" ");
    const [newCity, setNewCity] = useState(" ");
    const [newState, setNewState] = useState(" ");
    const [newZipCode, setNewZipCode] = useState(" ");
    const [id, setId] = useState();
    //
    const [userData, setUserData] = useState([]);
const [email, setEmail] = useState('');
const [Password, setPassword] = useState('');

//
   
    const [card, setCard] = useState(false);
    const promoHandler = () => {
        if (promo === false) {
        alert("You've been subscribed to promotions")
        const element = document.getElementById("promo");
        element.innerHTML = "UNSUBSCRIBE FROM PROMOTIONS"

        const element2 = document.getElementById("promoInside");
        element2.innerHTML = "Unsubscribe to stop receiving exclusive offers by email."
        setPromo(true);
        }
        else {
            alert("You've been unsubscribed from promotions")
            const element = document.getElementById("promo");
            element.innerHTML = "SUBSCRIBE TO PROMOTIONS"
            setPromo(false);
        }
    };
    const changePassword = () => {
        setPass(true);
    }

    const submitNewPass = () => {
      
        setPass(false);
        alert("password changed!");
        
    }
    const addNew = () => {
      if (pay.length === 3) {
        alert("you may only have 3 cards on your account at one time. To add another, delete an existing card.");
      }
      else {
      setNewCard(true);
      }
    }

    const hideAddNew = () => {
      setNewCard(false);
    }
    const endPass = () => {
      setPass(false);
    }

    const endCard = () => {
      setCard(false);
    }

    const showEditView = () => {
      setEdit(true);
    }

    const hideEditView = () => {
      setEdit(false);
    }
 
    const makeChanges = () => {
   
      Axios.post('http://localhost:8080/send-profile-email', {
   
       name: newFirstName, email: userEmail });

      console.log("Profile Email sent");
      console.log(email);
      Axios.post('http://localhost:3001/profile-edit', {
           
      email: userEmail, newZipCode: newZipCode, newFirstName: newFirstName, newLastName: newLastName,newStreetAddress: newStreetAddress, newCity: newCity, newState: newState});
      
     
           
          
           
          
          setEdit(false);
       
        };

  
    

    const manageBilling = () => {
      setCard(true);
    }

    const deleteCard = (id) => {


      console.log("delete card");
      console.log(id);

    if(window.confirm("are you sure you want to delete this card?")) {
      Axios.delete(`http://localhost:3050/delete/${id}`)
      .then(response => {
        console.log(response.data); // Success message
        // Do something else here, like update state or show a success message
      })
      .catch(error => {
        console.log(error); // Error message
        // Handle the error here, like showing an error message to the user
      });
    }

      
    }
    
    const addingNewCard = () => {
      if (pay.length == 3) {
        alert("You may only have 3 cards on file at one time. To add a new card please delete an existing one.")
      }
      else {
        Axios.post('http://localhost:3050', {
           
        number: number, exp_date: exp_date,ccv: ccv, name: name, exp_year: exp_year, userId:id});
        
         alert("Payment info added to your account");
     
      }
    }

    const [pay, setPay] = useState();
    useEffect(()=> {
      
      Axios.get('http://localhost:8080/api/auth/token', {
        headers: {
          'x-access-token': localStorage.getItem("token")
        }
      })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
         
          setEmail(response.data.email);
          console.log(response.data.email);
          Axios.post('http://localhost:8080/profile', {
            email: response.data.email,
          }).then((response) => {
            console.log(response);
            setUserEmail(response.data[0].Email);
            setId(response.data[0].Id);
            console.log(response.data[0].Id);
            setFirstName(response.data[0].fname);
            setLastName(response.data[0].lname);
            setStreetAddress(response.data[0].street);
            setCity(response.data[0].city);
            setState(response.data[0].adressState);
            setZipCode(response.data[0].zipCode);
            setNewStreetAddress(streetAddress);
            setNewCity(response.data[0].city)
            setNewFirstName(response.data[0].fname)
            setNewLastName(response.data[0].lname)
            setNewState(response.data[0].adressState)
            setNewZipCode(response.data[0].zipCode)

            Axios.post('http://localhost:3001/pastBookings', {

              userId: response.data[0].Id,
            }).then((response) => {
              console.log("getBookings");
              console.log(response);
            setOrders(response.data);
            });
               
            Axios.post('http://localhost:3050/payment', {

        id: response.data[0].Id,
      }).then((response) => {
        console.log("getpay");
        console.log(response);
      setPay(response.data);
      });
          });

          
         
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      
 

      console.log(id);

      
           console.log(localStorage.getItem("token"));
          
           },[edit])
          
           const submit = () => {

            Axios.post('http://localhost:3050', {
               
               userId: id, number: number, exp_date: exp_date,ccv: ccv, name: name, exp_year: exp_year});
               
              
               
                alert("Payment info added to your account");
                
            
            };
  return (
    <>
    <div className = "profileShow">
    
        <h3 className='mov'>PROFILE</h3>
      
        <div className = "infoHolder">
        <div className="pastOrders2">
      <div className="rowPt4">
         <div className="col-md-12">
            <p className="purple noMarg">PAST ORDERS</p>
            <div className='tableBody'>
            <table className="table table-bordered">
<thead>
   <tr>
      <th className='purple'>TITLE</th>
      <th className='purple'>NUMBER OF TICKETS</th>
      <th className='purple'>PRICE</th>

   </tr>
</thead>

<tbody>
   { orders.map( (order, index)=>(  
   <tr key={index}>
      <td className='purple anon'>{order.movieTitle}</td>
      <td className='purple anon'>{order.totalTickets}</td>
      <td className='purple anon'>{order.total}</td>


   </tr>
   ))
}
</tbody>

</table>
</div>
         </div>
      </div>
   </div>
        <div className = "profile-container">
        <FaEdit className = "editButton" onClick= {showEditView}/>
          <p className='purple noMarg2'>INFO</p>
          
      
        <div class="columnProf">
        
                <p className='categoryChex'>NAME</p>
                    <div className='line6'/>
                    <p className='answerChex'>{firstName} {lastName}</p>
        
                    <p className='categoryChex'>EMAIL</p>
                    <div className='line6'/>
                    <p className='answerChex'>{userEmail}</p>
                    <p className='categoryChex'>ADDRESS</p>
                    <div className='line6'/>
                    <p className='answerChex'>{streetAddress}</p>
                    <p className='answerChex'>{city}, {state} {zipCode}</p>


                </div>

        <Modal show={edit} onHide={hideEditView}>
        <Modal.Header >
          <Modal.Title>EDIT PROFILE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='inputReprise'>
        <label className='purple'>FIRST NAME</label>
    <input type="text" placeholder = {firstName} onChange={(event) => {setNewFirstName(event.target.value)}}/>
    
    <label className='purple'>LAST NAME</label>
    <input type="text" placeholder = {lastName} onChange={(event) => {setNewLastName(event.target.value)}}/>

    
    <label className='purple'>STREET ADDRESS</label>
    <input type="text" placeholder = {streetAddress} onChange={(event) => {setNewStreetAddress(event.target.value)}}/>
    <label className='purple'>CITY</label>
    <input type="text" placeholder = {city} onChange={(event) => {setNewCity(event.target.value)}}/>
    
    <label className='purple'>STATE</label>
    <input type="text"  placeholder = {state} onChange={(event) => {setNewState(event.target.value)}}/>

    <label className='purple'>ZIP CODE</label>
    <input type="text"  placeholder = {zipCode} onChange={(event) => {setNewZipCode(event.target.value)}}/>
    </div>
    <button className = "buttonReprise" variant="secondary" onClick={hideEditView}>
            Close
          </button>

          <button className = "buttonReprise"  variant="primary" onClick={makeChanges}>
            Save Changes
          </button>
          </Modal.Body>
       
      </Modal>
      </div>


  <Modal show={pass} onHide={endPass}>
        <Modal.Header>
          <br/>
          <Modal.Title>CHANGE PASSWORD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <form>
    <div class="input" id = "passwordInput">
    <label className='purple' for="old">OLD PASSWORD</label>
    <input type="text" placeholder="Enter Old Password" name="old" required/>

    <label className='purple' for="pass">NEW PASSWORD</label>
    <input type="password" placeholder="Enter New Password" name="pass" required/>

    <label className='purple' for="RePass">CONFIRM NEW PASSWORD</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" required/>
  </div>
    </form>
          </Modal.Body>
        <Modal.Footer>
          <button className = "buttonReprise" variant="secondary" onClick={endPass}>
            CLOSE
          </button>
          <button className = "buttonReprise" variant="primary" onClick={submitNewPass}>
            SAVE CHANGES
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={card} onHide={endCard}>
        <Modal.Header>
          <Modal.Title>MANAGE BILLING INFORMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>

       
        <div className="containerCard">
     
         <div className="col-md-12">
           
            <table className="table table-bordered tableStuff">
<thead>
   <tr>
      <th >EXISTING CARDS</th>

   </tr>
</thead>
<tbody>
   { pay && pay.map( (card, index)=>(  
   <tr key={index}>
      <td >**** **** **** {card.lastFour}</td>
      <button className="buttonRepriseDanger" onClick={(event) => {
        event.preventDefault()
        deleteCard(card.id)}}>Delete</button>
   </tr>
   ))
}
</tbody>
</table>

         </div>
  

   {newCard && (
    <div className='background'>
  
     <form>
     <label className = "purple" for="nameoncard">Name on Card: </label>
                <input  type="text" onChange={(event) => {setName(event.target.value)}}/>
                <label className = "purple" for="cardnumber">Card Number: </label>
                <input type="text" onChange={(event) => {setNumber(event.target.value)}}/>
                 
               <br/>
               <br/>
                <label className = "purple" for="cvv">CVV: </label>
                <input type="text" onChange={(event) => {setCCV(event.target.value)}}/>
                <label className = "purple" for="expmon">Exp Month: </label>
                <input type="text" onChange={(event) => {setExp_date(event.target.value)}}/>
                <br/>
                <br/>
                <label className = "purple" for="expyear">Exp Year: </label>
                <input type="text" onChange={(event) => {setExp_year(event.target.value)}}/>
  <br/>
  <br/>
     <button onClick = {addingNewCard}className='buttonReprise2'>Add New Card</button>
 </form>
</div>
  )}
  
   {!newCard && (
   <button className='buttonReprise' onClick={addNew}>Add New Card</button>
   )}
</div>
         
          </Modal.Body>
        <Modal.Footer>
          <button className = "buttonReprise"  variant="secondary" onClick={endCard}>
            Close
          </button>
          <button  className = "buttonReprise"  variant="primary" onClick={endCard}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

   <div className = "buttonsProfile">


<div className = "optionBlock2" onClick={promoHandler}>
    <p className="purple textBox" id = "promo" >SUBSCRIBE TO PROMOTIONS</p>
<div className = "InfoBlock2">
<p className="anon purple smallFont" id = "promoInside" >Subscribe to receive exclusive offers by email.</p>
</div>
</div>
<div className = "optionBlock2" onClick={changePassword}>
<p className="purple textBox">CHANGE PASSWORD</p>
<div className = "InfoBlock2">
<p className="anon purple smallFont">Change password associated with this account.</p>
</div>
</div>
<div className = "optionBlock2" onClick={manageBilling}>
<p className="purple textBox">MANAGE BILLING INFORMATION</p>
<div className = "InfoBlock2">
<p className="anon purple smallFont">View cards on file, add cards and remove existing cards.</p>
</div>
</div>

  </div>
    </div>
    </div>
    </>
  );
}

export default Profile;