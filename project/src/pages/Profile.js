import './style/profile.css';
import { useState } from 'react';
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
  return (
    <>
    <div className = "profile-container">
        <h1>Profile</h1>
        <p>Name: Jordyn Fulbright</p>
        <p>Email: jordynfulbright@gmail</p>

  <button className='button' id = "promo" onClick={promoHandler}>Subscribe to promotions</button>
  <button className='button' onClick={changePassword}>Change Password</button>
  {pass && (
    <form>
    <div class="passW">
    <label for="old">Old password</label>
    <input type="text" placeholder="Enter Old Password" name="old" required/>

    <label for="pass">New password</label>
    <input type="password" placeholder="Enter New Password" name="pass" required/>

    <label for="RePass">Confirm New password</label>
    <input type="password" placeholder="Re-Enter New Password" name="RePass" required/>

    <button type="submit" className = "button" onclick = {submitNewPass}>Confirm</button>
  </div>
    </form>
  )}
  <div className = "pastOrders">
    <h3>Past Orders:</h3>
    {orders.map(prop => (
          <>
          <div className = "individual">
            <div className = "definition">Movie</div>
            <div className = "response2">{prop.title}</div>
            <div className = "definition2">Number of Tickets</div>
            <div className = "response">{prop.noTickets}</div>
            <div className = "definition3">Price</div>
            <div className = "response">${prop.price}</div>
            </div>
          </>
        ))}
</div>
    </div>
    </>
  );
}

export default Profile;
