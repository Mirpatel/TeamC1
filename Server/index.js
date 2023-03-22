
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');



app.use((req, res, next) => {
    try {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      console.log("got here 2");
      next();
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  });

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({

    user: 'root',
    host: 'localhost',
    password: '',
    database: 'group'
    
});
 
/*
 const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newStreetAddress, setNewStreetAddress] = useState(" ");
    const [newCity, setNewCity] = useState(" ");
    const [newState, setNewState] = useState(" ");
    const [newZipCode, setNewZipCode] = useState(" ");
*/

app.post("/profile-edit", (req, res) => {
const newFirstName = req.body.newFirstName;
const newLastName = req.body.newLastName; // Use the hashed password
const newStreetAddress = req.body.newStreetAddress;
const newCity = req.body.newCity;
const newState = req.body.newState;
const newZipCode = req.body.newZipCode;
const email = req.body.email;
db.query(
  "UPDATE user SET street = ?, city = ?, adressState = ?, zipCode = ?, fname = ?, lname = ? WHERE email = ?",
    //"INSERT into user WHERE email = ? ( street, city, adressState, zipCode,  fname, lname, email, phone, Password) VALUES (?,?,?,?,?, ?, ?, ?, ?)",
  [ newStreetAddress, newCity, newState, newZipCode, newFirstName,newLastName, email]


    , (error, results) => {
      if (error) {
        console.error(error);
      } else {
        console.log('User profile updated successfully!');
      }
    
    });

});
//
app.post("/", async (req, res) =>{
    const salt = await bcrypt.genSalt(1);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt); // Hash the password from the request body
    console.log(req.body);
const fname = req.body.fname;
const lname = req.body.lname;

const email = req.body.email;
const phone = req.body.phone;
//const Password = req.body.Password;
const Password = hashedPassword; // Use the hashed password
const street = req.body.street;
const city = req.body.city;
const adressState = req.body.adressState;
const zipCode = req.body.zipCode;



db.query(
"INSERT INTO  user ( street, city, adressState, zipCode,  fname, lname, email, phone, Password) VALUES (?,?,?,?,?, ?, ?, ?, ?)",
[ street, city, adressState, zipCode, fname,lname, email, phone, Password]



);


});




app.listen(3001, () => {
console.log("running");

});
 