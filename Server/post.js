const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({

    user: 'root',
    host: 'localhost',
    password: '',
    database: 'group'
    
});
/*
app.post("/", (req, res) =>{
 console.log(req.body);
const email = req.body.email

const Password = req.body.Password;


db.query(

"SELECT * FROM user WHERE email = ?;",
[ email, Password],
(err, result) => {
    if (err) {
        res.send({err: err})
    } 

    if(result.length > 0){

        res.send(result);
    } else {
        res.send({message: "Wrong Combination"});
    }
}
);


});

*/

app.post("/", (req, res) => {
    const email = req.body.email;
    const Password = req.body.Password;
  
    if (!email || !Password) {
      return res.status(400).send("Email and password are required.");
    }
  
    db.query(
      "SELECT * FROM user WHERE email = ? AND password = ?",
      [email, Password],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("An error occurred while processing your request.");
        }
  
        if (result.length === 0) {
          return res.status(401).send("Invalid email or password.");
        }
  
        // If we reach here, it means that the email and password are valid
        // You can redirect the user to the home page or return a success message
        res.send("Login successful.");
      }
    );
  });
  
app.listen(5000, () => {
console.log("running");
});
 