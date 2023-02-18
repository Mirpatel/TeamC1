import './style/confirmation.css';

function Confirmation() {
  return (
    <>
    <div className = "confirmation">
        <p>Your tickets have been purchased! A confirmation email has been sent to <u>jordynfulbright@gmail.com!</u></p>
        <p><b>Booking Number:</b> 567089283</p>
        <p><b>Order Details:</b> <p>Adult Ticket x2 <br />The Avengers<br />9:00 p.m.</p></p>
        <p><b>Order Total:</b> $35.4</p>
    </div>
    </>
  );
}

export default Confirmation;