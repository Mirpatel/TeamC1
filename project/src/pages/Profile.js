import './style/profile.css';
import { useState } from 'react';
import {FaEdit} from 'react-icons/fa'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
const cards = [
  {
    last4: '4456'
  },
  {
    last4: '4256'
  },
  {
    last4: '0456'
  }
];
const orders = [
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
    const [promo, setPromo] = useState(false);
    const [pass, setPass] = useState(false);
    const [edit, setEdit] = useState(false);
  
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
    //
    const [userData, setUserData] = useState([]);
const [email, setEmail] = useState('');
const [Password, setPassword] = useState('');
const submit = () => {
 
};


//
   
    const [card, setCard] = useState(false);
    const promoHandler = () => {
        if (promo === false) {
        alert("You've been subscribed to promotions")
        const element = document.getElementById("promo");
        element.innerHTML = "Unsubscribe from promotions"
        setPromo(true);
        }
        else {
            alert("You've been unsubscribed from promotions")
            const element = document.getElementById("promo");
            element.innerHTML = "Subscribe to promotions"
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
      setNewCard(true);
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
      setEdit(false);
      Axios.post('http://localhost:8080/send-profile-email', {
   
        name: 'gord', email: 'jordynfulbright@gmail.com' });
      console.log("Profile Email sent");
 
    

  };
    

    const manageBilling = () => {
      setCard(true);
    }

    const deleteCard = () => {
      // do delete api call here
    }

    const addingNewCard = () => {
      if (cards.length == 3) {
        alert("You may only have 3 cards on file at one time. To add a new card please delete an existing one.")
      }
      else {
        //api add card here
      }
    }

/*
   const [userEmail, setUserEmail] = useState();
    const [fname, setFname] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [streetAddress, setStreetAddress] = useState("  ");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
*/

    useEffect(()=> {
      console.log("pressed submit");
      Axios.post('http://localhost:8080/profile', {
        email: 'spacex@gmail.com',
      }).then((response) => {
        console.log(response);
        setUserEmail(response.data[0].Email);
        console.log(response.data[0].fname);
        setFirstName(response.data[0].fname);
        setLastName(response.data[0].lname);
        setStreetAddress(response.data[0].street);
        setCity(response.data[0].city);
        setState(response.data[0].adressState);
        setZipCode(response.data[0].zipCode);
      });
           console.log(localStorage.getItem("token"));
           // localStorage.setItem("token", "beepboop");
          Axios.get('http://localhost:8080/api/auth/token', {
            headers: {
              'x-access-token': localStorage.getItem("token")
            }
          })
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
             
         

             
            }
          })
          .catch(function (error) {
            console.log(error);
          });
           },[])

  return (
    <>
    <div className = "profile-container">
      <div className='edit'>
        <h1>Profile</h1>
  <FaEdit className = "editButton" onClick= {showEditView}/>
        </div>

   
        <p>{firstName} {lastName}</p>
        <p>Email: {userEmail}</p>
<p>Billing Address:</p>
<p>{streetAddress}</p>
<p>{city}, {state} {zipCode}</p>
        <Modal show={edit} onHide={hideEditView}>
        <Modal.Header >
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='inputReprise'>
        <label>First Name</label>
    <input type="text" placeholder = {firstName} onChange={(event) => {setNewFirstName(event.target.value)}}/>
    
    <label>Last Name</label>
    <input type="text" placeholder = {lastName} onChange={(event) => {setNewLastName(event.target.value)}}/>

    
    <label>Street Address</label>
    <input type="text" placeholder = {streetAddress} onChange={(event) => {setNewStreetAddress(event.target.value)}}/>
    <label>City</label>
    <input type="text" placeholder = {city} onChange={(event) => {setNewCity(event.target.value)}}/>
    
    <label>State</label>
    <input type="text"  placeholder = {state} onChange={(event) => {setNewState(event.target.value)}}/>

    <label>Zip Code</label>
    <input type="text"  placeholder = {zipCode} onChange={(event) => {setNewZipCode(event.target.value)}}/>
    </div>
    <button className = "buttonReprise" variant="secondary" onClick={hideEditView}>
            Close
          </button>
          <button className = "buttonReprise"  variant="primary" onClick={makeChanges}>
            Save Changes
          </button>
          </Modal.Body>
        {/* <Modal.Footer>
 
        </Modal.Footer> */}
      </Modal>
<div>
  <button className='button' id = "promo" onClick={promoHandler}>Subscribe to promotions</button>
  <button className='button' onClick={changePassword}>Change Password</button>
  <button className='button' onClick={manageBilling}>Manage Billing Information</button>
  </div>

  <Modal show={pass} onHide={endPass}>
        <Modal.Header>
          <br/>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <form>
    <div class="input">
    <label for="old">Old password</label>
    <input type="text" placeholder="Enter Old Password" name="old" required/>

    <label for="pass">New password</label>
    <input type="password" placeholder="Enter New Password" name="pass" required/>

    <label for="RePass">Confirm New password</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" required/>
  </div>
    </form>
          </Modal.Body>
        <Modal.Footer>
          <button className = "buttonReprise" variant="secondary" onClick={endPass}>
            Close
          </button>
          <button className = "buttonReprise" variant="primary" onClick={submitNewPass}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={card} onHide={endCard}>
        <Modal.Header>
          <Modal.Title>Manage Billing Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>

       
        <div className="containerReprise">
      <div className="row">
         <div className="col-md-12">
            {/* <h5 className="mt-2"></h5> */}
            <table className="table table-bordered">
<thead>
   <tr>
      <th >Existing Cards</th>


   </tr>
</thead>
<tbody>
   { cards.map( (card, index)=>(  
   <tr key={index}>
      <td >**** **** **** {card.last4}</td>
      <button className="btn btn-danger" onClick={deleteCard(card)}>Delete</button>


   </tr>
   ))
}
</tbody>
</table>

         </div>
      </div>

      

   
  
   {newCard && (
    <div className='background'>
  
     <form>
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
     <button onClick = {addingNewCard}className='buttonReprise'>Add New Card</button>
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

  {pass && (
    <form>
    <div class="passW">
    <label for="old">Old password</label>
    <input type="text" placeholder="Enter Old Password" name="old" required/>

    <label for="pass">New password</label>
    <input type="password" placeholder="Enter New Password" name="pass" required/>

    <label for="RePass">Confirm New password</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" required/>

    <button type="submit" className = "button" onClick = {submitNewPass}>Confirm</button>
  </div>
    </form>
  )}

<div className="container">
      <div className="row">
         <div className="col-md-12">
            <h5 className="mt-2">Past Orders</h5>
            <table className="table table-bordered">
<thead>
   <tr>
      <th >Title</th>
      <th >Number of Tickets</th>
      <th >Price</th>

   </tr>
</thead>
<tbody>
   { orders.map( (order, index)=>(  
   <tr key={index}>
      <td >{order.title}</td>
      <td >{order.noTickets}</td>
      <td >{order.price}</td>


   </tr>
   ))
}
</tbody>
</table>

         </div>
      </div>
   </div>
    </div>
    </>
  );
}

export default Profile;